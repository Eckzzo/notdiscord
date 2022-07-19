/**
 * @generated SignedSource<<6e5f3671f05428c136e5b2ea05dc7092>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FriendshipRejectInput = {
  clientMutationId?: string | null;
  friendship: string;
};
export type FriendshipRejectMutation$variables = {
  input: FriendshipRejectInput;
};
export type FriendshipRejectMutation$data = {
  readonly FriendshipRejectMutation: {
    readonly id: string | null;
  } | null;
};
export type FriendshipRejectMutation = {
  response: FriendshipRejectMutation$data;
  variables: FriendshipRejectMutation$variables;
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
    "name": "FriendshipRejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipRejectPayload",
        "kind": "LinkedField",
        "name": "FriendshipRejectMutation",
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
    "name": "FriendshipRejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FriendshipRejectPayload",
        "kind": "LinkedField",
        "name": "FriendshipRejectMutation",
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
    "cacheID": "7ccf5d3700bd042f80482eab9b54367f",
    "id": null,
    "metadata": {},
    "name": "FriendshipRejectMutation",
    "operationKind": "mutation",
    "text": "mutation FriendshipRejectMutation(\n  $input: FriendshipRejectInput!\n) {\n  FriendshipRejectMutation(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2e60e8310f56cd0bb49bb902038b084";

export default node;
