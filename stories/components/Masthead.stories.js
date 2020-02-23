import React, { useState } from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Masthead } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

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
        <h3>Masthead</h3>
      </Title>
      <section className="sgds-section">
        <h4>
          The Masthead is a standard component that has to be present in all
          pages of '.gov.sg' websites.
        </h4>

        <Divider />

        <h5>Default Masthead</h5>
        <Masthead />

        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        {/* <h5>Masthead with Language Selector</h5>

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
