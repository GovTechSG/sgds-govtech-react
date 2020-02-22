import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { SideNav } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";
import "./SideNav.stories.scss";

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
      <Title className="sgds-section">
        <h3 className="has-text-white">Side Navigation</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
          The side nav is a standard component that all '.gov.sg' websites must
          adopt for pages that reside under two or more levels of navigation
        </h4>

        <Divider />

        <h5 className="has-text-primary">Standard SideNav</h5>

        <p>Example</p>

        <div className="row">
          <div className="col is-3">
            <SideNav menuItems={MenuItems}></SideNav>
          </div>
        </div>

        <p>Code</p>

        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Customised SideNav
        </h5>
        <div className="row is-multiline">
          <div className="col is-3">
            <SideNav menuItems={MenuItems2}></SideNav>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{code1}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default SideNavStories;
