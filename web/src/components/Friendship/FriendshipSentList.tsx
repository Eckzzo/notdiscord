import { Fragment, Suspense } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { graphql, useMutation, usePaginationFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Button } from '@ui/Button';
import { Spinner } from '@ui/Spinner';
import { Tooltip } from '@ui/Tooltip';
import { Heading } from '@ui/Heading';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { FriendshipCard } from './FriendshipCard';
import { AddFriendDialog } from './AddFriendDialog';
import { FriendshipCancel } from './mutations/FriendshipCancelMutation';
import { FriendshipCancelMutation } from '__generated__/FriendshipCancelMutation.graphql';
import { FriendshipSentListFragment$key } from '__generated__/FriendshipSentListFragment.graphql';

const FriendshipSentListFragment = graphql`
	fragment FriendshipSentListFragment on Query
	@refetchable(queryName: "FriendshipsSent") {
		friendships(status: $status, target: $target, first: $first, after: $after)
			@connection(key: "FriendshipsSent_friendships", filters: []) {
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

interface FriendshipSentListProps {
	fragmentRef: FriendshipSentListFragment$key;
}

const FriendshipSentList: React.FC<FriendshipSentListProps> = ({
	fragmentRef,
}) => {
	const [cancelFriendship, isLoading] =
		useMutation<FriendshipCancelMutation>(FriendshipCancel);

	const { data } = usePaginationFragment(
		FriendshipSentListFragment,
		fragmentRef
	);

	if (!data) {
		return null;
	}

	const handleCancel = (friendshipId: string) => {
		const config = {
			variables: {
				input: { friendship: friendshipId },
				connections: [data.friendships.__id],
			},
		};

		cancelFriendship(config);
	};

	const { friendships } = data;

	if (friendships.edges.length <= 0) {
		return (
			<Flex align="center" justify="center" direction="column" gap={4} grow>
				<Flex direction="column" align="center" gap={2}>
					<Heading variant="h6">No Sent Friend Requests Found</Heading>
					<Text color="lowContrast">
						We don't have a Wumpus, but maybe you can...
					</Text>
				</Flex>
				<AddFriendDialog>
					<Button size="sm">Add a New Friend!</Button>
				</AddFriendDialog>
			</Flex>
		);
	}

	return (
		<Suspense fallback={<Spinner />}>
			{friendships.edges.map((edge) => {
				if (edge?.node?.recipient) {
					return (
						<Fragment key={edge?.node?.id}>
							<FriendshipCard
								message="Outgoing Friend Request"
								fragmentRef={edge?.node?.recipient}
							>
								<Tooltip content="Cancel" side="top" sideOffset={4}>
									<IconButton
										variant="tertiary"
										onClick={() => handleCancel(edge.node?.id!)}
									>
										{isLoading ? (
											<Spinner />
										) : (
											<Cross2Icon height={20} width={20} />
										)}
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

export { FriendshipSentList };
