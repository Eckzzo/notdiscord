import * as yup from 'yup';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from '@ui/Text';
import { Link } from '@ui/Link';
import { Flex } from '@ui/Flex';
import { Form } from '@ui/Form';
import { Button } from '@ui/Button';
import { Heading } from '@ui/Heading';
import { Spinner } from '@ui/Spinner';
import { TextField } from '@ui/Field';

import { SignUpMutation, SignUpMutationType } from './SignUpMutation';
import { SignUpMutation$data } from '__generated__/SignUpMutation.graphql';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Required').trim(),
  username: yup.string().required('Required').trim(),
  password: yup.string().required('Required').trim(),
  confirmPassword: yup
    .string()
    .required('Required')
    .test(
      'passwords-match',
      'Passwords must match',
      (value, context) => context.parent.password === value,
    )
    .trim(),
});

const resolver = yupResolver(schema);

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const { push } = useRouter();
  const { register, setError, handleSubmit, formState } = useForm<FormValues>({
    resolver,
  });

  const { errors } = formState;

  const [signUp, isInFlight] = useMutation<SignUpMutationType>(SignUpMutation);

  const onSubmit = useCallback(
    (input: FormValues) => {
      const config = {
        variables: { input },
        onCompleted: (data: SignUpMutation$data) => {
          const { error } = data.UserSignUpMutation!;
          if (error && error.message) {
            const { field, message } = error;
            setError(field as keyof FormValues, { message });
          } else {
            push('/me');
          }
        },
      };

      signUp(config);
    },
    [signUp, setError, push],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" align="center" gap={1}>
          <Heading variant="h4" weight="bold">
            Sign Up
          </Heading>
          <Text color="lowContrast">Sign Up a new accord account!</Text>
        </Flex>
        <Flex direction="column" gap={4}>
          <TextField
            type="text"
            label="Email"
            placeholder="Email"
            error={errors.email?.message}
            {...register('email')}
          />
          <TextField
            type="text"
            label="Username"
            placeholder="Username"
            error={errors.username?.message}
            {...register('username')}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            {...register('password')}
          />
          <TextField
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button isFullWidth>{isInFlight && <Spinner />}Sign Up</Button>
        </Flex>
        <Flex justify="center">
          <Text>
            Already have an account?{' '}
            <NextLink href="login" passHref>
              <Link>Sign In</Link>
            </NextLink>
          </Text>
        </Flex>
      </Flex>
    </Form>
  );
}

export { SignUpForm };
