import React from "react";

import {
  Button,
  ButtonGroup,
  ButtonStateful,
  Dropdown,
  Icon,
  IconSettings,
  PageHeader,
  PageHeaderControl,
} from "@salesforce/design-system-react";
import standardSprite from "../../../public/asset/standard-sprite.svg";
export default function ContractHeader({ createClick }) {
  const actions = () => (
    <React.Fragment>
      <PageHeaderControl>
        <Button
          variant="brand"
          key="PageHeaderFollowButton"
          // iconSize="medium"
          label="Create New Contract"
          onClick={createClick}
        />
      </PageHeaderControl>
      <PageHeaderControl>
      </PageHeaderControl>
    </React.Fragment>
  );

  const details = [
    // {
    //     label: 'Field 1',
    //     content:
    //         'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
    //     truncate: true,
    // },
    // { label: 'Field 2', content: 'Multiple Values' },
    // {
    //     label: 'Field 3',
    //     content: <a href="#link">Hyperlink</a>,
    // },
    // {
    //     label: 'Field 4',
    //     content: 'Description (2-line truncation)',
    //     truncate: true,
    // },
  ];

  return (
    <IconSettings standardSprite={standardSprite}>
      <PageHeader
        details={details}
        icon={
          <Icon
            assistiveText={{ label: "User" }}
            category="standard"
            name="drafts"
          />
        }
        label="Contract"
        onRenderActions={actions}
        title="Contracts"
        variant="record-home"
      />
    </IconSettings>
  );
}
