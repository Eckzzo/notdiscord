import { graphql } from 'relay-runtime';
import { usePaginationFragment } from 'react-relay';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { styled } from '@stitches';
import { Heading } from '@ui/Heading';
import { Highlight } from '@ui/Highlight';
import { Separator } from '@ui/Separator';
import { ScrollArea } from '@ui/ScrollArea';
import { Message } from 'components/Message/Message';
import { MessageForm } from 'components/Message/MessageForm';
import { useChannelSubscription } from './subscriptions/useChannelSubscription';
import { ChannelFeedFragment$key } from '__generated__/ChannelFeedFragment.graphql';

const StyledScrollArea = styled(ScrollArea, {
  height: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  display: 'flex',
  zIndex: '1',
});

const ChannelFeedFragment = graphql`
  fragment ChannelFeedFragment on Channel @refetchable(queryName: "ChannelFeedPaginationQuery") {
    id
    name
    messages(first: $first, after: $after) @connection(key: "Channel_messages") {
      __id
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      ...MessageFormFragment
      edges {
        node {
          id
          ...MessageFragment
        }
      }
    }
  }
`;

interface ChannelFeedProps {
  fragmentKey: ChannelFeedFragment$key;
}

const ChannelFeed: React.FC<ChannelFeedProps> = ({ fragmentKey }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(ChannelFeedFragment, fragmentKey);

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  useChannelSubscription({
    input: { location: data.id },
    connections: [data.messages?.__id ?? ''],
  });

  const [sentryRef] = useInfiniteScroll({
    hasNextPage: hasNext,
    loading: isLoadingNext,
    onLoadMore: loadMore,
    disabled: !isReady,
    rootMargin: '200px 0px 0px 0px',
  });

  if (!data) {
    return null;
  }

  // 6am solutions 🥺
  // TODO: Need to really improve the infinite scroll
  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollIntoView();
      setIsReady(true);
    }
  }, [data.messages]);

  return (
    <>
      <StyledScrollArea>
        <Flex direction='column' css={{ p: '$4' }} gap={5} grow>
          {!hasNext && (
            <>
              <Flex direction='column' justify='end' gap={2}>
                <Heading weight='bold' variant='h4'>
                  Welcome to <Highlight color='violet'>#{data.name}!</Highlight>
                </Heading>
                <Text color='lowContrast'>This is the start of #{data.name}</Text>
              </Flex>
              <Separator />
            </>
          )}
          <div ref={sentryRef} />
          <Flex direction='column' gap={6} css={{ px: '$2' }}>
            {data.messages?.edges.map((_, index, arr) => {
              // Reverse the result array
              // const arr = [a, b, c, d, f]
              // arr[5 - 1 - 0] -> arr[4] -> f
              // arr[5 - 1 - 1] -> arr[3] -> d
              // ...
              const edge = arr[arr.length - 1 - index];
              if (edge && edge.node) {
                return <Message key={edge?.node?.id} fragmentKey={edge?.node} />;
              }
            })}
          </Flex>
        </Flex>
        <div ref={ref} />
      </StyledScrollArea>
      {data.messages && <MessageForm location={data.id} fragmentKey={data.messages} />}
    </>
  );
};

export { ChannelFeed };
