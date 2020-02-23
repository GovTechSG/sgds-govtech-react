import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { SideNav } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const code1 = `
import { SideNav } from 'sgds-govtech-react' 

<SideNav menuItems={MenuItems}></SideNav>

`;
const MenuItems = [
  { title: "Item1", link: "#" },
  {
    title: "Item2",
    subMenuItems: [
      { title: "SubItem1", link: "#" },
      { title: "SubItem2", link: "#" }
    ]
  },
  { title: "Item3", link: "#" }
];

const MenuItems2 = [
  {
    title: "Item1",
    link: "#"
  },
  {
    title: "Item2",
    isActive: true,
    onClick: (id, isActive) => {
      console.log(`test: ${MenuItems2[id].isActive}`);
      MenuItems2[id].isActive = isActive;
    },
    subMenuItems: [
      {
        children: (
          <a className="second-level-nav-item" href="#">
            Passed in Child Link 1
          </a>
        )
      },
      { title: "SubItem2", link: "#" }
    ]
  },
  {
    children: <a href="#">Item 3</a>
  }
];
const SideNavStories = props => {
  return (
    <Page className="sidenav-stories">
      <Title>
        <h2>Side Navigation</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          The Side Navigation Bar helps user navigate pages that reside under two or
          more levels of navigation
        </h3>
        <p>
          The side nav is a DSS component. It should be present in all 'gov.sg'
          websites.
        </p>

        <Divider />

        <h4>Standard SideNav</h4>

        <p>Example</p>

        <div className="row">
          <div className="col is-3">
            <SideNav menuItems={MenuItems}></SideNav>
          </div>
        </div>

        <p>Code</p>

        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        <h4>Customised SideNav</h4>
        <div className="row">
          <div className="col is-3">
            <SideNav menuItems={MenuItems2}></SideNav>
          </div>
        </div>
        <SyntaxHighlighter>{code1}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default SideNavStories;
