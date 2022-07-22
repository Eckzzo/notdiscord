import * as yup from 'yup';
import { graphql } from 'relay-runtime';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFragment, useMutation } from 'react-relay';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { Form } from '@ui/Form';
import { Button } from '@ui/Button';
import { Dialog } from '@ui/Dialog';
import { Tooltip } from '@ui/Tooltip';
import { Heading } from '@ui/Heading';
import { TextField } from '@ui/Field';
import { GuildJoin } from './mutations/GuildJoinMutation';
import { JoinGuildDialogFragment$key } from '__generated__/JoinGuildDialogFragment.graphql';
import {
	GuildJoinMutation,
	GuildJoinMutation$data,
} from '__generated__/GuildJoinMutation.graphql';

const JoinGuildDialogFragment = graphql`
	fragment JoinGuildDialogFragment on GuildConnection {
		__id
	}
`;

interface JoinGuildDialogProps {
	children?: React.ReactNode;
	fragmentKey: JoinGuildDialogFragment$key;
}

interface FormValues {
	passcode: string;
}

const schema = yup.object({
	passcode: yup.string().required('Required'),
});

const resolver = yupResolver(schema);

const JoinGuildDialog: React.FC<JoinGuildDialogProps> = ({
	children,
	fragmentKey,
}) => {
	const [joinGuild, isLoading] = useMutation<GuildJoinMutation>(GuildJoin);
	const data = useFragment(JoinGuildDialogFragment, fragmentKey);
	const { register, handleSubmit, formState, setError } = useForm<FormValues>({
		resolver,
	});
	const { errors } = formState;

	const onSubmit = (input: FormValues) => {
		const config = {
			variables: { input, connections: [data.__id] },
			onCompleted: (data: GuildJoinMutation$data) => {
				const { error } = data.GuildJoinMutation!;
				if (error && error.message) {
					const { field, message } = error;
					setError(field as keyof FormValues, { message });
				}
			},
		};

		joinGuild(config);
	};

	return (
		<Dialog>
			<Tooltip content="Join a Guild" side="right" sideOffset={2}>
				<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			</Tooltip>
			<Dialog.Content>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap={1}>
						<Dialog.Title asChild>
							<Heading variant="h5">Join Guild</Heading>
						</Dialog.Title>
						<Dialog.Description asChild>
							<Text color="lowContrast">Join a Guild!</Text>
						</Dialog.Description>
					</Flex>
					<TextField
						label="Passcode"
						placeholder="Passcode"
						error={errors.passcode?.message}
						{...register('passcode')}
					/>
					<Button isFullWidth>Join Guild</Button>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
};

export { JoinGuildDialog };
