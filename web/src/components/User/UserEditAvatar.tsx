import React, { useState } from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Field } from '@ui/Field';
import { Avatar } from '@ui/Avatar';
import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { UserAvatar } from './UserAvatar';
import { useImageInput } from 'hooks/useImageInput';
import { uploadToBucket } from 'utils/uploadToBucket';
import { UserEditAvatarFragment$key } from '__generated__/UserEditAvatarFragment.graphql';

const UserEditAvatarFragment = graphql`
  fragment UserEditAvatarFragment on User {
    avatar
    ...UserAvatarFragment
  }
`;

interface UserEditAvatarProps {
  size?: number;
  fragmentKey: UserEditAvatarFragment$key;
}

const UserEditAvatar: React.FC<UserEditAvatarProps> = ({ size = 9, fragmentKey }) => {
  const [loading, setLoading] = useState(false);
  const data = useFragment(UserEditAvatarFragment, fragmentKey);
  const { image, imgData, handleChangeImage, setImage, setImgData } = useImageInput();

  const handleUpload = () => {
    if (!image || loading) return;
    setLoading(true);
    uploadToBucket(`users/avatars/${data.avatar}.jpg`, image)
      .then(() => {
        setLoading(false);
        setImage(undefined);
        setImgData(null);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Field>
      <Flex align='end' gap={3} grow>
        <Field.FileInput onChange={handleChangeImage}>
          {imgData && <Avatar src={imgData as string} size={size} />}
          {!imgData && <UserAvatar fragmentKey={data} size={size} />}
        </Field.FileInput>
        {image && (
          <Button onClick={handleUpload} variant='tertiary' size='sm'>
            {loading ? <Spinner /> : 'Save Changes'}
          </Button>
        )}
      </Flex>
    </Field>
  );
};

export { UserEditAvatar };
