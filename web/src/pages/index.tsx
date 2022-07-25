import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { Text } from '@ui/Text';
import { Link } from '@ui/Link';
import { Flex } from '@ui/Flex';
import { Panel } from '@ui/Panel';
import { Heading } from '@ui/Heading';
import { Container } from '@ui/Container';
import { AuthLayout } from 'components/Layout/AuthLayout';

const Home: NextPage = () => {
  return (
    <AuthLayout>
      <Container size={1}>
        <Panel css={{ px: '$6', py: '$7', borderRadius: '$4' }}>
          <Flex direction='column' justify='center' gap={4}>
            <Heading variant='h5'>Welcome to NotDiscord!</Heading>
            <Text color='lowContrast'>
              Welcome! NotDiscord is a Discord look a like made using React, Next.js, Relay, Stitches, Radix Primitives
              and more.
            </Text>
            <Text color='lowContrast'>
              This is an experimental project, with the main goal being to build an app that integrates both Relay and
              Next.js, it&apos;s also open source and you can contribute and read more about it on GitHub by clicking{' '}
              <Link>here!</Link>
            </Text>
            <Text color='lowContrast'>
              Start by{' '}
              <NextLink href='/auth/signup'>
                <Link>Signing Up</Link>
              </NextLink>{' '}
              or{' '}
              <NextLink href='/auth/signin'>
                <Link>Signing In</Link>
              </NextLink>
            </Text>
          </Flex>
        </Panel>
      </Container>
    </AuthLayout>
  );
};

export default Home;
