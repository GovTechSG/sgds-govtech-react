import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Page, paragraphHeaderStyles, Title, Divider } from "../shared-styles";

let importSyntax = `
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/sgds-govtech@1.3.9/css/sgds.css"
/>`;

const Welcome = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">
          Welcome to the Singapore Design System React Docs
        </h3>
      </Title>
      <section className="sgds-section">
        <h4 className={paragraphHeaderStyles}>About</h4>
        <p>
          The Singapore Government Design System (SGDS) was developed to unite
          teams in creating fast, accessible and mobile friendly digital
          services with a common set of UI components that comply to the Digital
          Service Standards.
        </p>
        <Divider />

        <h4 className={paragraphHeaderStyles}>Get started</h4>

        <h5 className={paragraphHeaderStyles}>
          Importing SGDS CSS styles into your project
        </h5>

        <p>
          Import SGDS styles through a CDN into the <code>head</code> of your
          HTML:
        </p>

        <SyntaxHighlighter>{importSyntax}</SyntaxHighlighter>

        <h5 className={paragraphHeaderStyles}>
          Installing <code>sgds-govtech-react</code>
        </h5>

        <p>
          You can use NPM: <code>npm install sgds-govtech-react</code>
        </p>

        <Divider />

        <h4 className={paragraphHeaderStyles}>How to use this documentation</h4>
        <p>
          The documentation is broken down into two parts, the canvas (upper
          area) and the addons (lower area). The section you are currently
          reading from is the canvas area which will house live components which
          you can interact with.
        </p>
        <p>
          The lower area below houses additional tools to assist you in
          implementing the components in your project.
        </p>
      </section>
    </Page>
  );
};

export default Welcome;
