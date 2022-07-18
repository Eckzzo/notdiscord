import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { EnvelopeClosedIcon, PlusIcon } from '@radix-ui/react-icons';

import { Flex } from '@ui/Flex';
import { styled } from '@stitches';
import { Tooltip } from '@ui/Tooltip';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';

import { UserDropdownMenu } from './UserDropdownMenu';
import { SideNavFragment$key } from '../../__generated__/SideNavFragment.graphql';

/* -------------------------------------------------------------------------------------------------
 * GraphQL
 * ----------------------------------------------------------------------------------------------- */

const SideNavFragment = graphql`
  fragment SideNavFragment on User {
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
      <Flex direction="column" gap={4}>
        <IconButton>
          <EnvelopeClosedIcon />
        </IconButton>
        <Separator />
      </Flex>
      <Flex direction="column" gap={2}>
        <Tooltip side="right" content="New Guild" delayDuration={200} sideOffset={4}>
          <IconButton variant="tertiary">
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Flex>
      <Flex direction="column" gap={4}>
        <Separator />
        {data && <UserDropdownMenu fragmentKey={data} />}
      </Flex>
    </StyledSideNav>
  );
};

SideNav.displayName = 'SideNav';

export { SideNav };
