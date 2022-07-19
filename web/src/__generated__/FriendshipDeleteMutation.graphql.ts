/**
 * @generated SignedSource<<6da32144e65a47c214973b4fcbc82787>>
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
  connections: ReadonlyArray<string>;
  input: FriendshipDeleteInput;
};
export type FriendshipDeleteMutation$data = {
  readonly FriendshipDeleteMutation: {
    readonly deletedNode: {
      readonly id: string;
    } | null;
  } | null;
};
export type FriendshipDeleteMutation = {
  response: FriendshipDeleteMutation$data;
  variables: FriendshipDeleteMutation$variables;
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
    "name": "FriendshipDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipDeletePayload",
        "kind": "LinkedField",
        "name": "FriendshipDeleteMutation",
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
    "name": "FriendshipDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipDeletePayload",
        "kind": "LinkedField",
        "name": "FriendshipDeleteMutation",
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
    "cacheID": "16617fb7925cab252390c7731b3301cd",
    "id": null,
    "metadata": {},
    "name": "FriendshipDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipDeleteMutation(\n  $input: FriendshipDeleteInput!\n) {\n  FriendshipDeleteMutation(input: $input) {\n    deletedNode {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd1b4f3b745f6314335211e4ddcb6025";

export default node;
