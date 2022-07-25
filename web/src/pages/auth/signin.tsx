import React from 'react';

import { Panel } from '@ui/Panel';
import { Container } from '@ui/Container';
import { SignInForm } from 'components/Auth/SignInForm';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';

const SignIn: NextPageWithLayout<undefined> = () => {
  return (
    <Container size={1}>
      <Panel css={{ px: '$6', py: '$8', borderRadius: '$4' }}>
        <SignInForm />
      </Panel>
    </Container>
  );
};

SignIn.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
