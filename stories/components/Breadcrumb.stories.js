import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Breadcrumb } from "../../src/components";
import { Page, Title } from "../shared-styles";

const code1 = `
import { Breadcrumb } from 'sgds-govtech-react' 

<Breadcrumb items={[{text:'Home',link:'/'},{text:'Sub-link',link:'/'},{text:'Sub-Sub-link',link:'/'},]}></Breadcrumb>

`;
const code2 = `
<Breadcrumb className="padding--bottom content" items={[{text:'HOME',link:'/'},{text:'SUB-LINK',link:'/'},{text:'CURRENT-PAGE',link:'/'},]} hasBackgroundDark hasTextWhite></Breadcrumb>
`;
const BreadcrumbStories = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Breadcrumb</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
        Breadcrumb is a navigation aid that display a user's location on a website as a row of links, usually around the top of the page
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Default Breadcrumb
        </h5>
        <div className="row is-multiline">
          <div className="col">
            <Breadcrumb items={[{text:'Home',link:'/'},{text:'Sub-link',link:'/'},{text:'Sub-Sub-link',link:'/'},]}></Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>
          </div>
        </div>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Breadcrumb with background color
        </h5>
        <div className="row is-multiline">
          <div className="col">
            <Breadcrumb className="padding--bottom content" items={[{text:'HOME',link:'/'},{text:'SUB-LINK',link:'/'},{text:'CURRENT-PAGE',link:'/'},]} hasBackgroundDark hasTextWhite></Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default BreadcrumbStories;
