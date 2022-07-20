import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
	connectionDefinitions,
	objectIdResolver,
} from '@entria/graphql-mongo-helpers';

import { load } from './ChannelLoader';
import { ChannelDocument } from './ChannelModel';
import { GraphQLContext } from '../../graphql/context';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

const ChannelType = new GraphQLObjectType<ChannelDocument, GraphQLContext>({
	name: 'Channel',
	description: 'A channel where messages are located',
	fields: () => ({
		id: globalIdField('Channel'),
		name: {
			type: GraphQLString,
			resolve: (channel) => channel.name,
		},
		description: {
			type: GraphQLString,
			resolve: (channel) => channel.description,
		},
		// TODO: Load messages from the channel
		...objectIdResolver,
	}),
	interfaces: () => [nodeInterface],
});

const ChannelConnection = connectionDefinitions({
	name: 'Channel',
	nodeType: ChannelType,
});

registerTypeLoader(ChannelType, load);

export { ChannelType, ChannelConnection };
