import { Button } from '@ui/Button';
import { Container } from '@ui/Container';
import { Flex } from '@ui/Flex';
import { Heading } from '@ui/Heading';
import { Panel } from '@ui/Panel';
import { Text } from '@ui/Text';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPage } from 'next';
import NextLink from 'next/link';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
	return (
		<AuthLayout>
			<Container>
				<Panel css={{ p: '$6', borderRadius: '$4' }}>
					<Flex direction="column" justify="center" align="center" gap={3}>
						<Heading variant="h5">Welcome to NotDiscord!</Heading>
						<NextLink href="/auth/signup">
							<Button isFullWidth>Sign Up</Button>
						</NextLink>
						<NextLink href="/auth/signin">
							<Button variant="tertiary" isFullWidth>
								Sign In
							</Button>
						</NextLink>
					</Flex>
				</Panel>
			</Container>
		</AuthLayout>
	);
};

export default Home;
