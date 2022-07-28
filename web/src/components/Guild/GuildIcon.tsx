import React from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Avatar, AvatarProps } from '@ui/Avatar';
import { getImagePath } from 'utils/getImagePath';
import { GuildIconFragment$key } from '__generated__/GuildIconFragment.graphql';

const GuildIconFragment = graphql`
  fragment GuildIconFragment on Guild {
    name
    icon
  }
`;

interface GuildIconProps extends AvatarProps {
  fragmentKey: GuildIconFragment$key;
}

const GuildIcon = React.forwardRef<React.ElementRef<typeof Avatar>, GuildIconProps>(
  ({ fragmentKey, ...props }, ref) => {
    const data = useFragment(GuildIconFragment, fragmentKey);

    return (
      <Avatar
        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${getImagePath(`guilds/icons/${data.icon}.jpg`)}`}
        fallback={data.name}
        ref={ref}
        {...props}
      />
    );
  },
);

GuildIcon.displayName = 'GuildIcon';

export { GuildIcon };
