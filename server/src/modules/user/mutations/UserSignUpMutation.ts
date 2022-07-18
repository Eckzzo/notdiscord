import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserType } from '../UserType';
import { UserModel } from '../UserModel';
import * as UserLoader from '../UserLoader';
import { fieldError } from '../../../utils/fieldError';
import { GraphQLContext } from '../../../graphql/context';
import { generateToken, setAuthCookie } from '../../../auth';
import { rollDenominator } from '../../../utils/rollDenominator';
import { FieldErrorField } from '../../field-error/FieldErrorField';
import { NewUserArgs, validateAndSanitizeNewUser } from '../../../utils/validateUser';

type UserSignUpMutationArgs = NewUserArgs;

const UserSignUpMutation = mutationWithClientMutationId({
  name: 'UserSignUpMutation',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: UserSignUpMutationArgs, { ctx }: GraphQLContext) => {
    // TODO: Improve sanitization of inputs
    const { username, email, password, error } = validateAndSanitizeNewUser(args);

    if (error) {
      return error;
    }

    const isEmailInUse = await UserModel.exists({ email });

    if (isEmailInUse) {
      return fieldError('email', 'Email Already in Use');
    }

    // TODO: Improve denominator generation and insertion
    // Maybe store denominators in a sorted set on redis?
    let denominator = rollDenominator();

    const isUsernameDenominatorInUse = await UserModel.exists({ username, denominator });
    // If the random generated denominator is already in use
    // get the highest one that matches the username and add one to it
    if (isUsernameDenominatorInUse) {
      // TODO: Create schema method to find the highest denominator
      const latestDenominatorInUse = await UserModel.findOne({ username }).sort('-denominator');
      if (!latestDenominatorInUse) {
        return fieldError('username', 'Invalid Username');
      }

      denominator = latestDenominatorInUse.denominator + 1;
    }

    const user = await new UserModel({
      username,
      email,
      password,
      denominator,
    }).save();

    const token = generateToken(user);

    setAuthCookie(ctx, user);

    return {
      token,
      id: user._id,
      success: 'User successfully signed up',
    };
  },
  outputFields: {
    me: {
      type: UserType,
      resolve: async ({ id }, _, context) => {
        return UserLoader.load(context, id);
      },
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    ...FieldErrorField,
    ...successField,
  },
});

export { UserSignUpMutation };
