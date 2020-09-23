import React from "react";
import { Col, Row } from "../../src/components";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Divider, Page, Title } from "../shared-styles";

const basicRowCode = `
import { Row } from "sgds-govtech-react";
<Row><Col>Some Content Here</Col>
<Col>Some Content Here</Col>
</Row>`;
const multilineRowCode = `
import { Row } from "sgds-govtech-react";
<Row isMultiline><Col>Some Content Here</Col>
<Col>Some Content Here</Col>
</Row>`;
const mobileRowCode = `
import { Row } from "sgds-govtech-react";
<Row isMobile><Col>Some Content Here</Col>
<Col>Some Content Here</Col>
</Row>`;
const desktopRowCode = `
import { Row } from "sgds-govtech-react";
<Row isDesktop><Col>Some Content Here</Col>
<Col>Some Content Here</Col>
</Row>`;
const RowStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Row</h2>
      </Title>
      <section className="sgds-section">
        <h3>Rows to hold your Col components</h3>
        <p>
          Rows to structure your content with a twelve-column system, powered by
          CSS flexbox. For more information check out the <a href="https://www.designsystem.tech.gov.sg/docs/grid/">
            SGDS Grid Docs
          </a>
          .
        </p>
        <h4>Default Row</h4>
        <Row style={{ background: "aliceblue" }}>
          <Col>Some Content Here</Col>
          <Col>Some Content Here</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(basicRowCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Multiline Row</h4>
        <Row isMultiline style={{ background: "aliceblue" }}>
          {" "}
          <Col>Some Content Here</Col>
          <Col>Some Content Here</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(multilineRowCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Mobile Row</h4>
        <Row isMobile style={{ background: "aliceblue" }}>
          {" "}
          <Col>Some Content Here</Col>
          <Col>Some Content Here</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(mobileRowCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Desktop Row</h4>
        <Row isDesktop style={{ background: "aliceblue" }}>
          <Col>Some Content Here</Col>
          <Col>Some Content Here</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(desktopRowCode)}</SyntaxHighlighter>
        <Divider />
      </section>
    </Page>
  );
};

export default RowStories;
