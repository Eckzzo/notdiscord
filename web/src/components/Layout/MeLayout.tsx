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
import { LinkButton } from '@ui/LinkButton';

interface MeLayoutProps {
	children?: React.ReactNode;
}

const MeLayout: React.FC<MeLayoutProps> = ({ children }) => {
	return (
		<Fragment>
			<SubNav>
				<Box css={{ p: '$4', borderBottom: '1px solid $gray300' }}>
					<Field>
						<Field.Input
							variant="secondary"
							placeholder="Search For Messages"
						/>
					</Field>
				</Box>
			</SubNav>
			<Flex direction="column" grow>
				<Header>
					<Flex align="center" gap={4}>
						<Heading variant="h6">Friends</Heading>
						<Separator orientation="vertical" />
						<LinkButton href="/me">Friends</LinkButton>
						<LinkButton href="/me/pending">Pending</LinkButton>
						<LinkButton href="/me/sent">Sent</LinkButton>
						<AddFriendDialog>
							<Button size="sm">Add Friend</Button>
						</AddFriendDialog>
					</Flex>
				</Header>
				<Flex direction="column" grow>
					{children}
				</Flex>
			</Flex>
		</Fragment>
	);
};

export { MeLayout };
