import React from "react";
import { Col, Row } from "../../src/components";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Divider, Page, Title } from "../shared-styles";

const basicColCode = `
import { Row } from "sgds-govtech-react";
<Row>
<Col>col 1</Col>
<Col>col 2</Col>
<Col>col 3</Col>
</Row>`;
const tweleveColCode = `
import { Row } from "sgds-govtech-react";
<>
<Row style={{ background: "aliceblue" }}>
<Col is={2}>is-2</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
</Row>
<Row style={{ background: "aliceblue"}}>
<Col is={6}>is-6</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
<Col>1</Col>
</Row>
</>`;
const multiLineCode = `
import { Row } from "sgds-govtech-react";
<Row isMultiline>
<Col is={12}><h6>col 1</h6></Col>
<Col is={5}><h6>col 2</h6></Col>
<Col is={7}><h6>col 3</h6></Col>
<Col is={5}><h6>col 4</h6></Col>
<Col is={8}><h6>col 5</h6></Col>
</Row>`;
const horizontalCode = `
import { Row } from "sgds-govtech-react";
<>
<Row>
<Col is={6} isOffset={3}>
  <h6>col is-6 is-offset-3</h6>
</Col>
</Row>
<Row>
<Col is={3} isOffset={9}>
  <h6>col is-3 is-offset-9</h6>
</Col>
</Row></>`;
const nestedColumnsCode = `
import { Row } from "sgds-govtech-react";

<Row style={{ background: "aliceblue" }}>
          <Col isNested>
            <Row>
              <Col>
                <h6>row 1 col 1</h6>
              </Col>
              <Col>
                <h6>row 1 col 2</h6>
              </Col>
            </Row>
          </Col>
          <Col isNested>
            <Row>
              <Col>
                <h6>row 2 col 1</h6>
              </Col>
              <Col>
                <h6>row 2 col 2</h6>
              </Col>
              <Col>
                <h6>row 2 col 3</h6>
              </Col>
            </Row>
          </Col>
        </Row>
`;

const ColStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Columns</h2>
      </Title>
      <section className="sgds-section">
        <h3>Columns to structure your content</h3>
        <p>
          Columns to structure your content with a twelve-column system, powered
          by CSS flexbox. For more information check out the{" "}
          <a href="https://www.designsystem.tech.gov.sg/docs/grid/">
            SGDS Grid Docs
          </a>
          .
        </p>
        <h4>3 Columns</h4>
        <p>
          The example below shows the creation of 3 equal-width columns on the
          tablet, desktop, and widescreen devices. Columns must have arow as a
          parent.
        </p>
        <Row style={{ background: "aliceblue" }}>
          <Col style={{ border: "1px solid darkGrey" }}>col 1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>col 2</Col>
          <Col style={{ border: "1px solid darkGrey" }}>col 3</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(basicColCode)}</SyntaxHighlighter>
        <Divider />
        <h4>12 Columns</h4>
        <p>
          Grids can be divided into 12 columns with size classes ranging from
          is-2 to is-12. In the following example we see the difference between
          is-2 and is-6.
        </p>
        <Row style={{ background: "aliceblue" }}>
          <Col is={2} style={{ border: "1px solid darkGrey" }}>
            is-2
          </Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
        </Row>
        <br />
        <Row style={{ background: "aliceblue" }}>
          <Col is={6} style={{ border: "1px solid darkGrey" }}>
            is-6
          </Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
          <Col style={{ border: "1px solid darkGrey" }}>1</Col>
        </Row>
        <SyntaxHighlighter>{formatCode(tweleveColCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Columns wrap to a new line</h4>
        <p>
          Use isMultiline on row elements to have columns automatically wrap to
          a new line.
        </p>
        <Row isMultiline style={{ background: "aliceblue" }}>
          <Col is={12} style={{ border: "1px solid darkGrey" }}>
            <h6>col 1</h6>
          </Col>
          <Col is={5} style={{ border: "1px solid darkGrey" }}>
            <h6>col 2</h6>
          </Col>
          <Col is={7} style={{ border: "1px solid darkGrey" }}>
            <h6>col 3</h6>
          </Col>
          <Col is={5} style={{ border: "1px solid darkGrey" }}>
            <h6>col 4</h6>
          </Col>
          <Col is={8} style={{ border: "1px solid darkGrey" }}>
            <h6>col 5</h6>
          </Col>
        </Row>
        <SyntaxHighlighter>{formatCode(multiLineCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Horizontal Space (Offset)</h4>
        <p>Create empty horizontal space from the left using is-offset-X.</p>
        <Row style={{ background: "aliceblue" }}>
          <Col is={6} isOffset={3} style={{ border: "1px solid darkGrey" }}>
            <h6>col is-6 is-offset-3</h6>
          </Col>
        </Row>
        <Row style={{ background: "aliceblue" }}>
          <Col is={3} isOffset={9} style={{ border: "1px solid darkGrey" }}>
            <h6>col is-3 is-offset-9</h6>
          </Col>
        </Row>
        <SyntaxHighlighter>{formatCode(horizontalCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Nested Columns</h4>
        <p>Nested columns provide you with more flexibility in your design.</p>
        <Row style={{ background: "aliceblue" }}>
          <Col isNested style={{ border: "1px solid darkGrey" }}>
            <Row>
              <Col style={{ border: "1px solid yellow" }}>
                <h6>row 1 col 1</h6>
              </Col>
              <Col style={{ border: "1px solid yellow" }}>
                <h6>row 1 col 2</h6>
              </Col>
            </Row>
          </Col>
          <Col isNested style={{ border: "1px solid darkGrey" }}>
            <Row>
              <Col style={{ border: "1px solid blue" }}>
                <h6>row 2 col 1</h6>
              </Col>
              <Col style={{ border: "1px solid blue" }}>
                <h6>row 2 col 2</h6>
              </Col>
              <Col style={{ border: "1px solid blue" }}>
                <h6>row 2 col 3</h6>
              </Col>
            </Row>
          </Col>
        </Row>
        <SyntaxHighlighter>{formatCode(nestedColumnsCode)}</SyntaxHighlighter>
        <Divider />
      </section>
    </Page>
  );
};

export default ColStories;
