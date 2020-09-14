import React from "react";
import { Section } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";

const defaultSection = `
import { Section } from "sgds-govtech-react";

<Section>
</Section>
`;

const smallSection = `
import { Section } from "sgds-govtech-react";

<Section isSmall>
</Section>
`;

const mediumSection = `
import { Section } from "sgds-govtech-react";

<Section isMedium>
</Section>
`;

const largeSection = `
import { Section } from "sgds-govtech-react";

<Section isLarge>
</Section>
`;

const SectionStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Sections</h2>
      </Title>
      <section className="sgds-section">
        <h3>Sections to split your page contents</h3>
        <p>
          Section is the main building block for all layouts. It can be used as
          direct children of body. Sizes are the padding of the section. For
          more information check out the{" "}
          <a href="https://www.designsystem.tech.gov.sg/docs/section/">
            SGDS Section Docs
          </a>
          .
        </p>
        <h4>Default Section</h4>
        <Section style={{ background: "aliceblue" }}>
          <h5>Some Header Here</h5>
        </Section>
        <SyntaxHighlighter>{formatCode(defaultSection)}</SyntaxHighlighter>
        <Divider />
        <h4>Small Section</h4>
        <Section isSmall style={{ background: "aliceblue" }}>
          <h5>Some Header Here</h5>
        </Section>
        <SyntaxHighlighter>{formatCode(smallSection)}</SyntaxHighlighter>
        <Divider />
        <h4>Medium Section</h4>
        <Section isMedium style={{ background: "aliceblue" }}>
          <h5>Some Header Here</h5>
        </Section>
        <SyntaxHighlighter>{formatCode(mediumSection)}</SyntaxHighlighter>
        <Divider />
        <h4>Large Section</h4>
        <Section isLarge style={{ background: "aliceblue" }}>
          <h5>Some Header Here</h5>
        </Section>
        <SyntaxHighlighter>{formatCode(largeSection)}</SyntaxHighlighter>
        <Divider />
      </section>
    </Page>
  );
};

export default SectionStories;
