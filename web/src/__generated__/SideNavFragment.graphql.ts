/**
 * @generated SignedSource<<da12687ececa0980ea89e1f372844b74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SideNavFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserDropdownMenuFragment">;
  readonly " $fragmentType": "SideNavFragment";
};
export type SideNavFragment$key = {
  readonly " $data"?: SideNavFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SideNavFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SideNavFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserDropdownMenuFragment"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "f12de9f668e639f960a6b3aa037e4c64";

export default node;
