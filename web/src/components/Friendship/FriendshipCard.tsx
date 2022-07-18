import { graphql, useFragment } from 'react-relay';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { styled } from '@stitches';
import { Avatar } from '@ui/Avatar';
import { Highlight } from '@ui/Highlight';

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
  }
`;

interface FriendshipCardProps {
  children?: React.ReactNode;
  fragmentRef: FriendshipCardFragment$key;
  message?: string;
}

const FriendshipCard: React.FC<FriendshipCardProps> = ({
  fragmentRef,
  message,
  children,
}) => {
  const data = useFragment<FriendshipCardFragment$key>(
    FriendshipCardFragment,
    fragmentRef,
  );
  return (
    <StyledFriendshipCard>
      <Flex align="center" gap={3}>
        <Avatar src="/anya.jpg" />
        <Flex direction="column" gap={1}>
          <Text weight="semibold">
            {data.username}
            <Highlight color="lowContrast">#{data.denominator}</Highlight>
          </Text>
          {message && (
            <Text variant="cap" color="lowContrast">
              {message}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex gap={3}>{children}</Flex>
    </StyledFriendshipCard>
  );
};

// <Tooltip content="Accept" side="top">
//           <IconButton variant="ghost" size="md">
//             <CheckIcon width={20} height={20} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip content="Reject" side="top">
//           <IconButton variant="ghost" size="md">
//             <Cross2Icon width={20} height={20} />
//           </IconButton>
//         </Tooltip>

FriendshipCard.displayName = 'FriendshipCard';

export { FriendshipCard };
