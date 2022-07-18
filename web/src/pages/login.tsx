import type { NextPage } from 'next';
import { Container } from '@ui/Container';
import { SignInForm } from '../components/Auth/SignInForm';

const Login: NextPage = () => {
  return (
    <Container size={1}>
      <SignInForm />
    </Container>
  );
};

export default Login;
