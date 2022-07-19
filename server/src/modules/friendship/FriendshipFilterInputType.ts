import { GraphQLEnumType, GraphQLInputObjectType } from 'graphql';
import {
	FILTER_CONDITION_TYPE,
	getObjectId,
} from '@entria/graphql-mongo-helpers';

const FriendshipFilterMapping = {
	status: {
		type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
		format: (val: number) => val && val,
	},
	sender: {
		type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
		format: (val: string) => val && getObjectId(val),
	},
	recipient: {
		type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
		format: (val: string) => val && getObjectId(val),
	},
};

const FriendshipTargetEnum = new GraphQLEnumType({
	name: 'FriendshipTarget',
	description: 'The target of friendship',
	values: {
		SENDER: { value: 'sender' },
		RECIPIENT: { value: 'recipient' },
	},
});

const FriendshipStatusEnum = new GraphQLEnumType({
	name: 'FriendshipStatus',
	description: 'Status of the friendship',
	values: {
		PENDING: { value: 0 },
		ACCEPTED: { value: 1 },
	},
});

const FriendshipFilterInputType = new GraphQLInputObjectType({
	name: 'FriendshipFilter',
	description: 'Filter for friendships',
	fields: () => ({
		target: {
			type: FriendshipTargetEnum,
		},
		status: {
			type: FriendshipStatusEnum,
		},
	}),
});

export {
	FriendshipFilterMapping,
	FriendshipFilterInputType,
	FriendshipStatusEnum,
	FriendshipTargetEnum,
};
