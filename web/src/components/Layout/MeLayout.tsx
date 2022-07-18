import { Fragment } from 'react';
import NextLink from 'next/link';

import { Box } from '@ui/Box';
import { Flex } from '@ui/Flex';
import { Field } from '@ui/Field';
import { Button } from '@ui/Button';
import { Header } from '@ui/Header';
import { Heading } from '@ui/Heading';
import { Separator } from '@ui/Separator';

import { SubNav } from './SubNav';
import { AddFriendDialog } from '../Friendship/AddFriendDialog';

interface MeLayoutProps {
  children?: React.ReactNode;
}

const MeLayout: React.FC<MeLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <SubNav>
        <Box css={{ p: '$4', borderBottom: '1px solid $gray300' }}>
          <Field>
            <Field.Input variant="secondary" placeholder="Search For Messages" />
          </Field>
        </Box>
      </SubNav>
      <Flex direction="column" grow>
        <Header>
          <Flex align="center" gap={4}>
            <Heading variant="h6">Friends</Heading>
            <Separator orientation="vertical" />
            <NextLink href="/me">
              <Button variant="ghost" size="sm">
                All
              </Button>
            </NextLink>
            <NextLink href="/me/pending">
              <Button variant="ghost" size="sm">
                Pending
              </Button>
            </NextLink>
            <NextLink href="/me/sent">
              <Button variant="ghost" size="sm">
                Sent
              </Button>
            </NextLink>
            <AddFriendDialog>
              <Button size="sm">Add Friend</Button>
            </AddFriendDialog>
          </Flex>
        </Header>
        {children}
      </Flex>
    </Fragment>
  );
};

export { MeLayout };
