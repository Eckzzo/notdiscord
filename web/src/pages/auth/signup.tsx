import { Container } from '@ui/Container';
import { SignUpForm } from 'components/Auth/SignUpForm';
import { AuthLayout } from 'components/Layout/AuthLayout';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';

interface SignUpProps {}

const SignUp: NextPageWithLayout<SignUpProps> = () => {
	return (
		<Container size={1}>
			<SignUpForm />
		</Container>
	);
};

SignUp.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default SignUp;
