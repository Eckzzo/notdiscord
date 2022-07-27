import React from 'react';
import NextLink from 'next/link';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { EnvelopeClosedIcon, GlobeIcon, PlusIcon } from '@radix-ui/react-icons';

import { Flex } from '@ui/Flex';
import { styled } from '@stitches';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { UserDropdownMenu } from './UserDropdownMenu';
import { GuildList } from 'components/Guild/GuildList';
import { UserAvatar } from 'components/User/UserAvatar';
import { NewGuildDialog } from 'components/Guild/NewGuildDialog';
import { JoinGuildDialog } from 'components/Guild/JoinGuildDialog';
import { SideNavFragment$key } from '../../__generated__/SideNavFragment.graphql';

/* -------------------------------------------------------------------------------------------------
 * GraphQL
 * ----------------------------------------------------------------------------------------------- */

const SideNavFragment = graphql`
  fragment SideNavFragment on User {
    guilds(first: $first) @connection(key: "SideNav_guilds", filters: []) {
      edges {
        __id
      }
      ...GuildListFragment
      ...NewGuildDialogFragment
      ...JoinGuildDialogFragment
    }
    ...UserAvatarFragment
    ...UserDropdownMenuFragment
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledSideNav = styled('nav', {
  boxSizing: 'border-box',
  width: '72px',
  height: '100%',
  py: '$4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRight: '1px solid $gray300',
});

/* -------------------------------------------------------------------------------------------------
 * SideNav
 * ----------------------------------------------------------------------------------------------- */

interface SideNavProps {
  fragmentKey: SideNavFragment$key;
}

const SideNav: React.FC<SideNavProps> = ({ fragmentKey }) => {
  const data = useFragment(SideNavFragment, fragmentKey);

  return (
    <StyledSideNav>
      <Flex direction='column' gap={4}>
        <NextLink href='/me'>
          <IconButton>
            <EnvelopeClosedIcon />
          </IconButton>
        </NextLink>
        <Separator />
      </Flex>
      <Flex direction='column' gap={2}>
        <GuildList fragmentKey={data.guilds} />
        <NewGuildDialog fragmentKey={data.guilds}>
          <IconButton variant='tertiary'>
            <PlusIcon />
          </IconButton>
        </NewGuildDialog>
        <JoinGuildDialog fragmentKey={data.guilds}>
          <IconButton variant='tertiary'>
            <GlobeIcon />
          </IconButton>
        </JoinGuildDialog>
      </Flex>
      <Flex direction='column' gap={4}>
        <Separator />
        {data && (
          <UserDropdownMenu fragmentKey={data}>
            <UserAvatar fragmentKey={data} interactive />
          </UserDropdownMenu>
        )}
      </Flex>
    </StyledSideNav>
  );
};

SideNav.displayName = 'SideNav';

export { SideNav };
