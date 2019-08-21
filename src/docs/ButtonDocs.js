import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { Button } from "../components";

class ButtonDocs extends Component {
  render() {
    return (
      <div className="sgds-container">
        <div className="row">
          <div className="col">
            <h2>Buttons</h2>
            <div className="row">
              <div className="col is-6">
                <Button>A Plain Button</Button>
              </div>
              <div className="col is-6">
                <SyntaxHighlighter>{`<Button>A Plain Button</Button>`}</SyntaxHighlighter>
              </div>
            </div>
            <div className="row">
              <div className="col is-6">
                <Button isPrimary>Primary Button</Button>
              </div>
              <div className="col is-6">
                <SyntaxHighlighter>{`<Button isPrimary>Primary Button</Button>`}</SyntaxHighlighter>
              </div>
            </div>
            <div className="row">
              <div className="col is-6">
                <Button isPrimary isOutlined>
                  Primary and Outlined
                </Button>
              </div>
              <div className="col is-6">
                <SyntaxHighlighter>{`<Button isPrimary isOutlined>Primary and Outlined</Button>`}</SyntaxHighlighter>
              </div>
            </div>
            <div className="row">
              <div className="col is-6">
                <Button isDisabled isPrimary>
                  Disabled
                </Button>
              </div>
              <div className="col is-6">
                <SyntaxHighlighter>{`<Button isDisabled isPrimary>Disabled</Button>`}</SyntaxHighlighter>
              </div>
            </div>
            <div className="row">
              <div className="col is-6">
                <Button isRounded isPrimary>
                  Rounded
                </Button>
              </div>
              <div className="col is-6">
                <SyntaxHighlighter>{`<Button isRounded isPrimary>Rounded</Button>`}</SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonDocs;
