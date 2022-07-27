import React from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Avatar, AvatarProps } from '@ui/Avatar';
import { getImagePath } from 'utils/getImagePath';
import { UserAvatarFragment$key } from '__generated__/UserAvatarFragment.graphql';

const UserAvatarFragment = graphql`
  fragment UserAvatarFragment on User {
    avatar
    username
  }
`;

interface UserAvatarProps extends AvatarProps {
  fragmentKey: UserAvatarFragment$key;
}

const UserAvatar = React.forwardRef<React.ElementRef<typeof Avatar>, UserAvatarProps>(
  ({ fragmentKey, ...props }, ref) => {
    const data = useFragment(UserAvatarFragment, fragmentKey);

    return (
      <Avatar
        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${getImagePath(`users/avatars/${data.avatar}.jpg`)}`}
        fallback={data.username}
        ref={ref}
        {...props}
      />
    );
  },
);

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
