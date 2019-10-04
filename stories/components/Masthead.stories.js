import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Masthead } from "../../src/components";
import {
  Page,
  Title,
  ParagraphHeader,
  ParagraphSubHeader
} from "../shared-styles";

const code1 = `
import { Masthead } from 'sgds-govtech-react';

function App() {
  return (
    <div className="app">
      <Masthead />
    </div>
  )
}
`;
const code2 = `<Masthead hasMaxWidth={false}`;
const MastheadStories = () => {
  return (
    <Page>
      <Title>
        <h3 className="has-text-white has-text-weight-semibold">Masthead</h3>
      </Title>
      <section className="sgds-section">
        <ParagraphHeader>
          The Masthead is an official Government Banner, containing the
          Singapore Government Online Logo
        </ParagraphHeader>
        <ParagraphSubHeader>
          Every page of a .gov.sg digital service should contain the masthead.
        </ParagraphSubHeader>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <ParagraphHeader>Masthead example</ParagraphHeader>
        <Masthead />
        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <ParagraphHeader>Masthead without maximum width</ParagraphHeader>
        <p>
          By default the masthead's contents have their maximum width at
          different screen sizes governed by the{" "}
          <a href="https://www.designsystem.gov.sg/docs/container">container</a>{" "}
          component.
        </p>
        <p>
          You can remove maximum width limitations but keep a 32px margin on
          both sides by passing <code>{`hasMaxWidth={false}`}</code>
        </p>
        <Masthead hasMaxWidth={false} />
        <SyntaxHighlighter>{code2}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default MastheadStories;
