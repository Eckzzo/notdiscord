import NextLink from 'next/link';
import React, { Suspense } from 'react';
import { graphql, useFragment } from 'react-relay';

import { GuildIcon } from './GuildIcon';
import { GuildItemFragment$key } from '__generated__/GuildItemFragment.graphql';

const GuildItemFragment = graphql`
  fragment GuildItemFragment on Guild {
    id
    ...GuildIconFragment
  }
`;

interface GuildItemProps {
  fragmentKey: GuildItemFragment$key;
}

const GuildItem: React.FC<GuildItemProps> = ({ fragmentKey }) => {
  const data = useFragment(GuildItemFragment, fragmentKey);

  if (!data) {
    return null;
  }

  return (
    <Suspense>
      <NextLink key={`guild_${data.id}`} href={`/guild/${encodeURIComponent(data.id)}`}>
        <GuildIcon fragmentKey={data} interactive />
      </NextLink>
    </Suspense>
  );
};

export { GuildItem };
