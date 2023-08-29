import React from "react";
import {
  IconSettings,
  GlobalNavigationBar,
  GlobalNavigationBarRegion,
} from "@salesforce/design-system-react";
import standardSprite from "../../../public/asset/standard-sprite.svg";
import utilitySprite from "../../../public/asset/utility-sprite.svg";
import { NavLink } from "react-router-dom";
export default function AppHeader() {
  return (
    <IconSettings standardSprite={standardSprite} utilitySprite={utilitySprite}>
      <GlobalNavigationBar>
        <GlobalNavigationBarRegion region="primary">
          <span className="slds-context-bar__label-action slds-context-bar__app-name">
            <span className="slds-truncate" title="App Name">
              CLM-POC
            </span>
          </span>
        </GlobalNavigationBarRegion>
        <GlobalNavigationBarRegion region="secondary" navigation>
          <NavLink className={state => (state.isActive ? "slds-context-bar__item slds-is-active" : "slds-context-bar__item")}
            to=""
            title="Home"
          >
            <span
              className="slds-context-bar__label-action"
            >
              <span className="slds-assistive-text">Current Page:</span>
              <span className="slds-truncate" title="Home">
                Home
              </span>
            </span>
          </NavLink>
          <NavLink className={state => (state.isActive ? "slds-context-bar__item slds-is-active" : "slds-context-bar__item")}
            to="create-contract"
            title="Contracts"
          >
            <span
              className="slds-context-bar__label-action"
            >
              <span className="slds-truncate" title="Contracts">
                Contracts
              </span>
            </span>
          </NavLink>
          <NavLink className={state => (state.isActive ? "slds-context-bar__item slds-is-active" : "slds-context-bar__item")}
            to="document-diff-checker"
            title="Document Diffchecker"
          >
            <span
              className="slds-context-bar__label-action"
            >
              <span className="slds-truncate" title="Document Diffchecker - Free">
                Document Diffchecker - Free
              </span>
            </span>
          </NavLink>
          <NavLink className={state => (state.isActive ? "slds-context-bar__item slds-is-active" : "slds-context-bar__item")}
            to="document-diff-checker-paid"
            title="Document Diffchecker - Paid"
          >
            <span
              className="slds-context-bar__label-action"
            >
              <span className="slds-truncate" title="Document Diffchecker - Paid">
                Document Diffchecker - Paid
              </span>
            </span>
          </NavLink>
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
    </IconSettings>
  );
}
