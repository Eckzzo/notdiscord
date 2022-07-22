import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GuildModel } from '../GuildModel';
import * as GuildLoader from '../GuildLoader';
import { GuildConnection } from '../GuildType';
import { fieldError } from '../../../utils/fieldError';
import { GraphQLContext } from '../../../graphql/context';
import { FieldErrorField } from '../../field-error/FieldErrorField';

interface GuildJoinMutationArgs {
  passcode: string;
}

const GuildJoinMutation = mutationWithClientMutationId({
  name: 'GuildJoin',
  inputFields: {
    passcode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ passcode }: GuildJoinMutationArgs, ctx: GraphQLContext) => {
    if (!ctx.user) {
      return fieldError('passcode', 'Unauthorized');
    }

    // Find the guild with the provided passcode
    const guild = await GuildModel.findOne({ passcode });

    if (!guild) {
      return fieldError('passcode', 'Guild not found');
    }

    // Check if member is already in the guild
    const isMeMember = guild.members.includes(ctx.user._id);

    if (isMeMember) {
      return fieldError('passcode', `You're already a member of this guild`);
    }

    // Add user to guilds members
    await guild.updateOne({ $addToSet: { members: ctx.user._id } });

    return {
      error: null,
      id: guild._id,
      success: `You successfully joined guild ${guild.name}`,
    };
  },
  outputFields: {
    joinedGuildEdge: {
      type: GuildConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const guild = await GuildLoader.load(context, id);
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

export { GuildJoinMutation };
