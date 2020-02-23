import React from "react";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import {
  SideNav,
  SideNavItem,
  SideNavMenu,
  SideNavMenuItem,
  Button
} from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const code1 = `
import { SideNav } from 'sgds-govtech-react';
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

<div className="row">
  <div className="col is-3">
    <SideNav menuItems={MenuItems}></SideNav>
  </div>
</div>
`;
const code2 = `
import { SideNav } from 'sgds-govtech-react';
const MenuItems2 = [
  {
    title: "Item1",
    link: "#"
  },
  {
    title: "Item2",
    isActive: true,
    onClick: (id, isActive) => {
      console.log(\`test: \${MenuItems2[id].isActive}\`);
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

<div className="row">
  <div className="col is-3">
    <SideNav menuItems={MenuItems2}></SideNav>
  </div>
</div>
`;

const code3 = `
import {
  SideNav,
  SideNavItem,
  SideNavMenu,
  SideNavMenuItem,
  Button
} from "sgds-govtech-react";

<div className="row">
  <div className="col is-3">
    <SideNav>
      <SideNavItem href="#!" isActive>
        Item 1 - href prop
      </SideNavItem>
      <SideNavItem
        onClick={e => {
          e.preventDefault();
          console.log("Clicked Item 2");
        }}
      >
        Item 2 - onClick prop
      </SideNavItem>
      <SideNavItem
        href="#!"
        onClick={e => {
          e.preventDefault();
          console.log("Clicked Item 3");
        }}
      >
        Item 3 - both href and onClick props
      </SideNavItem>
      <SideNavItem
        component={Button}
        buttonSize="small"
        onClick={() => console.log("Clicked custom component")}
      >
        A Custom Component
      </SideNavItem>

      <SideNavMenu text="Side Nav Menu" initiallyOpen isActive>
        <SideNavMenuItem href="#!">
          Sub-item 1 - href prop
        </SideNavMenuItem>
        <SideNavMenuItem
          isActive
          onClick={e => {
            e.preventDefault();
            console.log("Clicked sub-item 2");
          }}
        >
          Sub-item 2 - onClick prop
        </SideNavMenuItem>
        <SideNavMenuItem
          component={Button}
          buttonSize="small"
          onClick={() => console.log("Clicked custom component")}
          style={{ marginLeft: "1.5rem" }}
        >
          A Custom Component
        </SideNavMenuItem>
      </SideNavMenu>
    </SideNav>
  </div>
</div>
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
          The Side Navigation Bar helps user navigate pages that reside under
          two or more levels of navigation
        </h3>
        <p>
          The side nav is a DSS component. It should be present in all 'gov.sg'
          websites.
        </p>

        <Divider />

        <h4>Standard Side Navigation</h4>

        <p>
          <code>menuItems</code> array as props syntax
        </p>
        <div className="row">
          <div className="col is-3">
            <SideNav menuItems={MenuItems}></SideNav>
          </div>
        </div>
        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        <h4>Customised Side Nav</h4>
        <div className="row">
          <div className="col is-3">
            <SideNav menuItems={MenuItems2}></SideNav>
          </div>
        </div>
        <SyntaxHighlighter>{code2}</SyntaxHighlighter>

        <p>
          <code>&lt;SideNavItem&gt;</code> component syntax
        </p>

        <div className="row">
          <div className="col is-3">
            <SideNav>
              <SideNavItem href="#!" isActive>
                Item 1 - href prop
              </SideNavItem>
              <SideNavItem
                onClick={e => {
                  e.preventDefault();
                  console.log("Clicked Item 2");
                }}
              >
                Item 2 - onClick prop
              </SideNavItem>
              <SideNavItem
                href="#!"
                onClick={e => {
                  e.preventDefault();
                  console.log("Clicked Item 3");
                }}
              >
                Item 3 - both href and onClick props
              </SideNavItem>
              <SideNavItem
                component={Button}
                buttonSize="small"
                onClick={() => console.log("Clicked custom component")}
              >
                A Custom Component
              </SideNavItem>

              <SideNavMenu text="Side Nav Menu" initiallyOpen isActive>
                <SideNavMenuItem href="#!">
                  Sub-item 1 - href prop
                </SideNavMenuItem>
                <SideNavMenuItem
                  isActive
                  onClick={e => {
                    e.preventDefault();
                    console.log("Clicked sub-item 2");
                  }}
                >
                  Sub-item 2 - onClick prop
                </SideNavMenuItem>
                <SideNavMenuItem
                  component={Button}
                  buttonSize="small"
                  onClick={() => console.log("Clicked custom component")}
                  style={{ marginLeft: "1.5rem" }}
                >
                  A Custom Component
                </SideNavMenuItem>
              </SideNavMenu>
            </SideNav>
          </div>
          <div className="col">
            <SyntaxHighlighter>{code3}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default SideNavStories;
