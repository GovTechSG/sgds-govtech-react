import React, { useState } from "react";
import Dropdown from "../../src/components/Dropdown";
import DropdownItem from "../../src/components/DropdownItem";
import Button from "../../src/components/Button";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Page, Title, Divider } from "../shared-styles";

const dropdownCode = `<Dropdown title="Click me">{/* Or <Dropdown title="Hover me" isHoverable */}
<DropdownItem href="/">
  Item 1: Pass href as a prop to render a link
</DropdownItem>
<DropdownItem
  href="#!"
  onClick={(e) => {
    e.preventDefault();
    onDropdownItemClicked(2);
  }}
>
  Item 2: Use onClick to control behaviour
</DropdownItem>
<DropdownItem
  onClick={() => {
    onDropdownItemClicked(3);
  }}
>
  Item 3: Not a link
</DropdownItem>
<DropdownItem>
  <p>Item 4: Insert any content you wish to</p>
  <Button
    onClick={() => {
      onDropdownItemClicked(4);
    }}
  >
    A button
  </Button>
</DropdownItem>
</Dropdown>`;

const DropdownStories = props => {
  const [lastDropdownItemClicked, setLastDropdownItemClicked] = useState(null);
  function onDropdownItemClicked(num) {
    setLastDropdownItemClicked(num);
  }
  return (
    <Page>
      <Title>
        <h2>Dropdowns</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          Use dropdowns to show or hide a list of elements or links.
        </h3>

        <Divider />

        <h4>
          Standard Usage
        </h4>
        <div className="row">
          <div className="col is-3">
            <h5>Standard dropdown</h5>
            <Dropdown title="Click me">
              {/* Or <Dropdown title="Hover me" isHoverable */}
              <DropdownItem href="/">
                Item 1: Pass href as a prop to render a link
              </DropdownItem>
              <DropdownItem
                href="#!"
                onClick={e => {
                  e.preventDefault();
                  onDropdownItemClicked(2);
                }}
              >
                Item 2: Use onClick to control behaviour
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  onDropdownItemClicked(3);
                }}
              >
                Item 3: Not a link
              </DropdownItem>
              <DropdownItem>
                <p>Item 4: Insert any content you wish to</p>
                <Button
                  onClick={() => {
                    onDropdownItemClicked(4);
                  }}
                >
                  A button
                </Button>
              </DropdownItem>
            </Dropdown>
          </div>
          <div className="col is-3">
            <h5>Hoverable dropdown</h5>
            <Dropdown title="Hover over me" isHoverable>
              <DropdownItem href="/">
                Item 1: Pass href as a prop to render a link
              </DropdownItem>
              <DropdownItem
                href="#!"
                onClick={e => {
                  e.preventDefault();
                  onDropdownItemClicked(2);
                }}
              >
                Item 2: Use onClick to control behaviour
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  onDropdownItemClicked(3);
                }}
              >
                Item 3: Not a link
              </DropdownItem>
              <DropdownItem>
                <p>Item 4: Insert any content you wish to</p>
                <Button
                  onClick={() => {
                    onDropdownItemClicked(4);
                  }}
                >
                  A button
                </Button>
              </DropdownItem>
            </Dropdown>
          </div>
          <div className="col is-6">
            <p>
              Last dropdown item clicked:
              {lastDropdownItemClicked || ` nothing clicked yet!`}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SyntaxHighlighter>{formatCode(dropdownCode)}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default DropdownStories;
