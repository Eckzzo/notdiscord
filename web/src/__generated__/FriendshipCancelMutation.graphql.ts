/**
 * @generated SignedSource<<127c90dce2cf1b46065ba1636a8ffb1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FriendshipCancelInput = {
  clientMutationId?: string | null;
  friendship: string;
};
export type FriendshipCancelMutation$variables = {
  connections: ReadonlyArray<string>;
  input: FriendshipCancelInput;
};
export type FriendshipCancelMutation$data = {
  readonly FriendshipCancelMutation: {
    readonly deletedNode: {
      readonly id: string;
    } | null;
  } | null;
};
export type FriendshipCancelMutation = {
  response: FriendshipCancelMutation$data;
  variables: FriendshipCancelMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendshipCancelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipCancelPayload",
        "kind": "LinkedField",
        "name": "FriendshipCancelMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Friendship",
            "kind": "LinkedField",
            "name": "deletedNode",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FriendshipCancelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipCancelPayload",
        "kind": "LinkedField",
        "name": "FriendshipCancelMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Friendship",
            "kind": "LinkedField",
            "name": "deletedNode",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af6db6061292d80224ed656c443e006b",
    "id": null,
    "metadata": {},
    "name": "FriendshipCancelMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipCancelMutation(\n  $input: FriendshipCancelInput!\n) {\n  FriendshipCancelMutation(input: $input) {\n    deletedNode {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae2e4a1c1e34d4eb2f6c5e8df06c0c7d";

export default node;
