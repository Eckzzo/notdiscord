import { Fragment, Suspense } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { graphql, useMutation, usePaginationFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Button } from '@ui/Button';
import { Tooltip } from '@ui/Tooltip';
import { Spinner } from '@ui/Spinner';
import { Heading } from '@ui/Heading';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { FriendshipCard } from './FriendshipCard';
import { AddFriendDialog } from './AddFriendDialog';
import { FriendListFragment$key } from '__generated__/FriendListFragment.graphql';

const FriendListFragment = graphql`
	fragment FriendListFragment on Query @refetchable(queryName: "FriendList") {
		friendships(status: $status, target: $target, first: $first, after: $after)
			@connection(key: "FriendList_friendships", filters: []) {
			pageInfo {
				hasNextPage
				endCursor
			}
			__id
			edges {
				node {
					id
					recipient {
						...FriendshipCardFragment
					}
				}
			}
		}
	}
`;

interface FriendListProps {
	fragmentRef: FriendListFragment$key;
}

const FriendList: React.FC<FriendListProps> = ({ fragmentRef }) => {
	const { data } = usePaginationFragment(FriendListFragment, fragmentRef);

	if (!data) {
		return null;
	}

	const { friendships } = data;

	return (
		<Flex direction="column" grow>
			<Suspense fallback={<Spinner />}>
				{/* No requests found */}
				{friendships.edges.length === 0 && (
					<Flex align="center" justify="center" direction="column" gap={4} grow>
						<Flex direction="column" align="center" gap={2}>
							<Heading variant="h6">No Friends Found...</Heading>
							<Text color="lowContrast">
								Maybe you mistook us for the other app, if not...
							</Text>
						</Flex>
						<AddFriendDialog>
							<Button size="sm">Add a New Friend!</Button>
						</AddFriendDialog>
					</Flex>
				)}
				{friendships.edges.map((edge) => {
					if (edge?.node?.recipient) {
						return (
							<Fragment key={edge?.node?.id}>
								<FriendshipCard
									message="Friend"
									fragmentRef={edge?.node?.recipient}
								>
									<Tooltip content="Cancel" side="top" sideOffset={4}>
										<IconButton variant="tertiary">
											<CrossCircledIcon height={20} width={20} />
										</IconButton>
									</Tooltip>
								</FriendshipCard>
								<Separator />
							</Fragment>
						);
					}
				})}
			</Suspense>
		</Flex>
	);
};

export { FriendList };
