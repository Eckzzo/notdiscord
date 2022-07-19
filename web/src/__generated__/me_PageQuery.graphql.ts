/**
 * @generated SignedSource<<92266be243f338add4b1053453830ff8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendshipStatus = "ACCEPTED" | "PENDING" | "%future added value";
export type FriendshipTarget = "RECIPIENT" | "SENDER" | "%future added value";
export type me_PageQuery$variables = {
  after?: string | null;
  first: number;
  status: FriendshipStatus;
  target: FriendshipTarget;
};
export type me_PageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FriendListFragment">;
};
export type me_PageQuery = {
  response: me_PageQuery$data;
  variables: me_PageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "target"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
  },
  {
    "kind": "Variable",
    "name": "target",
    "variableName": "target"
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
    "name": "me_PageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FriendListFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "me_PageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipConnection",
        "kind": "LinkedField",
        "name": "friendships",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FriendshipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Friendship",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [],
        "handle": "connection",
        "key": "FriendList_friendships",
        "kind": "LinkedHandle",
        "name": "friendships"
      }
    ]
  },
  "params": {
    "cacheID": "d2ade3c3b52d9889c8cd51df22169602",
    "id": null,
    "metadata": {},
    "name": "me_PageQuery",
    "operationKind": "query",
    "text": "query me_PageQuery(\n  $after: String\n  $first: Int!\n  $status: FriendshipStatus!\n  $target: FriendshipTarget!\n) {\n  ...FriendListFragment\n}\n\nfragment FriendListFragment on Query {\n  friendships(status: $status, target: $target, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        recipient {\n          ...FriendshipCardFragment\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment FriendshipCardFragment on User {\n  username\n  denominator\n}\n"
  }
};
})();

(node as any).hash = "a593ae49ca3a8fc85011db667764eaa3";

export default node;
