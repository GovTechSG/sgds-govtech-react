import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Title = styled.section`
  background: rgb(96, 55, 179);
  background: linear-gradient(30deg, rgba(96, 55, 179, 1) 0%, rgba(70, 117, 211, 1) 100%);
  padding:30px;
`
const Page = styled.div`
  flex:1 0 auto;
`
const paragraphHeaderStyles= "has-text-primary has-text-weight-semibold margin--bottom";

const Welcome = (props) => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 class="has-text-white has-text-weight-semibold">Welcome to the Singapore Design System React Docs</h3>
      </Title>
      <section className="sgds-section">
        <h4 className={paragraphHeaderStyles}>
          About
        </h4>
        <p>
        The Singapore Government Design System (SGDS) was developed to unite teams in creating fast, accessible and mobile friendly digital services with a common set of UI components that comply to the Digital Service Standards.
        </p>
        <hr class="margin--bottom--lg margin--top--lg"></hr>
        <h4 className={paragraphHeaderStyles}>
          How to use this documentation
        </h4>
        <p>
          The documentation is broken down into two parts, the canvas (upper area) and the addons (lower area). 
          The section you are currently reading from is the canvas area which will house live components which you can interact with.
        </p>
        <p>
          The lower area below houses additional tools to assist you in implementing the components in your project.
        </p>
      </section>
    </Page>
  )
};

export default Welcome;
