import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GuildModel } from '../GuildModel';
import { GuildConnection } from '../GuildType';
import { GraphQLContext } from '../../../graphql/context';

interface GuildDeleteMutationArgs {
  id: string;
}

const GuildDeleteMutation = mutationWithClientMutationId({
  name: 'GuilDelete',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id }: GuildDeleteMutationArgs, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new Error('Unauthorized');
    }

    const guild = await GuildModel.findOne({ _id: id });

    if (!guild) {
      throw new Error('Guild not found');
    }

    const isOwner = guild.owner.equals(ctx.user._id);

    if (!isOwner) {
      throw new Error(`You can only delete guilds you own`);
    }

    await guild.delete();

    return {
      deletedGuild: guild,
      success: `Guild ${guild.name} successfully deleted`,
    };
  },
  outputFields: {
    deletedEdge: {
      type: GuildConnection.edgeType,
      resolve: async ({ deletedGuild }) => {
        if (!deletedGuild) {
          return null;
        }

        return {
          cursor: toGlobalId('Guild', deletedGuild._id),
          edge: deletedGuild,
        };
      },
    },
  },
});

export { GuildDeleteMutation };
