import React,{ useState } from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { SideNav } from "../../src/components";
import { Page, Title } from "../shared-styles";

const code1 = `
import { SideNav } from 'sgds-govtech-react' 

<SideNav menuItems={MenuItems}></SideNav>

`;
const code2 = `// Using react hooks as the handler. You can use other functions to handle the state change
<Masthead hasLanguageSelector languageSelectHandler={setLanguage}/>
`;
const MenuItems=[
  {title:'Item1',link:'#'},
  {title:'Item2',subMenuItems:[{title:'SubItem1',link:'#'},{title:'SubItem2',link:'#'}]},
  {title:'Item3',link:'#'},
]
const SideNavStories = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Side Navigation</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
        Side nav is a standard component that all '.gov.sg' websites must adopt for every inner page that has second or more levels of navigation items
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Standard SideNav
        </h5>
        <div className="row is-multiline">
          <div className="col is-3">
            <SideNav menuItems={MenuItems}></SideNav>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{code1}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default SideNavStories;
