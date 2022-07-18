import type { NextPage } from 'next';

import { Container } from '@ui/Container';
import { SignUpForm } from '../components/Auth/SignUpForm';

const Register: NextPage = () => {
  return (
    <Container size={1}>
      <SignUpForm />
    </Container>
  );
};

export default Register;
