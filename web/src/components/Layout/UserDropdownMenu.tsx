import { useTheme } from 'next-themes';
import React, { Suspense } from 'react';
import { graphql, useFragment } from 'react-relay';

import {
  SunIcon,
  ExitIcon,
  MoonIcon,
  GearIcon,
  Pencil2Icon,
  DotFilledIcon,
  CaretRightIcon,
  ClipboardCopyIcon,
} from '@radix-ui/react-icons';

import { Flex } from '@ui/Flex';
import { Tooltip } from '@ui/Tooltip';
import { Heading } from '@ui/Heading';
import { Highlight } from '@ui/Highlight';
import { DropdownMenu } from '@ui/DropdownMenu';
import { useIsMounted } from '../../hooks/useIsMounted';
import { UserEditAvatar } from 'components/User/UserEditAvatar';
import { UserDropdownMenuFragment$key } from '../../__generated__/UserDropdownMenuFragment.graphql';

/* -------------------------------------------------------------------------------------------------
 * GraphQL
 * ----------------------------------------------------------------------------------------------- */

const UserDropdownMenuFragment = graphql`
  fragment UserDropdownMenuFragment on User {
    username
    denominator
    ...UserEditAvatarFragment
  }
`;

/* -------------------------------------------------------------------------------------------------
 * ThemeDropdownSubMenu
 * ----------------------------------------------------------------------------------------------- */

const ThemeDropdownSubMenu: React.FC = () => {
  const mounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    // TODO: Add loading state
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenu.TriggerItem>
        {theme === 'system' && <GearIcon />}
        {theme === 'dark' && <MoonIcon />}
        {theme === 'light' && <SunIcon />}
        Switch Theme
        <DropdownMenu.RightSlot>
          <CaretRightIcon />
        </DropdownMenu.RightSlot>
      </DropdownMenu.TriggerItem>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenu.RadioItem value='system'>
            <DropdownMenu.ItemIndicator>
              <DotFilledIcon />
            </DropdownMenu.ItemIndicator>
            System
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value='dark'>
            <DropdownMenu.ItemIndicator>
              <DotFilledIcon />
            </DropdownMenu.ItemIndicator>
            Dark
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value='light'>
            <DropdownMenu.ItemIndicator>
              <DotFilledIcon />
            </DropdownMenu.ItemIndicator>
            Light
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * ----------------------------------------------------------------------------------------------- */

interface UserDropdownMenuProps {
  children?: React.ReactNode;
  fragmentKey: UserDropdownMenuFragment$key;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ children, fragmentKey }) => {
  const data = useFragment<UserDropdownMenuFragment$key>(UserDropdownMenuFragment, fragmentKey);

  return (
    <Suspense>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content side='right'>
          <Flex css={{ m: '$2' }}>
            <UserEditAvatar fragmentKey={data} />
          </Flex>
          <Tooltip content='Copy to Clipboard' side='top'>
            <DropdownMenu.Item
              variant='secondary'
              onClick={() => navigator.clipboard.writeText(`${data.username}#${data.denominator}`)}
            >
              <Heading variant='h6'>
                {data.username}
                <Highlight color='lowContrast'>#{data.denominator}</Highlight>
              </Heading>
              <DropdownMenu.RightSlot>
                <Highlight color='lowContrast'>
                  <ClipboardCopyIcon />
                </Highlight>
              </DropdownMenu.RightSlot>
            </DropdownMenu.Item>
          </Tooltip>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Pencil2Icon />
            Edit Profile
          </DropdownMenu.Item>
          <ThemeDropdownSubMenu />
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <ExitIcon />
            Logout
          </DropdownMenu.Item>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu>
    </Suspense>
  );
};

export { UserDropdownMenu };
