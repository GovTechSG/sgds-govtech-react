import React, { useState } from "react";
import SyntaxHighlighter from "../../lib/SyntaxHighlighter";
import { StandaloneMasthead } from "../../../src/components";
import { Page, Title, Divider } from "../../shared-styles";

const code1 = `
import { Masthead } from 'sgds-govtech-react' 

<Masthead />

`;
const code2 = `// Using react hooks as the handler. You can use other functions to handle the state change
<Masthead hasLanguageSelector languageSelectHandler={setLanguage}/>
`;
const MastheadStories = props => {
  const [language, setLanguage] = useState("");
  return (
    <Page>
      <Title>
        <h2>Masthead</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          The Masthead informs users that the website they are visiting
          represents the Singapore Government.
        </h3>
        <p>
          It is a DSS component that has to be present in all pages of
          '.gov.sg' websites.
        </p>

        <Divider />

        <h4>Default Masthead</h4>
        <StandaloneMasthead />

        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        {/* <h4>Masthead with Language Selector</h4>

        <div>
          <Masthead hasLanguageSelector languageSelectHandler={setLanguage} />
          <p className="padding--top">
            Selected Language:
            {language}
          </p>
        </div>
        <SyntaxHighlighter>{code2}</SyntaxHighlighter> */}
      </section>
    </Page>
  );
};

export default MastheadStories;
