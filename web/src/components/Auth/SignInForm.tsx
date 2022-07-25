import React from 'react';
import * as yup from 'yup';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form } from '@ui/Form';
import { Flex } from '@ui/Flex';
import { Text } from '@ui/Text';
import { Link } from '@ui/Link';
import { Button } from '@ui/Button';
import { Heading } from '@ui/Heading';
import { Spinner } from '@ui/Spinner';
import { TextField } from '@ui/Field';

import { SignInMutation, SignInMutationType } from './SignInMutation';
import { SignInMutation$data } from '__generated__/SignInMutation.graphql';

const schema = yup.object({
  email: yup.string().email('Invalid Email Address').required('Required').trim(),
  password: yup.string().required('Required').trim(),
});

const resolver = yupResolver(schema);

interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const { push } = useRouter();
  const { register, setError, handleSubmit, formState } = useForm<FormValues>({
    resolver,
  });

  const [signIn, loading] = useMutation<SignInMutationType>(SignInMutation);

  const { errors } = formState;

  const onSubmit = useCallback(
    (input: FormValues) => {
      const config = {
        variables: { input },
        onCompleted: (data: SignInMutation$data) => {
          if (!data.UserSignInMutation) return;
          const { error } = data.UserSignInMutation;
          if (error && error.message) {
            const { field, message } = error;
            setError(field as keyof FormValues, { message });
          } else {
            push('/me');
          }
        },
      };

      signIn(config);
    },
    [signIn, setError, push],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gap={4}>
        <Flex direction='column' align='center' gap={1}>
          <Heading variant='h4' weight='bold'>
            Sign In
          </Heading>
          <Text color='lowContrast'>Sign In to your NotDiscord account!</Text>
        </Flex>
        <Flex direction='column' gap={4}>
          <TextField
            type='text'
            label='Email'
            placeholder='Email'
            error={errors.email?.message}
            {...register('email')}
          />
          <TextField
            type='password'
            label='Password'
            placeholder='Password'
            error={errors.password?.message}
            {...register('password')}
          />
          <Button isFullWidth type='submit'>
            {loading && <Spinner />}
            Sign In
          </Button>
        </Flex>
        <Flex justify='center'>
          <Text>
            Need an account?{' '}
            <NextLink href='/auth/signup' passHref>
              <Link>Sign Up</Link>
            </NextLink>
          </Text>
        </Flex>
      </Flex>
    </Form>
  );
}

export { SignInForm };
