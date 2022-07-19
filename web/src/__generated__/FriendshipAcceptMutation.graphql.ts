/**
 * @generated SignedSource<<9d13cbcfb62009317dd5719849aeacbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendshipAcceptInput = {
  clientMutationId?: string | null;
  friendship: string;
};
export type FriendshipAcceptMutation$variables = {
  connections: ReadonlyArray<string>;
  input: FriendshipAcceptInput;
};
export type FriendshipAcceptMutation$data = {
  readonly FriendshipAcceptMutation: {
    readonly error: string | null;
    readonly friendshipEdge: {
      readonly node: {
        readonly id: string;
        readonly recipient: {
          readonly " $fragmentSpreads": FragmentRefs<"FriendshipCardFragment">;
        };
        readonly status: number;
      } | null;
    } | null;
    readonly id: string | null;
    readonly success: string | null;
  } | null;
};
export type FriendshipAcceptMutation = {
  response: FriendshipAcceptMutation$data;
  variables: FriendshipAcceptMutation$variables;
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
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
    "name": "FriendshipAcceptMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipAcceptPayload",
        "kind": "LinkedField",
        "name": "FriendshipAcceptMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FriendshipEdge",
            "kind": "LinkedField",
            "name": "friendshipEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Friendship",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "recipient",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "FriendshipCardFragment"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/)
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
    "name": "FriendshipAcceptMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FriendshipAcceptPayload",
        "kind": "LinkedField",
        "name": "FriendshipAcceptMutation",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FriendshipEdge",
            "kind": "LinkedField",
            "name": "friendshipEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Friendship",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "recipient",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "denominator",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "friendshipEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "caa5ed64c1cc23b3c2a26690f2d7429d",
    "id": null,
    "metadata": {},
    "name": "FriendshipAcceptMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipAcceptMutation(\n  $input: FriendshipAcceptInput!\n) {\n  FriendshipAcceptMutation(input: $input) {\n    id\n    friendshipEdge {\n      node {\n        id\n        status\n        recipient {\n          ...FriendshipCardFragment\n          id\n        }\n      }\n    }\n    success\n    error\n  }\n}\n\nfragment FriendshipCardFragment on User {\n  username\n  denominator\n}\n"
  }
};
})();

(node as any).hash = "cad78029820d2c4cd3ec417239d31f9d";

export default node;
