/**
 * @generated SignedSource<<56fe2575de4922f59f3550bbeced7702>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FriendshipDeleteInput = {
  clientMutationId?: string | null;
  friendship: string;
};
export type FriendshipDeleteMutation$variables = {
  input: FriendshipDeleteInput;
};
export type FriendshipDeleteMutation$data = {
  readonly FriendshipDeleteMutation: {
    readonly id: string | null;
  } | null;
};
export type FriendshipDeleteMutation = {
  response: FriendshipDeleteMutation$data;
  variables: FriendshipDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendshipDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipDeletePayload",
        "kind": "LinkedField",
        "name": "FriendshipDeleteMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendshipDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipDeletePayload",
        "kind": "LinkedField",
        "name": "FriendshipDeleteMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4c1ec7758e3e600d9eb8a8342e06dca3",
    "id": null,
    "metadata": {},
    "name": "FriendshipDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipDeleteMutation(\n  $input: FriendshipDeleteInput!\n) {\n  FriendshipDeleteMutation(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a643a98e9a8ee0ba691b1af44966864";

export default node;
