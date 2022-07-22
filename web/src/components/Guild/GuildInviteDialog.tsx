import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { Dialog } from '@ui/Dialog';
import { Heading } from '@ui/Heading';
import { Tooltip } from '@ui/Tooltip';
import { GuildInviteDialogFragment$key } from '__generated__/GuildInviteDialogFragment.graphql';

const GuildInviteDialogFragment = graphql`
	fragment GuildInviteDialogFragment on Guild {
		name
		passcode
	}
`;

interface GuildInviteDialogProps {
	children?: React.ReactNode;
	fragmentKey: GuildInviteDialogFragment$key;
}

const GuildInviteDialog: React.FC<GuildInviteDialogProps> = ({
	children,
	fragmentKey,
}) => {
	const data = useFragment(GuildInviteDialogFragment, fragmentKey);
	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content>
				<Flex direction="column" gap={4}>
					<Flex direction="column" gap={1}>
						<Dialog.Title asChild>
							<Heading variant="h5">Invite to Guild</Heading>
						</Dialog.Title>
						<Dialog.Description asChild>
							<Text color="lowContrast">
								Invite your members to {data.name}!
							</Text>
						</Dialog.Description>
					</Flex>
					<Flex align="center" gap={1}>
						<Text weight="semibold" variant="cap">
							Passcode:
						</Text>
						<Tooltip content="Copy to Clipboard" side="top" sideOffset={2}>
							<Text
								onClick={() => navigator.clipboard.writeText(data.passcode!)}
								variant="cap"
								color="violet"
								css={{ cursor: 'pointer' }}
							>
								{data.passcode}
							</Text>
						</Tooltip>
					</Flex>
				</Flex>
			</Dialog.Content>
		</Dialog>
	);
};

export { GuildInviteDialog };
