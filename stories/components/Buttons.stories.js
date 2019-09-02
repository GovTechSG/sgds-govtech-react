import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Button } from "../../src/components";
import { Page, Title } from "../shared-styles";
const ButtonContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:flex-start
  align-items:center;
`;
const RowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  > button {
    margin: 0px 5px;
  }
`;
const CodeText = styled.code`
  margin-top:5px
  text-align:center;
`;
const buttonCode1 = `
import { Button } from 'sgds-govtech-react' 

<>
<Button>This is a plain button</Button>
<Button isPrimary>This is a primary button</Button>
<Button isPrimary isOutlined>This button is outlined</Button>
<Button isPrimary isRounded>This button is rounded</Button>
<Button isPrimary isDisabled>This button is disabled</Button>
<Button isPrimary isLoading>This button is loading</Button>
</>
`;
const buttonCode2 = `
<>
// With Icons
<Button>
  <span className="icon">
      <i className="sgds-icon sgds-icon-download"></i>
  </span>
</Button>

// Twitter button
<Button>
  <span className="icon">
    <i className="sgds-icon sgds-icon-twitter"></i>
  </span>
  <span>Twitter</span>
</Button>

// Facebook Icon
<Button isPrimary>
  <span className="icon"><i className="sgds-icon sgds-icon-facebook"></i></span>
  <span>Facebook</span>
</Button>
</>
`;
const buttonCode3 = `
<>
<Button colorType="info">Info</Button>
<Button colorType="success">Success</Button>
<Button colorType="warning">Warning</Button>
<Button colorType="danger">Danger</Button>
</>
`;
const ButtonStories = props => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Buttons</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
          The button is an ordinary, everyday element of interaction design.
          Although buttons look simple, their designs have evolved over decades
          of usage. Buttons should be used for users to interact with a web
          page, and can be a powerful tool in directing a user's focus.
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Standard Usage
        </h5>
        <div className="row is-multiline">
          <ButtonContainer className="col is-3">
            <Button onClick={action("default-button-click")}>
              This is a plain button
            </Button>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary onClick={action("primary-button-click")}>
              This is a primary button
            </Button>
            <CodeText>isPrimary</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button
              isPrimary
              isOutlined
              onClick={action("outlined-button-click")}
            >
              This button is outlined
            </Button>
            <CodeText>isPrimary isOutlined</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button
              isPrimary
              isRounded
              onClick={action("rounded-button-click")}
            >
              This button is rounded
            </Button>
            <CodeText>isPrimary isRounded</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button
              isPrimary
              isDisabled
              onClick={action("disabled-button-click")}
            >
              This button is disabled
            </Button>
            <CodeText>isDisabled</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button
              isPrimary
              isLoading
              onClick={action("loading-button-click")}
            >
              This button is loading
            </Button>
            <CodeText>isLoading</CodeText>
          </ButtonContainer>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(buttonCode1)}</SyntaxHighlighter>
          </div>
        </div>

        <hr></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--top--lg margin--bottom">
          Icon Buttons
        </h5>
        <p>
          You can also insert icons from our library on any part of a button
        </p>
        <div className="row">
          <RowButtonContainer className="col is-6">
            <Button>
              <span className="icon">
                <i className="sgds-icon sgds-icon-download"></i>
              </span>
            </Button>
            <Button>
              <span className="icon">
                <i className="sgds-icon sgds-icon-twitter"></i>
              </span>
              <span>Twitter</span>
            </Button>
            <Button isPrimary>
              <span className="icon">
                <i className="sgds-icon sgds-icon-facebook"></i>
              </span>
              <span>Facebook</span>
            </Button>
          </RowButtonContainer>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(buttonCode2)}</SyntaxHighlighter>
          </div>
        </div>

        <hr></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--top--lg margin--bottom">
          Colors
        </h5>
        <p>You can also apply the default color schemes to the buttons</p>
        <div className="row is-multiline">
          <RowButtonContainer className="col">
            <Button colorType="info">Info</Button>
            <Button colorType="success">Success</Button>
            <Button colorType="warning">Warning</Button>
            <Button colorType="danger">Danger</Button>
          </RowButtonContainer>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(buttonCode3)}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default ButtonStories;
