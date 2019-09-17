import React from "react";
import Accordion from "../../src/components/Accordion";
import AccordionSet from "../../src/components/AccordionSet";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Page, Title } from "../shared-styles";

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

const AccordionStories = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Accordions</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
          Accordions can be used to reduce clutter on a web page. They also give
          the user the ability to choose what they wish to see.
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Standard Usage
        </h5>
        <div className="row">
          <div className="col">
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
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>
              {formatCode(accordionBasicCode)}
            </SyntaxHighlighter>
          </div>
        </div>

        <hr />

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Accordion Sets
        </h5>
        <p>
          Nest <code>{`<Accordion>`}</code> components inside
          <code>{`<AccordionSet>`}</code> if you want them open one at a time.
        </p>

        <div className="row">
          <div className="col">
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
            </AccordionSet>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>
              {formatCode(accordionSetCode)}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default AccordionStories;
