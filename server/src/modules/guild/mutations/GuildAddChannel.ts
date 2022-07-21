import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import * as GuildLoader from '../GuildLoader';
import { ChannelModel } from '../../channel/ChannelModel';
import { GraphQLContext } from '../../../graphql/context';
import * as ChannelLoader from '../../channel/ChannelLoader';
import { ChannelConnection } from '../../channel/ChannelType';
import { FieldErrorField } from '../../field-error/FieldErrorField';

interface GuildAddChannelMutationArgs {
  name: string;
  description: string;
  guildId: string;
}

const GuildAddChannelMutation = mutationWithClientMutationId({
  name: 'GuildAddChannel',
  inputFields: {
    guildId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, description, guildId }: GuildAddChannelMutationArgs, context: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!context.user) {
      throw new Error('Unauthorized');
    }

    const parse = fromGlobalId(guildId);

    const guild = await GuildLoader.load(context, parse.id);

    if (!guild) {
      throw new Error('Guild not found');
    }

    const newChannel = await new ChannelModel({
      channelType: 1,
      name,
      description,
      guild: guild._id,
    }).save();

    if (!newChannel) {
      throw new Error('Something went wrong...');
    }

    return {
      error: null,
      id: newChannel._id,
      success: `New channel with name ${name} created!`,
    };
  },
  outputFields: {
    newChannelEdge: {
      type: ChannelConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const channel = await ChannelLoader.load(context, id);

        if (!channel) {
          return null;
        }

        return {
          cursor: toGlobalId('Channel', channel._id),
          node: channel,
        };
      },
    },
    ...successField,
    ...FieldErrorField,
  },
});

export { GuildAddChannelMutation };
