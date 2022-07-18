/**
 * @generated SignedSource<<0a5d864b02a6200394f75c88b3df12f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserSignUpMutationInput = {
  clientMutationId?: string | null;
  email: string;
  password: string;
  username: string;
};
export type SignUpFormMutation$variables = {
  input: UserSignUpMutationInput;
};
export type SignUpFormMutation$data = {
  readonly UserSignUpMutation: {
    readonly error: {
      readonly field: string | null;
      readonly message: string | null;
    } | null;
    readonly me: {
      readonly denominator: string;
      readonly id: string;
      readonly username: string;
    } | null;
  } | null;
};
export type SignUpFormMutation = {
  response: SignUpFormMutation$data;
  variables: SignUpFormMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UserSignUpMutationPayload",
    "kind": "LinkedField",
    "name": "UserSignUpMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FieldError",
        "kind": "LinkedField",
        "name": "error",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "field",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b61b9d55a7bc64f167fbc70145ab214a",
    "id": null,
    "metadata": {},
    "name": "SignUpFormMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpFormMutation(\n  $input: UserSignUpMutationInput!\n) {\n  UserSignUpMutation(input: $input) {\n    error {\n      field\n      message\n    }\n    me {\n      id\n      username\n      denominator\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ade15a84cdc3fe26d7ab8e01c159e1b4";

export default node;
