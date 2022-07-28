import React, { useState } from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Field } from '@ui/Field';
import { Avatar } from '@ui/Avatar';
import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { GuildIcon } from './GuildIcon';
import { useImageInput } from 'hooks/useImageInput';
import { uploadToBucket } from 'utils/uploadToBucket';
import { GuildEditIconFragment$key } from '__generated__/GuildEditIconFragment.graphql';

const GuildEditIconFragment = graphql`
  fragment GuildEditIconFragment on Guild {
    icon
    ...GuildIconFragment
  }
`;

interface GuildEditIconProps {
  size?: number;
  fragmentKey: GuildEditIconFragment$key;
}

const GuildEditIcon: React.FC<GuildEditIconProps> = ({ size = 9, fragmentKey }) => {
  const [loading, setLoading] = useState(false);
  const data = useFragment(GuildEditIconFragment, fragmentKey);
  const { image, imgData, handleChangeImage, setImage, setImgData } = useImageInput();

  const handleUpload = () => {
    if (!image || loading) return;
    setLoading(true);
    uploadToBucket(`guilds/icons/${data.icon}.jpg`, image)
      .then(() => {
        setLoading(false);
        setImage(undefined);
        setImgData(null);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Field>
      <Flex direction='column' align='center' gap={3}>
        <Field.FileInput onChange={handleChangeImage}>
          {imgData && <Avatar src={imgData as string} size={size} />}
          {!imgData && <GuildIcon fragmentKey={data} size={size} />}
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

export { GuildEditIcon };
