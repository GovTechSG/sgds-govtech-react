import React from "react";
import { Container } from "../../src/components";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Divider, Page, Title } from "../shared-styles";

const basicContainerCode = `
import { Container } from "sgds-govtech-react";

<Container>

</Container>`;
const fluidContainerCode = `
import { Container } from "sgds-govtech-react";

<Container isFluid>

</Container>`;
const ContainerStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Containers</h2>
      </Title>
      <section className="sgds-section">
        <h3>Container to hold your page contents</h3>
        <p>
          The Container component helps you to limit page elements to a
          reasonable maximum width, based on the size of a user's screen. For
          more information check out the{" "}
          <a href="https://www.designsystem.tech.gov.sg/docs/container/">
            SGDS Container Docs
          </a>
          .
        </p>
        <h4>Default Container</h4>
        <Container>
          <div
            style={{ width: "100%", height: "400px", background: "aliceblue" }}
          ></div>
        </Container>
        <SyntaxHighlighter>{formatCode(basicContainerCode)}</SyntaxHighlighter>
        <Divider />
        <h4>Fluid Container</h4>
        <Container isFluid>
          <div
            style={{ width: "100%", height: "400px", background: "aliceblue" }}
          ></div>
        </Container>
        <SyntaxHighlighter>{formatCode(fluidContainerCode)}</SyntaxHighlighter>
        <Divider />
      </section>
    </Page>
  );
};

export default ContainerStories;
