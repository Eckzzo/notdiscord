import { ROOT_ID } from 'relay-runtime';
import { Fragment, Suspense, useCallback } from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import {
	ConnectionHandler,
	graphql,
	useMutation,
	usePaginationFragment,
} from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Spinner } from '@ui/Spinner';
import { Heading } from '@ui/Heading';
import { Tooltip } from '@ui/Tooltip';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { FriendshipCard } from './FriendshipCard';
import { FriendshipAccept } from './FriendshipAcceptMutation';
import { FriendshipReject } from './FriendshipRejectMutation';
import { FriendshipRejectMutation } from '__generated__/FriendshipRejectMutation.graphql';
import { FriendshipAcceptMutation } from '__generated__/FriendshipAcceptMutation.graphql';
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
	const [rejectFriendship, isRejectLoading] =
		useMutation<FriendshipRejectMutation>(FriendshipReject);

	const [acceptFriendship, isAcceptLoading] =
		useMutation<FriendshipAcceptMutation>(FriendshipAccept);

	const { data } = usePaginationFragment(
		FriendshipPendingListFragment,
		fragmentRef
	);

	// Honestly dont know if its worth to use this callback here
	const handleReject = useCallback(
		(friendshipId: string) => {
			const config = {
				variables: { input: { friendship: friendshipId } },
			};

			rejectFriendship(config);
		},
		[rejectFriendship]
	);

	const handleAccept = useCallback(
		(friendshipId: string) => {
			const connId = ConnectionHandler.getConnectionID(
				ROOT_ID,
				'FriendList_friendships'
			);

			const config = {
				variables: {
					input: { friendship: friendshipId },
					connections: [connId],
				},
			};

			acceptFriendship(config);
		},
		[acceptFriendship]
	);

	if (!data) {
		return null;
	}

	const { friendships } = data;

	if (friendships.edges.length <= 0) {
		return (
			<Flex direction="column" align="center" justify="center" gap={2} grow>
				<Heading variant="h6">No Pending Friend Requests Found</Heading>
				<Text color="lowContrast">
					No Wumpus on this castle, maybe one day...
				</Text>
			</Flex>
		);
	}

	return (
		<Suspense fallback={<Spinner />}>
			{friendships.edges.map((edge) => {
				if (edge?.node?.sender) {
					return (
						<Fragment key={edge?.node?.id}>
							<FriendshipCard
								message="Incoming Friend Request"
								fragmentRef={edge?.node?.sender}
							>
								<Tooltip content="Accept" side="top" sideOffset={4}>
									<IconButton
										variant="tertiary"
										onClick={() => handleAccept(edge?.node?.id!)}
									>
										<CheckIcon height={20} width={20} />
									</IconButton>
								</Tooltip>
								<Tooltip content="Reject" side="top" sideOffset={4}>
									<IconButton
										variant="tertiary"
										onClick={() => handleReject(edge?.node?.id!)}
									>
										<Cross2Icon height={20} width={20} />
									</IconButton>
								</Tooltip>
							</FriendshipCard>
							<Separator />
						</Fragment>
					);
				}
			})}
		</Suspense>
	);
};

export { FriendshipPendingList };
