import React, { Fragment, Suspense } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
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
import { FriendshipDelete } from './mutations/FriendshipDeleteMutation';
import { FriendListFragment$key } from '__generated__/FriendListFragment.graphql';
import { FriendshipDeleteMutation } from '__generated__/FriendshipDeleteMutation.graphql';

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
          sender {
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

  const [deleteFriendship] = useMutation<FriendshipDeleteMutation>(FriendshipDelete);

  const handleDelete = (friendshipId: string) => {
    const config = {
      variables: {
        input: {
          friendship: friendshipId,
        },
        connections: [data.friendships.__id],
      },
    };

    deleteFriendship(config);
  };

  if (!data) {
    return null;
  }

  const { friendships } = data;

  if (friendships.edges.length <= 0) {
    return (
      <Flex align='center' justify='center' direction='column' gap={4} grow>
        <Flex direction='column' align='center' gap={2}>
          <Heading variant='h6'>No Friends Found...</Heading>
          <Text color='lowContrast'>Maybe you mistook it for the other app, if not...</Text>
        </Flex>
        <AddFriendDialog>
          <Button size='sm'>Add a New Friend!</Button>
        </AddFriendDialog>
      </Flex>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      {friendships.edges.map(edge => {
        if (edge && edge.node && edge.node.sender) {
          return (
            <Fragment key={edge.node.id}>
              <FriendshipCard message='Friend' fragmentRef={edge.node.sender}>
                <Tooltip content='Delete' side='top' sideOffset={4}>
                  <IconButton
                    variant='tertiary'
                    onClick={() => {
                      if (edge && edge.node) handleDelete(edge.node.id);
                    }}
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

export { FriendList };
