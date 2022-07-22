import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GuildModel } from '../GuildModel';
import * as GuildLoader from '../GuildLoader';
import { GuildConnection } from '../GuildType';
import { fieldError } from '../../../utils/fieldError';
import { GraphQLContext } from '../../../graphql/context';
import { FieldErrorField } from '../../field-error/FieldErrorField';

interface GuildCreateMutationArgs {
  name: string;
  description: string;
}

const GuildCreateMutation = mutationWithClientMutationId({
  name: 'GuildCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, description }: GuildCreateMutationArgs, ctx: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!ctx.user) {
      return fieldError('name', 'Unauthorized');
    }

    const newGuild = await new GuildModel({
      owner: ctx.user,
      name,
      description,
      members: ctx.user,
    }).save();

    return {
      error: null,
      id: newGuild._id,
      success: `New guild with name ${name} created!`,
    };
  },
  outputFields: {
    newGuildEdge: {
      type: GuildConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const guild = await GuildLoader.load(ctx, id);

        if (!guild) {
          return null;
        }

        return {
          cursor: toGlobalId('Guild', guild._id),
          node: guild,
        };
      },
    },
    ...successField,
    ...FieldErrorField,
  },
});

export { GuildCreateMutation };
