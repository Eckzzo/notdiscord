import React from 'react';
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
import { Heading } from '@ui/Heading';
import { Spinner } from '@ui/Spinner';
import { AddChannel } from './mutations/AddChannelMutation';
import { AddChannelDialogFragment$key } from '__generated__/AddChannelDialogFragment.graphql';

const AddChannelDialogFragment = graphql`
  fragment AddChannelDialogFragment on ChannelConnection {
    __id
  }
`;

interface AddChannelDialogProps {
  guildId: string;
  children?: React.ReactNode;
  fragmentKey: AddChannelDialogFragment$key;
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

const AddChannelDialog: React.FC<AddChannelDialogProps> = ({ guildId, children, fragmentKey }) => {
  const [newChannel, isLoading] = useMutation(AddChannel);
  const data = useFragment(AddChannelDialogFragment, fragmentKey);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver,
  });
  const { errors } = formState;

  const onSubmit = (input: FormValues) => {
    const config = {
      variables: { input: { ...input, guildId }, connections: [data.__id] },
    };

    newChannel(config);
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap={1}>
            <Dialog.Title asChild>
              <Heading variant='h5'>Add Channel</Heading>
            </Dialog.Title>
            <Dialog.Description asChild>
              <Text color='lowContrast'>Create a new Channel for your NotDiscord Guild!</Text>
            </Dialog.Description>
          </Flex>
          <TextField label='Name' placeholder='Name' error={errors.name?.message} {...register('name')} />
          <TextField
            label='Description'
            placeholder='Description'
            error={errors.description?.message}
            {...register('description')}
          />
          <Button isFullWidth>{isLoading && <Spinner />}Add Channel</Button>
        </Form>
      </Dialog.Content>
    </Dialog>
  );
};

export { AddChannelDialog };
