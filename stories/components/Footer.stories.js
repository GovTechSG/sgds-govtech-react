import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Footer } from "../../src/components";
import { Page, Title } from "../shared-styles";
const links = {
  privacy: " ",
  termsOfUse: " ",
  contact: " ",
  feedback: " "
};
const code1 = `
import { Footer } from 'sgds-govtech-react' 

<Footer title="Singapore Design Systems" date="15 Aug 2019" />

`;
const code2 = `
<Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}/>
`;
const code3 = `
<Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}>
<div className="col is-3">
    <p className="has-text-white"><b>Category 1</b></p>
    <p><a href="">Link</a></p>
    <p><a href="">Link</a></p>
</div>
<div className="col is-3">
    <p className="has-text-white"><b>Category 2</b></p>
    <p><a href="">Link</a></p>
    <p><a href="">Link</a></p>
</div>
</Footer>
`
const FooterStories = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Footer</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
        The footer is a component that all '.gov.sg' websites must adopt. Footers provide a secondary navigation scheme to essential information (eg legal)
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Default Footer
        </h5>
        <div className="row is-multiline">
          <div className="col">
          <Footer title="Singapore Design Systems" date="15 Aug 2019" ></Footer>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>
          </div>
        </div>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Footer with necessary links
        </h5>
        <div className="row is-multiline">
          <div className="col">
          <Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}></Footer>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>
          </div>
        </div>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Footer with navigational links and required links
        </h5>
        <div className="row is-multiline">
          <div className="col">
          <Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}>
            <div className="col is-3">
                <p className="has-text-white"><b>Category 1</b></p>
                <p><a href="">Link</a></p>
                <p><a href="">Link</a></p>
            </div>
            <div className="col is-3">
                <p className="has-text-white"><b>Category 2</b></p>
                <p><a href="">Link</a></p>
                <p><a href="">Link</a></p>
            </div>
          </Footer>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(code3)}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default FooterStories;
