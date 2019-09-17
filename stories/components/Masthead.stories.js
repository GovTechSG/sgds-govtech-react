import React,{ useState } from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Masthead } from "../../src/components";
import { Page, Title } from "../shared-styles";

const code1 = `
import { Masthead } from 'sgds-govtech-react' 

<Masthead />

`;
const code2 = `// Using react hooks as the handler. You can use other functions to handle the state change
<Masthead hasLanguageSelector languageSelectHandler={setLanguage}/>
`;
const MastheadStories = props => {
  const [language, setLanguage] = useState('')
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Masthead</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
        The Masthead is a standard component that has to be present in all pages of '.gov.sg' websites.
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Default Masthead
        </h5>
        <div className="row is-multiline">
          <div className="col">
            <Masthead />
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{code1}</SyntaxHighlighter>
          </div>
        </div>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Masthead with Language Selector 
        </h5>
        <div className="row is-multiline">
          <div className="col">
            <Masthead hasLanguageSelector languageSelectHandler={setLanguage}/>
            <p className="padding--top">Selected Language: 
            {language}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{code2}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default MastheadStories;
