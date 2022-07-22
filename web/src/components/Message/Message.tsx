import { graphql } from 'relay-runtime';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Avatar } from '@ui/Avatar';
import { Separator } from '@ui/Separator';
import { useFragment } from 'react-relay';

import { MessageFragment$key } from '__generated__/MessageFragment.graphql';

const MessageFragment = graphql`
	fragment MessageFragment on Message {
		content
		createdAt
		sender {
			username
		}
	}
`;

interface MessageProps {
	fragmentKey: MessageFragment$key;
}

const Message: React.FC<MessageProps> = ({ fragmentKey }) => {
	const data = useFragment(MessageFragment, fragmentKey);
	return (
		<Flex gap={2}>
			<Avatar fallback={data.sender.username} />
			<Flex direction="column" gap={1}>
				<Flex align="center" gap={3}>
					<Text weight="semibold">{data.sender.username}</Text>
					<Separator orientation="vertical" />
					<Text variant="cap" color="lowContrast">
						2min ago
					</Text>
				</Flex>
				<Text color="lowContrast">{data.content}</Text>
			</Flex>
		</Flex>
	);
};

export { Message };
