import React from "react";
import { Page, ParagraphHeader, Title } from "../shared-styles";

const Welcome = () => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">
          Welcome to the Singapore Government Design System - React Docs
        </h3>
      </Title>
      <section className="sgds-section">
        <ParagraphHeader>About</ParagraphHeader>
        <p>
          The Singapore Government Design System (SGDS) was developed to unite
          teams in creating fast, accessible and mobile friendly digital
          services with a common set of UI components that comply to the Digital
          Service Standards.
        </p>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <ParagraphHeader>How to use the documentation</ParagraphHeader>
        <p>
          The documentation is broken down into two parts, the canvas (upper
          area) and the addons (lower area). The section you are currently
          reading from is the canvas area which will house live components which
          you can interact with.
        </p>
        <p>
          The lower area below houses additional information to assist you in
          implementing SGDS-React components in your project.
        </p>
      </section>
    </Page>
  );
};

export default Welcome;
