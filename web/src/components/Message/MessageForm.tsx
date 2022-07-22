import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Flex } from '@ui/Flex';
import { Form } from '@ui/Form';
import { Field } from '@ui/Field';
import { graphql } from 'relay-runtime';
import { MessageFormFragment$key } from '__generated__/MessageFormFragment.graphql';
import { useFragment, useMutation } from 'react-relay';
import { MessageCreate } from './mutations/MessageCreateMutation';
import { MessageCreateMutation } from '__generated__/MessageCreateMutation.graphql';

const MessageFormFragment = graphql`
	fragment MessageFormFragment on MessageConnection {
		__id
	}
`;

interface MessageFormProps {
	fragmentKey: MessageFormFragment$key;
	location: string;
}

interface FormValues {
	content: string;
}

const schema = yup.object({
	content: yup.string().required('Required').max(300),
});

const resolver = yupResolver(schema);

const MessageForm: React.FC<MessageFormProps> = ({ fragmentKey, location }) => {
	const [createMessage, isLoading] =
		useMutation<MessageCreateMutation>(MessageCreate);
	const data = useFragment(MessageFormFragment, fragmentKey);
	const { register, handleSubmit, reset } = useForm<FormValues>({
		resolver,
	});

	if (!data) {
		return null;
	}

	const onSubmit = (input: FormValues) => {
		const config = {
			variables: { input: { ...input, location }, connections: [data.__id] },
		};

		if (!isLoading) {
			createMessage(config);
			reset();
		}
	};

	return (
		<Flex css={{ p: '$4', borderTop: '1px solid $gray300' }}>
			<Form onSubmit={handleSubmit(onSubmit)} css={{ width: '100%' }}>
				<Field>
					<VisuallyHidden.Root>
						<Field.Label>Message</Field.Label>
					</VisuallyHidden.Root>
					<Field.Input
						variant="secondary"
						placeholder="Type a message"
						{...register('content')}
					/>
				</Field>
			</Form>
		</Flex>
	);
};

export { MessageForm };
