import { Fragment, Suspense } from 'react';
import { CircleBackslashIcon } from '@radix-ui/react-icons';
import { graphql, useMutation, usePaginationFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Spinner } from '@ui/Spinner';
import { Heading } from '@ui/Heading';
import { Tooltip } from '@ui/Tooltip';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { FriendshipCard } from './FriendshipCard';
import { FriendshipReject } from './FriendshipRejectMutation';
import { FriendshipRejectMutation } from '__generated__/FriendshipRejectMutation.graphql';
import { FriendshipPendingListFragment$key } from '__generated__/FriendshipPendingListFragment.graphql';

const FriendshipPendingListFragment = graphql`
	fragment FriendshipPendingListFragment on Query
	@refetchable(queryName: "FriendshipsPending") {
		friendships(status: $status, target: $target, first: $first, after: $after)
			@connection(key: "FriendshipsPending_friendships", filters: []) {
			pageInfo {
				hasNextPage
				endCursor
			}
			__id
			edges {
				node {
					id
					sender {
						...FriendshipCardFragment
					}
				}
			}
		}
	}
`;

interface FriendshipPendingListProps {
	fragmentRef: FriendshipPendingListFragment$key;
}

const FriendshipPendingList: React.FC<FriendshipPendingListProps> = ({
	fragmentRef,
}) => {
	const [rejectFriendship, isLoading] =
		useMutation<FriendshipRejectMutation>(FriendshipReject);

	const { data } = usePaginationFragment(
		FriendshipPendingListFragment,
		fragmentRef
	);

	if (!data) {
		return null;
	}

	const { friendships } = data;

	return (
		<Flex direction="column" grow>
			<Suspense fallback={<Spinner />}>
				{/* No requests found */}
				{friendships.edges.length === 0 && (
					<Flex direction="column" align="center" justify="center" gap={2} grow>
						<Heading variant="h6">No Pending Friend Requests Found</Heading>
						<Text color="lowContrast">
							We don't have a Wumpus to show you, maybe one day...
						</Text>
					</Flex>
				)}

				{friendships.edges.map((edge) => {
					if (edge?.node?.sender) {
						return (
							<Fragment key={edge?.node?.id}>
								<FriendshipCard
									message="Incoming Friend Request"
									fragmentRef={edge?.node?.sender}
								>
									<Tooltip content="Reject" side="top" sideOffset={4}>
										<IconButton
											variant="tertiary"
											onClick={() =>
												rejectFriendship({
													variables: { input: { friendship: edge?.node?.id! } },
												})
											}
										>
											<CircleBackslashIcon height={20} width={20} />
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

export { FriendshipPendingList };
