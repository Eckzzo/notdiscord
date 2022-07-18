import { GraphQLObjectType, GraphQLString } from 'graphql';

import { FieldError } from '../../utils/fieldError';
import { GraphQLContext } from '../../graphql/context';

const FieldErrorType = new GraphQLObjectType<FieldError, GraphQLContext>({
  name: 'FieldError',
  description: 'An object containing an error message and the field the error belongs to',
  fields: () => ({
    field: {
      type: GraphQLString,
      resolve: ({ field }) => field,
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
  }),
});

export { FieldErrorType };
