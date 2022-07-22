import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Heading } from '@ui/Heading';
import { Highlight } from '@ui/Highlight';
import { Separator } from '@ui/Separator';
import { Message } from 'components/Message/Message';
import { graphql } from 'relay-runtime';
import { ChannelFeedFragment$key } from '__generated__/ChannelFeedFragment.graphql';
import { usePaginationFragment } from 'react-relay';
import { MessageForm } from 'components/Message/MessageForm';
import { ScrollArea } from '@ui/ScrollArea';
import { styled } from '@stitches';
import { Box } from '@ui/Box';
import { useEffect, useRef } from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const StyledScrollArea = styled(ScrollArea, {
	height: '100%',
	maxHeight: '100%',
	overflow: 'hidden',
	display: 'flex',
});

const ChannelFeedFragment = graphql`
	fragment ChannelFeedFragment on Channel
	@refetchable(queryName: "ChannelFeedPaginationQuery") {
		id
		name
		description
		messages(last: $last, before: $before)
			@connection(key: "Channel_messages") {
			__id
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
	const { data } = usePaginationFragment(ChannelFeedFragment, fragmentKey);

	if (!data) {
		return null;
	}

	useEffect(() => {
		if (ref.current) {
			ref.current?.scrollIntoView();
		}
	});

	return (
		<>
			<StyledScrollArea>
				<Flex direction="column" justify="end" css={{ p: '$4' }} gap={5} grow>
					<Flex direction="column" gap={2}>
						<Heading weight="bold" variant="h4">
							Welcome to <Highlight color="violet">#{data.name}!</Highlight>
						</Heading>
						<Text color="lowContrast">This is the start of #{data.name}</Text>
					</Flex>
					<Separator />
					<Flex direction="column" gap={5} css={{ px: '$2' }}>
						{data.messages?.edges.map((_, index, arr) => {
							// const arr = [a, b, c, d, f]
							// arr[5 - 1 - 0] -> arr[4]
							// arr[5 - 1 - 1] -> arr[3]
							// ...
							const edge = arr[arr.length - 1 - index];
							return <Message key={edge?.node?.id} fragmentKey={edge?.node!} />;
						})}
					</Flex>
				</Flex>
				<div ref={ref} />
			</StyledScrollArea>
			<MessageForm location={data.id} fragmentKey={data.messages!} />
		</>
	);
};

export { ChannelFeed };
