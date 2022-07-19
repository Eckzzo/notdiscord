import { Container } from '@ui/Container';
import { SignInForm } from 'components/Auth/SignInForm';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';

interface SignInProps {}

const SignIn: NextPageWithLayout<SignInProps> = () => {
	return (
		<Container size={1}>
			<SignInForm />
		</Container>
	);
};

SignIn.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
