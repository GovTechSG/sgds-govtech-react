import React from 'react';
import PropTypes from 'prop-types';
import {Page,Title, paragraphHeaderStyles} from '../shared-styles'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Button} from '../../src/components'
import styled from 'styled-components'
const ButtonContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:flex-start
  align-items:center;
`
const RowButtonContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:flex-start;
  > button{
    margin:0px 5px
  }
`
const CodeText = styled.code`
  margin-top:5px
  text-align:center;
`
const buttonCode1 =
`
// Must import component from the react library first
import {Button} from 'sgds-govtech-react' 

<Button>This is a plain button</Button>
<Button isPrimary> This is a primary button</Button>
<Button isPrimary isOutlined> This button is outlined</Button>
<Button isPrimary isRounded> This button is rounded</Button>
<Button isPrimary isDisabled> This button is disabled</Button>
<Button isPrimary isLoading> This button is loading</Button>
`
const buttonCode2 = 
`
// Plain icon button
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
`
const buttonCode3 = 
`
<Button colorType="info">Info</Button>
<Button colorType="success">Success</Button>
<Button colorType="warning">Warning</Button>
<Button colorType="danger">Danger</Button>
`
const Buttons = (props) => {
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Buttons</h3>
      </Title>
      <section className="sgds-section">
      <h4 className="has-text-primary">Button is an ordinary, every-day element of interaction design. Although button looks like a very simple UI element, its design has changed a lot over the past decades. But still, button UX design is always about recognition and clarity</h4>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">Standard Usage</h5>
        <div className="row is-multiline">
          <ButtonContainer className="col is-3">
            <Button>This is a plain button</Button>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary> This is a primary button</Button>
            <CodeText>isPrimary</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary isOutlined> This button is outlined</Button>
            <CodeText>isPrimary isOutlined</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary isRounded> This button is rounded</Button>
            <CodeText>isPrimary isRounded</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary isDisabled> This button is disabled</Button>
            <CodeText>isDisabled</CodeText>
          </ButtonContainer>
          <ButtonContainer className="col is-3">
            <Button isPrimary isLoading> This button is loading</Button>
            <CodeText>isLoading</CodeText>
          </ButtonContainer>
        </div>
        <div className="row">
          <div className="col">
          <SyntaxHighlighter language="jsx" style={base16AteliersulphurpoolLight}>
            {buttonCode1}
          </SyntaxHighlighter>
          </div>
        </div>     
        <hr></hr>
        <div className="row">
          <div className="col">
            <h5 className="has-text-primary has-text-weight-semibold margin--top--lg margin--bottom">Icon Buttons</h5>
            <p className="">You can also insert icons from our library on any part of a button </p>
          </div>
        </div>
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
            <span className="icon"><i className="sgds-icon sgds-icon-facebook"></i></span>
            <span>Facebook</span>
          </Button>
          </RowButtonContainer>
        </div>
        <div className="row">
          <div className="col">
          <SyntaxHighlighter language="jsx" style={base16AteliersulphurpoolLight}>
            {buttonCode2}
          </SyntaxHighlighter>
          </div>
        </div>   
        <hr></hr>
        <div className="row">
          <div className="col">
            <h5 className="has-text-primary has-text-weight-semibold margin--top--lg margin--bottom">Colors</h5>
            <p className="">You can also apply the default color schemes to the buttons </p>
          </div>
        </div>
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
          <SyntaxHighlighter language="jsx" style={base16AteliersulphurpoolLight}>
            {buttonCode3}
          </SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  )
};

export default Buttons;
