import React from 'react';
import { graphql, useFragment } from 'react-relay';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { styled } from '@stitches';
import { Highlight } from '@ui/Highlight';
import { UserAvatar } from 'components/User/UserAvatar';
import { FriendshipCardFragment$key } from '../../__generated__/FriendshipCardFragment.graphql';

const StyledFriendshipCard = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '$4',
  pl: '$4',
  pr: '$5',
  '&:hover': {
    backgroundColor: '$grayA100',
  },
});

const FriendshipCardFragment = graphql`
  fragment FriendshipCardFragment on User {
    username
    denominator
    ...UserAvatarFragment
  }
`;

interface FriendshipCardProps {
  children?: React.ReactNode;
  fragmentRef: FriendshipCardFragment$key;
  message?: string;
}

const FriendshipCard: React.FC<FriendshipCardProps> = ({ fragmentRef, message, children }) => {
  const data = useFragment<FriendshipCardFragment$key>(FriendshipCardFragment, fragmentRef);
  return (
    <StyledFriendshipCard>
      <Flex align='center' gap={3}>
        <UserAvatar fragmentKey={data} />
        <Flex direction='column' gap={1}>
          <Text weight='semibold'>
            {data.username}
            <Highlight color='lowContrast'>#{data.denominator}</Highlight>
          </Text>
          {message && (
            <Text variant='cap' color='lowContrast'>
              {message}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex gap={3}>{children}</Flex>
    </StyledFriendshipCard>
  );
};

FriendshipCard.displayName = 'FriendshipCard';

export { FriendshipCard };
