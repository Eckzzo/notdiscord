/**
 * @generated SignedSource<<6bd0fa1dbcc44543a628dc74e635b226>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type pagesHomeQuery$variables = {};
export type pagesHomeQuery$data = {
  readonly me: {
    readonly username: string;
  } | null;
};
export type pagesHomeQuery = {
  response: pagesHomeQuery$data;
  variables: pagesHomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8aec7cfab1ddfea87b625e1bc2ae9524",
    "id": null,
    "metadata": {},
    "name": "pagesHomeQuery",
    "operationKind": "query",
    "text": "query pagesHomeQuery {\n  me {\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "638bd573879b571348c1770556b74ad3";

export default node;
