import React from "react";
import SyntaxHighlighter from "../../lib/SyntaxHighlighter";
import {
  StandaloneSideNav,
  StandaloneSideNavItem,
  StandaloneSideNavMenu,
  StandaloneSideNavMenuItem,
  Button
} from "../../../src/components";
import { Page, Title, Divider } from "../../shared-styles";

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
  StandaloneSideNavItem,
  StandaloneSideNavMenu,
  StandaloneSideNavMenuItem,
  Button
} from "sgds-govtech-react";

<div className="row">
  <div className="col is-3">
    <SideNav>
      <StandaloneSideNavItem href="#!" isActive>
        Item 1 - href prop
      </StandaloneSideNavItem>
      <StandaloneSideNavItem
        onClick={e => {
          e.preventDefault();
          console.log("Clicked Item 2");
        }}
      >
        Item 2 - onClick prop
      </StandaloneSideNavItem>
      <StandaloneSideNavItem
        href="#!"
        onClick={e => {
          e.preventDefault();
          console.log("Clicked Item 3");
        }}
      >
        Item 3 - both href and onClick props
      </StandaloneSideNavItem>
      <StandaloneSideNavItem
        component={Button}
        buttonSize="small"
        onClick={() => console.log("Clicked custom component")}
      >
        A Custom Component
      </StandaloneSideNavItem>

      <StandaloneSideNavMenu text="Side Nav Menu" initiallyOpen isActive>
        <StandaloneSideNavMenuItem href="#!">
          Sub-item 1 - href prop
        </StandaloneSideNavMenuItem>
        <StandaloneSideNavMenuItem
          isActive
          onClick={e => {
            e.preventDefault();
            console.log("Clicked sub-item 2");
          }}
        >
          Sub-item 2 - onClick prop
        </StandaloneSideNavMenuItem>
        <StandaloneSideNavMenuItem
          component={Button}
          buttonSize="small"
          onClick={() => console.log("Clicked custom component")}
          style={{ marginLeft: "1.5rem" }}
        >
          A Custom Component
        </StandaloneSideNavMenuItem>
      </StandaloneSideNavMenu>
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
            <StandaloneSideNav menuItems={MenuItems}></StandaloneSideNav>
          </div>
        </div>
        <SyntaxHighlighter>{code1}</SyntaxHighlighter>

        <Divider />

        <h4>Customised Side Nav</h4>
        <div className="row">
          <div className="col is-3">
            <StandaloneSideNav menuItems={MenuItems2}></StandaloneSideNav>
          </div>
        </div>
        <SyntaxHighlighter>{code2}</SyntaxHighlighter>

        <h4>
          <code>&lt;StandaloneSideNavItem&gt;</code> component syntax
        </h4>

        <p>
          You can nest <code>&lt;StandaloneSideNavItem&gt;</code> components within
          <code>&lt;SideNav&gt;</code>.
        </p>
        <p>
          By passing the <code>component</code>
          prop, you can specify your own custom components as a
          <code>&lt;StandaloneSideNavItem&gt;</code>, such as the
          <code>&lt;Link&gt;</code> component from React Router. You can also
          specify any props consumed by your custom component directly on the
          <code>&lt;StandaloneSideNavItem&gt;</code>, as shown below.
        </p>

        <div className="row">
          <div className="col is-3">
            <StandaloneSideNav>
              <StandaloneSideNavItem href="#!" isActive>
                Item 1 - href prop
              </StandaloneSideNavItem>
              <StandaloneSideNavItem
                onClick={e => {
                  e.preventDefault();
                  console.log("Clicked Item 2");
                }}
              >
                Item 2 - onClick prop
              </StandaloneSideNavItem>
              <StandaloneSideNavItem
                href="#!"
                onClick={e => {
                  e.preventDefault();
                  console.log("Clicked Item 3");
                }}
              >
                Item 3 - both href and onClick props
              </StandaloneSideNavItem>
              <StandaloneSideNavItem
                component={Button}
                buttonSize="small"
                onClick={() => console.log("Clicked custom component")}
              >
                A Custom Component
              </StandaloneSideNavItem>

              <StandaloneSideNavMenu text="Side Nav Menu" initiallyOpen isActive>
                <StandaloneSideNavMenuItem href="#!">
                  Sub-item 1 - href prop
                </StandaloneSideNavMenuItem>
                <StandaloneSideNavMenuItem
                  isActive
                  onClick={e => {
                    e.preventDefault();
                    console.log("Clicked sub-item 2");
                  }}
                >
                  Sub-item 2 - onClick prop
                </StandaloneSideNavMenuItem>
                <StandaloneSideNavMenuItem
                  component={Button}
                  buttonSize="small"
                  onClick={() => console.log("Clicked custom component")}
                  style={{ marginLeft: "1.5rem" }}
                >
                  A Custom Component
                </StandaloneSideNavMenuItem>
              </StandaloneSideNavMenu>
              <StandaloneSideNavMenu text="Side Nav Menu 2">
                <StandaloneSideNavMenuItem
                  onClick={e => {
                    e.preventDefault();
                    console.log("Clicked sub-item 2");
                  }}
                >
                  Sub-item - onClick prop
                </StandaloneSideNavMenuItem>
              </StandaloneSideNavMenu>
            </StandaloneSideNav>
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
