import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Tab } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const code1 = `
import { Tab } from 'sgds-govtech-react' 

<Tab tabItems={tabItems} />

`;

const tabItems = [
  {
    title: "Tab 1",
    icon: "sgds-icon-boat",
    content: (
      <div className="col">
        <h4>Tab 1 Content</h4>
        <p>I am display tab 1's content</p>
      </div>
    )
  },
  {
    title: "Tab 2",
    icon: "sgds-icon-bus",
    content: (
      <div className="col">
        <h4>Tab 2 Content</h4>
        <p>I am display tab 2's content</p>
      </div>
    )
  },
  {
    title: "Tab 3",
    icon: "sgds-icon-train",
    content: (
      <div className="col">
        <h4>Tab 3 Content</h4>
        <p>I am display tab 3's content</p>
      </div>
    )
  }
];

const TabStories = props => {
  return (
    <Page>
      <Title>
        <h2>Tab</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          Tabs are navigation elements that let users easily access different
          areas of a site or different parts of an individual page
        </h3>

        <p>
          Think tabbed dividers in a filing cabinet – by clicking a tab, users
          can easily locate a page containing related content
        </p>

        <Divider />

        <h4>Default Tab</h4>
        <Tab tabItems={tabItems} />

        <SyntaxHighlighter>{code1}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default TabStories;
