/**
 * @generated SignedSource<<fcdccd974eac46fea7d111aa8a6210b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendshipCardFragment$data = {
  readonly denominator: string;
  readonly username: string;
  readonly " $fragmentType": "FriendshipCardFragment";
};
export type FriendshipCardFragment$key = {
  readonly " $data"?: FriendshipCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FriendshipCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendshipCardFragment",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "603b0341893b0012823c460a787f0068";

export default node;
