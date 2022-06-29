import React from "react";
import Accordion from "../../src/components/Accordion";
import AccordionSet from "../../src/components/AccordionSet";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Page, Title, Divider } from "../shared-styles";

const accordionBasicCode = `
import { Accordion } from "sgds-govtech-react";
<>

<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>

<Accordion header="Click me to reveal/hide my content" initiallyOpen>
  <p>Hello there!</p>
</Accordion>

<Accordion header="I am initially open" initiallyOpen >
  <p>Bye!</p>
</Accordion>

<Accordion header="Passing in isActive as a prop locks the accordion at an open or closed state" isActive >
  <p>I am always displayed</p>
</Accordion>

<Accordion header="Passing in isActive as a prop locks the accordion at an open or closed state" isActive={false} >
  <p>I am always hidden</p>
</Accordion>

</>
`;

const accordionSetCode = `
<AccordionSet>
<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>

<Accordion
  header="Click me to reveal/hide my content"
  initiallyOpen
>
  <p>
    Only 1 Accordion in an Accordion Set can be initially open.
  </p>
</Accordion>

<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>

</AccordionSet>`;

const AccordionStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Accordions</h2>
      </Title>
      <section className="sgds-section">
        <h4>
          Accordions can be used to reduce clutter on a web page. They also give
          the user the ability to choose what they wish to see.
        </h4>

        <Divider />

        <h5>Standard Usage</h5>
        <Accordion header="Click me to reveal/hide my content">
          <p>Hello there!</p>
        </Accordion>
        <Accordion header="I am initially open" initiallyOpen>
          <p>Bye!</p>
        </Accordion>
        <Accordion
          header="Passing in isActive as a prop locks the accordion at an open or closed state"
          isActive
        >
          <p>I am always displayed</p>
        </Accordion>
        <Accordion
          header="Passing in isActive as a prop locks the accordion at an open or closed state"
          isActive={false}
        >
          <p>I am always hidden</p>
        </Accordion>
        <SyntaxHighlighter>{formatCode(accordionBasicCode)}</SyntaxHighlighter>

        <Divider />

        <h5>Accordion Sets</h5>
        <p>
          Nest <code>{`<Accordion>`}</code> components inside
          <code>{`<AccordionSet>`}</code> if you want them open one at a time.
        </p>

        <AccordionSet>
          <Accordion header="Click me to reveal/hide my content">
            <p>Hello there!</p>
          </Accordion>
          <Accordion header="Click me to reveal/hide my content" initiallyOpen>
            <p>Only 1 Accordion in an Accordion Set can be initially open.</p>
          </Accordion>
          <Accordion header="Click me to reveal/hide my content">
            <p>Hello there!</p>
          </Accordion>
        </AccordionSet>
        <SyntaxHighlighter>{formatCode(accordionSetCode)}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default AccordionStories;
