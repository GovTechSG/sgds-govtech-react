import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { Dropdown, DropdownItem, Button } from "../components";

const codeString = `<Dropdown title="Click me">
  <DropdownItem
    href="#!"
    onClick={() => {
      this.onDropdownItemClicked(1);
    }}
  >
    Item 1 is a link
  </DropdownItem>
  <DropdownItem
    onClick={() => {
      this.onDropdownItemClicked(2);
    }}
  >
    Item 2 is not a link
  </DropdownItem>
  <DropdownItem>
    <Button
      onClick={() => {
        this.onDropdownItemClicked(3);
      }}
    >
      Item 3 can be anything, even a button
    </Button>
  </DropdownItem>
</Dropdown>`;

class DropdownDocs extends Component {
  state = {
    lastDropdownItemClicked: null
  };

  onDropdownItemClicked = num => {
    this.setState({
      lastDropdownItemClicked: num
    });
  };

  render() {
    return (
      <div className="sgds-container">
        <div className="row">
          <div className="col">
            <h2>Dropdowns</h2>
            <div className="row">
              <div className="col is-6">
                <Dropdown title="Click me">
                  <DropdownItem
                    href="#!"
                    onClick={() => {
                      this.onDropdownItemClicked(1);
                    }}
                  >
                    Item 1 is a link
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.onDropdownItemClicked(2);
                    }}
                  >
                    Item 2 is not a link
                  </DropdownItem>
                  <DropdownItem>
                    <Button
                      onClick={() => {
                        this.onDropdownItemClicked(3);
                      }}
                    >
                      Item 3 can be anything, even a button
                    </Button>
                  </DropdownItem>
                </Dropdown>
              </div>
              <div className="col is-6">
                <p>
                  Last dropdown item clicked:
                  {this.state.lastDropdownItemClicked
                    ? ` ${this.state.lastDropdownItemClicked}`
                    : ` nothing clicked yet!`}
                </p>
              </div>
            </div>
            <h3>Code</h3>
            <div className="row">
              <div className="col">
                <SyntaxHighlighter>{codeString}</SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DropdownDocs;
