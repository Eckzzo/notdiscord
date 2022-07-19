/**
 * @generated SignedSource<<369ff3785af1b146692821a1493d234a>>
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
export type FriendshipsPending$variables = {
  after?: string | null;
  first?: number | null;
  status: FriendshipStatus;
  target: FriendshipTarget;
};
export type FriendshipsPending$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FriendshipPendingListFragment">;
};
export type FriendshipsPending = {
  response: FriendshipsPending$data;
  variables: FriendshipsPending$variables;
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
    "name": "FriendshipsPending",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FriendshipPendingListFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendshipsPending",
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
                    "name": "sender",
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
        "key": "FriendshipsPending_friendships",
        "kind": "LinkedHandle",
        "name": "friendships"
      }
    ]
  },
  "params": {
    "cacheID": "44d99e96573396f0af9345a1ad5765ce",
    "id": null,
    "metadata": {},
    "name": "FriendshipsPending",
    "operationKind": "query",
    "text": "query FriendshipsPending(\n  $after: String\n  $first: Int\n  $status: FriendshipStatus!\n  $target: FriendshipTarget!\n) {\n  ...FriendshipPendingListFragment\n}\n\nfragment FriendshipCardFragment on User {\n  username\n  denominator\n}\n\nfragment FriendshipPendingListFragment on Query {\n  friendships(status: $status, target: $target, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        sender {\n          ...FriendshipCardFragment\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bdd47db98b9dafb5c751841c69e2803b";

export default node;
