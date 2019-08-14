import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { Accordion, AccordionSet } from "../components";
import { formatCode } from "./lib";

const accordionCodeString = formatCode(`<div>
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
</div>`);

const accordionSetCodeString = formatCode(`<AccordionSet>
<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>
<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>
<Accordion header="Click me to reveal/hide my content">
  <p>Hello there!</p>
</Accordion>
</AccordionSet>`);

class AccordionDocs extends Component {
  render() {
    return (
      <div className="sgds-container">
        <div className="row">
          <div className="col">
            <h2>Accordions</h2>
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
            <h3>Code</h3>
            <div className="row">
              <div className="col">
                <SyntaxHighlighter>{accordionCodeString}</SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Accordion Sets</h2>
            <div className="row">
              <div className="col">
                <p>
                  Nest <code>{`<Accordion>`}</code> components inside
                  <code>{`<AccordionSet>`}</code> if you want them open
                  one-at-a-time.
                </p>
                <AccordionSet>
                  <Accordion header="Click me to reveal/hide my content">
                    <p>Hello there!</p>
                  </Accordion>
                  <Accordion header="Click me to reveal/hide my content">
                    <p>Hello there!</p>
                  </Accordion>
                  <Accordion header="Click me to reveal/hide my content">
                    <p>Hello there!</p>
                  </Accordion>
                </AccordionSet>
              </div>
            </div>
            <h3>Code</h3>
            <div className="row">
              <div className="col">
                <SyntaxHighlighter>{accordionSetCodeString}</SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccordionDocs;
