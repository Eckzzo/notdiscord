/**
 * @generated SignedSource<<7863f17f7661b3af34ad3c91f15a14a6>>
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
  input: FriendshipCancelInput;
};
export type FriendshipCancelMutation$data = {
  readonly FriendshipCancelMutation: {
    readonly id: string | null;
  } | null;
};
export type FriendshipCancelMutation = {
  response: FriendshipCancelMutation$data;
  variables: FriendshipCancelMutation$variables;
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
    "name": "FriendshipCancelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipCancelPayload",
        "kind": "LinkedField",
        "name": "FriendshipCancelMutation",
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
    "name": "FriendshipCancelMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipCancelPayload",
        "kind": "LinkedField",
        "name": "FriendshipCancelMutation",
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
    "cacheID": "8a16f03538dde4cf2cd8c73230f8db02",
    "id": null,
    "metadata": {},
    "name": "FriendshipCancelMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipCancelMutation(\n  $input: FriendshipCancelInput!\n) {\n  FriendshipCancelMutation(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "faccd18f02cd9d58974b6d4a32fde290";

export default node;
