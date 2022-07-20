import * as yup from 'yup';
import { useMutation } from 'react-relay';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Field } from '@ui/Field';
import { styled } from '@stitches';
import { Dialog } from '@ui/Dialog';
import { Message } from '@ui/Message';
import { Spinner } from '@ui/Spinner';
import { Heading } from '@ui/Heading';
import { IconButton } from '@ui/IconButton';

import {
	FriendshipSend,
	FriendshipSendUpdater,
} from './mutations/FriendshipSendMutation';
import {
	FriendshipSendMutation,
	FriendshipSendMutation$data,
} from '__generated__/FriendshipSendMutation.graphql';

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledForm = styled('form', {
	display: 'flex',
	alignItems: 'end',
	gap: '$2',
});

/* -------------------------------------------------------------------------------------------------
 * Header
 * ----------------------------------------------------------------------------------------------- */

const Title: React.FC = () => {
	return (
		<Flex direction="column" gap={1}>
			<Dialog.Title asChild>
				<Heading variant="h5">Add Friend</Heading>
			</Dialog.Title>
			<Dialog.Description asChild>
				<Text color="lowContrast">
					Add a friend by using their NotDiscord tag!
				</Text>
			</Dialog.Description>
		</Flex>
	);
};

/* -------------------------------------------------------------------------------------------------
 * Form
 * ----------------------------------------------------------------------------------------------- */

interface FormValues {
	username: string;
}

const formSchema = yup.object({
	username: yup.string().required('Required').trim(),
});

const resolver = yupResolver(formSchema);

const Form: React.FC = () => {
	const [successMessage, setSuccessMessage] = useState<null | string>(null);

	const [sendFriendship, loading] =
		useMutation<FriendshipSendMutation>(FriendshipSend);

	const { register, handleSubmit, formState, setError } = useForm<FormValues>({
		resolver,
	});

	const { errors } = formState;

	const onSubmit = useCallback(
		(input: FormValues) => {
			setSuccessMessage(null);

			const config = {
				variables: { input },
				updater: FriendshipSendUpdater,
				onCompleted: (data: FriendshipSendMutation$data) => {
					const { FriendshipSendMutation } = data;
					const { error, success } = FriendshipSendMutation!;
					if (error && error.message) {
						const { message } = error;
						setError('username', { message });
					}
					if (success) {
						setSuccessMessage(success);
					}
				},
			};

			sendFriendship(config);
		},
		[sendFriendship, setError]
	);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<Field>
				<Flex direction="column" gap={1} grow>
					<Field.Label>Username</Field.Label>
					<Flex gap={1}>
						<Field.Input
							placeholder="Username#0000"
							{...register('username')}
						/>
						<IconButton type="submit">
							{loading ? <Spinner /> : <MagnifyingGlassIcon />}
						</IconButton>
					</Flex>
					{errors && (
						<Message variant="error">{errors.username?.message}</Message>
					)}
					{successMessage && (
						<Message variant="success">{successMessage}</Message>
					)}
				</Flex>
			</Field>
		</StyledForm>
	);
};

/* -------------------------------------------------------------------------------------------------
 * Content
 * ----------------------------------------------------------------------------------------------- */

interface ContentProps {
	children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
	return (
		<Dialog.Content>
			<Flex direction="column" gap={4}>
				<Title />
				{children}
			</Flex>
		</Dialog.Content>
	);
};

/* -------------------------------------------------------------------------------------------------
 * AddFriendDialog
 * ----------------------------------------------------------------------------------------------- */

interface AddFriendDialogProps {
	children?: React.ReactNode;
}

const AddFriendDialog: React.FC<AddFriendDialogProps> = ({ children }) => {
	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Content>
				<Form />
			</Content>
		</Dialog>
	);
};

export { AddFriendDialog };
