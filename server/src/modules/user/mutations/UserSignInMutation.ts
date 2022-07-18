import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { successField } from '@entria/graphql-mongo-helpers';

import { UserType } from '../UserType';
import { UserModel } from '../UserModel';
import * as UserLoader from '../UserLoader';
import { setAuthCookie } from '../../../auth';
import { fieldError } from '../../../utils/fieldError';
import { GraphQLContext } from '../../../graphql/context';
import { FieldErrorField } from '../../field-error/FieldErrorField';

interface UserSignInMutationArgs {
  email: string;
  password: string;
}

const UserSignInMutation = mutationWithClientMutationId({
  name: 'UserSignInMutation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: UserSignInMutationArgs, { ctx }: GraphQLContext) => {
    // TODO: Improve sanitization of inputs
    const { email, password } = {
      password: args.password.trim(),
      email: args.email.trim().toLowerCase(),
    };

    const user = await UserModel.findOne({ email });

    if (!user) {
      return fieldError('email', 'User not found');
    }

    const isPasswordCorrect = user.authenticate(password);

    if (!isPasswordCorrect) {
      // Could improve security by logging an attempt of login on redis and setting a max amount
      return fieldError('password', 'Wrong password');
    }

    setAuthCookie(ctx, user);

    return {
      id: user._id,
      success: 'Sign In Successful',
    };
  },
  outputFields: {
    me: {
      type: UserType,
      resolve: ({ id }, _, context) => {
        return UserLoader.load(context, id);
      },
    },
    ...FieldErrorField,
    ...successField,
  },
});

export { UserSignInMutation };
