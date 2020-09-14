import React from "react";
import { Container } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const ContainerStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Container</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          Container to hold your page contents
        </h3>
        <p>The Container component helps you to limit page elements to a reasonable maximum width, based on the size of a user's screen.</p>
        <h4>Default Container</h4>
        <Container><div style={{width:"100%", height:"400px", background:"gray"}}></div></Container>
        <Divider />
        <h4>Fluid Container</h4>
        <Container isFluid><div style={{width:"100%", height:"400px", background:"gray"}}></div></Container>
        <Divider />
      </section>
    </Page>
  );
};

export default ContainerStories;
