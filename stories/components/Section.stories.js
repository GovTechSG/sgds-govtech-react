import React from "react";
import { Section } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const SectionStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Section</h2>
      </Title>
      <section className="sgds-section">
        <h3>Sections to split your page contents</h3>
        <p>
          Section is the main building block for all layouts. It can be used as
          direct children of body. Sizes are the padding of the section.
        </p>
        <h4>Default Section</h4>
        <Section style={{background:"grey"}}>
          <h5>Some Header Here</h5>
        </Section>
        <Divider />
        <h4>Small Section</h4>
        <Section isSmall style={{background:"grey"}}>
          <h5>Some Header Here</h5>
        </Section>
        <Divider />
        <h4>Medium Section</h4>
        <Section isMedium style={{background:"grey"}}>
          <h5>Some Header Here</h5>
        </Section>
        <Divider />
        <h4>Large Section</h4>
        <Section isLarge style={{background:"grey"}}>
          <h5>Some Header Here</h5>
        </Section>
        <Divider />
      </section>
    </Page>
  );
};

export default SectionStories;
