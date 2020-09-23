import React from "react";
import { Page, Title } from "../shared-styles";
import ReactMarkdown from "react-markdown";
import readme from "../../README.md";

const Welcome = () => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">
          Welcome to the Singapore Design System React Docs
        </h3>
      </Title>
      <section className="sgds-section">
        <ReactMarkdown source={readme} />
      </section>
    </Page>
  );
};

export default Welcome;
