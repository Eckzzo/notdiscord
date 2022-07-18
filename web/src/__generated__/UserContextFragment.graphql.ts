/**
 * @generated SignedSource<<8f16db7ad7d0a117402bab655cdacdba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserContextFragment$data = {
  readonly me: {
    readonly denominator: string;
    readonly id: string;
    readonly username: string;
  } | null;
  readonly " $fragmentType": "UserContextFragment";
};
export type UserContextFragment$key = {
  readonly " $data"?: UserContextFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserContextFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserContextFragment",
  "selections": [
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
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "01aeda4e5048d20eb851f9fa3da5da47";

export default node;
