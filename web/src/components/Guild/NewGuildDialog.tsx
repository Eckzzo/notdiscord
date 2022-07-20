import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { graphql, useFragment, useMutation } from 'react-relay';

import { Flex } from '@ui/Flex';
import { Form } from '@ui/Form';
import { Text } from '@ui/Text';
import { Button } from '@ui/Button';
import { Dialog } from '@ui/Dialog';
import { TextField } from '@ui/Field';
import { Tooltip } from '@ui/Tooltip';
import { Heading } from '@ui/Heading';
import { Spinner } from '@ui/Spinner';
import { GuildCreate } from './mutations/GuildCreateMutation';
import { NewGuildDialogFragment$key } from '__generated__/NewGuildDialogFragment.graphql';

const NewGuildDialogFragment = graphql`
	fragment NewGuildDialogFragment on GuildConnection {
		__id
	}
`;

interface NewGuildDialogProps {
	fragmentKey: NewGuildDialogFragment$key;
	children?: React.ReactNode;
}

interface FormValues {
	name: string;
	description: string;
}

const schema = yup.object({
	name: yup.string().required('Required'),
	description: yup.string().required('Required'),
});

const resolver = yupResolver(schema);

const NewGuildDialog: React.FC<NewGuildDialogProps> = ({
	children,
	fragmentKey,
}) => {
	const [newGuild, isLoading] = useMutation(GuildCreate);
	const data = useFragment(NewGuildDialogFragment, fragmentKey);
	const { register, handleSubmit, formState } = useForm<FormValues>({
		resolver,
	});
	const { errors } = formState;

	const onSubmit = (input: FormValues) => {
		const config = {
			variables: { input, connections: [data.__id] },
		};

		newGuild(config);
	};

	return (
		<Dialog>
			<Tooltip content="New Guild" side="right" sideOffset={2}>
				<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			</Tooltip>
			<Dialog.Content>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Flex direction="column" gap={1}>
						<Dialog.Title asChild>
							<Heading variant="h5">New Guild</Heading>
						</Dialog.Title>
						<Dialog.Description asChild>
							<Text color="lowContrast">Create a new NotDiscord Guild!</Text>
						</Dialog.Description>
					</Flex>
					<TextField
						label="Name"
						placeholder="Name"
						error={errors.name?.message}
						{...register('name')}
					/>
					<TextField
						label="Description"
						placeholder="Description"
						error={errors.description?.message}
						{...register('description')}
					/>
					<Button isFullWidth>
						{isLoading && <Spinner />}Create New Guild
					</Button>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
};

export { NewGuildDialog };
