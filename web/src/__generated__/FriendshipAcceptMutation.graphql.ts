/**
 * @generated SignedSource<<78ab02ca48ccf62043d130232648b67f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type FriendshipAcceptInput = {
	clientMutationId?: string | null;
	friendship: string;
};
export type FriendshipAcceptMutation$variables = {
	input: FriendshipAcceptInput;
};
export type FriendshipAcceptMutation$data = {
	readonly FriendshipAcceptMutation: {
		readonly error: string | null;
		readonly friendshipEdge: {
			readonly node: {
				readonly id: string;
				readonly recipient: {
					readonly ' $fragmentSpreads': FragmentRefs<'FriendshipCardFragment'>;
				};
				readonly status: number;
			} | null;
		} | null;
		readonly success: string | null;
	} | null;
};
export type FriendshipAcceptMutation = {
	response: FriendshipAcceptMutation$data;
	variables: FriendshipAcceptMutation$variables;
};

const node: ConcreteRequest = (function () {
	var v0 = [
			{
				defaultValue: null,
				kind: 'LocalArgument',
				name: 'input',
			},
		],
		v1 = [
			{
				kind: 'Variable',
				name: 'input',
				variableName: 'input',
			},
		],
		v2 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'id',
			storageKey: null,
		},
		v3 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'status',
			storageKey: null,
		},
		v4 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'success',
			storageKey: null,
		},
		v5 = {
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'error',
			storageKey: null,
		};
	return {
		fragment: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Fragment',
			metadata: null,
			name: 'FriendshipAcceptMutation',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: 'FriendshipAcceptPayload',
					kind: 'LinkedField',
					name: 'FriendshipAcceptMutation',
					plural: false,
					selections: [
						{
							alias: null,
							args: null,
							concreteType: 'FriendshipEdge',
							kind: 'LinkedField',
							name: 'friendshipEdge',
							plural: false,
							selections: [
								{
									alias: null,
									args: null,
									concreteType: 'Friendship',
									kind: 'LinkedField',
									name: 'node',
									plural: false,
									selections: [
										v2 /*: any*/,
										v3 /*: any*/,
										{
											alias: null,
											args: null,
											concreteType: 'User',
											kind: 'LinkedField',
											name: 'recipient',
											plural: false,
											selections: [
												{
													args: null,
													kind: 'FragmentSpread',
													name: 'FriendshipCardFragment',
												},
											],
											storageKey: null,
										},
									],
									storageKey: null,
								},
							],
							storageKey: null,
						},
						v4 /*: any*/,
						v5 /*: any*/,
					],
					storageKey: null,
				},
			],
			type: 'Mutation',
			abstractKey: null,
		},
		kind: 'Request',
		operation: {
			argumentDefinitions: v0 /*: any*/,
			kind: 'Operation',
			name: 'FriendshipAcceptMutation',
			selections: [
				{
					alias: null,
					args: v1 /*: any*/,
					concreteType: 'FriendshipAcceptPayload',
					kind: 'LinkedField',
					name: 'FriendshipAcceptMutation',
					plural: false,
					selections: [
						{
							alias: null,
							args: null,
							concreteType: 'FriendshipEdge',
							kind: 'LinkedField',
							name: 'friendshipEdge',
							plural: false,
							selections: [
								{
									alias: null,
									args: null,
									concreteType: 'Friendship',
									kind: 'LinkedField',
									name: 'node',
									plural: false,
									selections: [
										v2 /*: any*/,
										v3 /*: any*/,
										{
											alias: null,
											args: null,
											concreteType: 'User',
											kind: 'LinkedField',
											name: 'recipient',
											plural: false,
											selections: [
												{
													alias: null,
													args: null,
													kind: 'ScalarField',
													name: 'username',
													storageKey: null,
												},
												{
													alias: null,
													args: null,
													kind: 'ScalarField',
													name: 'denominator',
													storageKey: null,
												},
												v2 /*: any*/,
											],
											storageKey: null,
										},
									],
									storageKey: null,
								},
							],
							storageKey: null,
						},
						v4 /*: any*/,
						v5 /*: any*/,
					],
					storageKey: null,
				},
			],
		},
		params: {
			cacheID: 'aa4c854fe54ecc827a571f4349f53355',
			id: null,
			metadata: {},
			name: 'FriendshipAcceptMutation',
			operationKind: 'mutation',
			text: 'mutation FriendshipAcceptMutation(\n  $input: FriendshipAcceptInput!\n) {\n  FriendshipAcceptMutation(input: $input) {\n    friendshipEdge {\n      node {\n        id\n        status\n        recipient {\n          ...FriendshipCardFragment\n          id\n        }\n      }\n    }\n    success\n    error\n  }\n}\n\nfragment FriendshipCardFragment on User {\n  username\n  denominator\n}\n',
		},
	};
})();

(node as any).hash = '7368d9c52adcc5b43cf8679daba941e0';

export default node;
