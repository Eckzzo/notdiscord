import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GuildModel } from '../GuildModel';
import * as GuildLoader from '../GuildLoader';
import { GuildConnection } from '../GuildType';
import { GraphQLContext } from '../../../graphql/context';

interface GuildLeaveMutationArgs {
  id: string;
}

const GuildLeaveMutation = mutationWithClientMutationId({
  name: 'GuildLeave',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id }: GuildLeaveMutationArgs, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new Error('Unauthorized');
    }

    const guild = await GuildModel.findOne({ _id: id });

    if (!guild) {
      throw new Error('Guild not found');
    }

    const isOwner = guild.owner.equals(ctx.user._id);

    if (isOwner) {
      throw new Error(`You can't leave guilds that you own`);
    }

    await guild.updateOne({ $pull: { members: ctx.user._id } });

    return {
      id: guild._id,
      error: null,
      success: `You successfully left the guild ${guild.name}`,
    };
  },
  outputFields: {
    exitedGuildEdge: {
      type: GuildConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const node = await GuildLoader.load(ctx, id);
        if (!node) {
          return null;
        }

        return {
          cursor: toGlobalId('Guild', node._id),
          node,
        };
      },
    },
  },
  ...successField,
});

export { GuildLeaveMutation };
