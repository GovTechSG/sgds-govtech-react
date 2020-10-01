import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Masthead as ComposableMasthead } from "../../src/components/standard";
import { Page, Title, Divider } from "../shared-styles";

const composableMHCode = `import { Masthead } from "sgds-govtech-react/dist/standard"

<Masthead />
`;

const fluidMHCode = `<Masthead isFluid />`;

const childrenMHCode = `<Masthead>A Singapore Government Website</Masthead>`;

const MastheadStories = () => {
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
          It is a DSS component that has to be present in all pages of '.gov.sg'
          websites.
        </p>

        <Divider />

        <h4>Default Masthead</h4>
        <ComposableMasthead />
        <SyntaxHighlighter>{formatCode(composableMHCode)}</SyntaxHighlighter>

        <Divider />

        <p>
          Use <code>isFluid</code> to remove max-width restrictions on masthead
          contents
        </p>
        <ComposableMasthead isFluid></ComposableMasthead>
        <SyntaxHighlighter>{formatCode(fluidMHCode)}</SyntaxHighlighter>

        <Divider />

        <p>Add children to the component to use different text.</p>
        <ComposableMasthead>A Singapore Government Website</ComposableMasthead>
        <SyntaxHighlighter>{formatCode(childrenMHCode)}</SyntaxHighlighter>

        <Divider />

        <p>Use <code>noLink</code> to remove the default masthead link.</p>
        <ComposableMasthead noLink />
        <SyntaxHighlighter>{formatCode(`<Masthead noLink />`)}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default MastheadStories;
