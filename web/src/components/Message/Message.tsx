import React from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Separator } from '@ui/Separator';
import { getTimeAgo } from 'utils/getTimeAgo';
import { UserAvatar } from 'components/User/UserAvatar';
import { MessageFragment$key } from '__generated__/MessageFragment.graphql';

const MessageFragment = graphql`
  fragment MessageFragment on Message {
    content
    createdAt
    sender {
      username
      ...UserAvatarFragment
    }
  }
`;

interface MessageProps {
  fragmentKey: MessageFragment$key;
}

const Message: React.FC<MessageProps> = ({ fragmentKey }) => {
  const data = useFragment<MessageFragment$key>(MessageFragment, fragmentKey);
  return (
    <Flex gap={2}>
      <UserAvatar fragmentKey={data.sender} />
      <Flex direction='column' gap={1}>
        <Flex align='center' gap={2}>
          <Text weight='semibold'>{data.sender.username}</Text>
          <Separator orientation='vertical' />
          <Text variant='cap' color='lowContrast'>
            2m ago
            {/* Disabled due to hydration errors :( */}
            {/* {getTimeAgo(data.createdAt as string)} */}
          </Text>
        </Flex>
        <Text color='lowContrast'>{data.content}</Text>
      </Flex>
    </Flex>
  );
};

export { Message };
