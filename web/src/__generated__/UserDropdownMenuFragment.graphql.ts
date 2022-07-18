/**
 * @generated SignedSource<<d59b51c2b1913080ba4aa33d90b3e95d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserDropdownMenuFragment$data = {
  readonly denominator: string;
  readonly username: string;
  readonly " $fragmentType": "UserDropdownMenuFragment";
};
export type UserDropdownMenuFragment$key = {
  readonly " $data"?: UserDropdownMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserDropdownMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserDropdownMenuFragment",
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

(node as any).hash = "ae3982f0ec683542ca2898f608a2cbdf";

export default node;
