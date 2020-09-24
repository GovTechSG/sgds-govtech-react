import React, { useState } from "react";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { MainNav } from "../../src/components";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavBurger,
  MainNavDropdown,
  MainNavItem,
  MainNavMenu,
  MainNavMenuStart,
  MainNavMenuEnd,
} from "../../src/components/standard";
import Row from "../../src/components/Row";
import Col from "../../src/components/Col";
import { Page, Title, Divider } from "../shared-styles";

const mainNavItems = {
  brand: {
    img: "https://www.designsystem.gov.sg/assets/img/logo_sgds.png",
    name: "Brand",
    link: "",
  },
  links: [
    {
      img: "",
      name: "MEGA MENU1",
      subMenuInfo: {
        title: "Sub Menu 1 Info",
        content:
          "You can put short paragraph of information here to describe about this section.",
      },
      subMenus: [
        {
          subMenuTitle: "SUB MENU 1A",
          subMenuItems: [
            {
              name: "Sub Link 1",
              link: "#link1",
            },
            {
              name: "Sub Link 2",
              link: "#link1",
            },
            {
              name: "Sub Link 3",
              link: "#link1",
            },
          ],
        },
        {
          subMenuTitle: "SUB MENU 1B",
          subMenuItems: [
            {
              name: "SUB MENU 2A",
              link: "#link1",
            },
            {
              name: "SUB MENU 2A",
              link: "#link1",
            },
            {
              name: "SUB MENU 2A",
              link: "#link1",
            },
          ],
        },
      ],
    },
    {
      img: "",
      name: "Link2",
      sublinks: [
        {
          img: "",
          name: "SubLink2-1",
        },
        {
          img: "",
          name: "SubLink2-2",
        },
        {
          img: "",
          name: "SubLink2-3",
        },
      ],
    },
    {
      img: "",
      name: "Link3",
      link: "/",
    },
  ],
};

const code1 = `
import { MainNav } from 'sgds-govtech-react' 

<MainNav
  brand={mainNavItems.brand}
  links={mainNavItems.links}
  selectItem={setSelectedItem}
/>

`;
const code2 = `
<MainNav
  brand={mainNavItems.brand}
  links={mainNavItems.links}
  displaySearch={true}
  searchChangeHandler={event => {
    event.preventDefault();
    console.log("Search input changed");
  }}
  searchClickHandler={event => {
    event.preventDefault();
    console.log("Search button clicked");
  }}
/>
`;
const composableMainNav1Code = `
import React, { useState } from "react";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavBurger,
  MainNavDropdown,
  MainNavItem,
  MainNavMenu,
  MainNavMenuStart,
  MainNavMenuEnd,
} from "sgds-govtech-react/dist/standard";

const Link = (props) => {
  return (
    <a href={props.to} className={props.className}>
      {props.children}
    </a>
  );
};

const ComposableMainNav1 = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <MainNavComposable>
      <MainNavBrand>
        <MainNavItem href="/">
          <img
            src="https://www.designsystem.gov.sg/assets/img/logo_sgds.png"
            alt="main logo"
          />
        </MainNavItem>
        <MainNavBurger
          onClick={() => setShowNavMenu(!showNavMenu)}
          expand={showNavMenu}
        />
      </MainNavBrand>
      <MainNavMenu expand={showNavMenu}>
        <MainNavMenuStart>
          <MainNavItem href="#!">Who we are</MainNavItem>
          <MainNavItem href="#!" isUpperCase>
            isUpperCase
          </MainNavItem>
          <MainNavItem href="#!" isTab>
            isTab
          </MainNavItem>
          <MainNavDropdown
            label="Hover dropdown"
            onClick={() => console.log("Clicked!")}
          >
            <MainNavItem href="#!">Dropdown item 1</MainNavItem>
            {/* use the 'as' prop to MainNavItem to use any component, such as a react-router 'Link'. */}
            <MainNavItem as={Link} to="/dropdown-item-2">
              Dropdown item 2
            </MainNavItem>
          </MainNavDropdown>
        </MainNavMenuStart>
      </MainNavMenu>
    </MainNavComposable>
  );
};`;

const ComposableMainNav1 = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <MainNavComposable>
      <MainNavBrand>
        <MainNavItem href="/">
          <img
            src="https://www.designsystem.gov.sg/assets/img/logo_sgds.png"
            alt="main logo"
          />
        </MainNavItem>
        <MainNavBurger
          onClick={() => setShowNavMenu(!showNavMenu)}
          expand={showNavMenu}
        />
      </MainNavBrand>
      <MainNavMenu expand={showNavMenu}>
        <MainNavMenuStart>
          <MainNavItem href="#!">Who we are</MainNavItem>
          <MainNavItem href="#!" isUpperCase>
            isUpperCase
          </MainNavItem>
          <MainNavItem href="#!" isTab>
            isTab
          </MainNavItem>
          <MainNavDropdown
            label="Hover dropdown"
            onClick={() => console.log("Clicked!")}
          >
            <MainNavItem href="#!">Dropdown item 1</MainNavItem>
            {/* use the 'as' prop to MainNavItem to use any component, such as a react-router 'Link'. */}
            <MainNavItem as={Link} to="/dropdown-item-2">
              Dropdown item 2
            </MainNavItem>
          </MainNavDropdown>
        </MainNavMenuStart>
      </MainNavMenu>
    </MainNavComposable>
  );
};

const composableMainNav2Code = `
import React, { useState } from "react";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavBurger,
  MainNavDropdown,
  MainNavItem,
  MainNavMenu,
  MainNavMenuStart,
  MainNavMenuEnd,
} from "sgds-govtech-react/dist/standard";

const Link = (props) => {
  return (
    <a href={props.to} className={props.className}>
      {props.children}
    </a>
  );
};

const ComposableMainNav2 = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <MainNavComposable isFluid>
      <MainNavBrand>
        <MainNavItem as={Link} to="/">
          <img
            src="https://www.designsystem.gov.sg/assets/img/logo_sgds.png"
            alt="main logo"
          />
        </MainNavItem>
        <MainNavBurger
          onClick={() => setShowNavMenu(!showNavMenu)}
          expand={showNavMenu}
        />
      </MainNavBrand>
      <MainNavMenu expand={showNavMenu}>
        <MainNavMenuStart>
          <MainNavItem href="#!">Who we are</MainNavItem>
        </MainNavMenuStart>
        <MainNavMenuEnd>
          <MainNavDropdown isMega label="Mega Dropdown">
            <Row>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 1</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 2</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 3</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
            </Row>
          </MainNavDropdown>
          <MainNavItem>Not a link</MainNavItem>
          <MainNavItem href="www.example.com">External Link</MainNavItem>
        </MainNavMenuEnd>
      </MainNavMenu>
    </MainNavComposable>
  );
};
`;

const ComposableMainNav2 = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <MainNavComposable isFluid>
      <MainNavBrand>
        <MainNavItem as={Link} to="/">
          <img
            src="https://www.designsystem.gov.sg/assets/img/logo_sgds.png"
            alt="main logo"
          />
        </MainNavItem>
        <MainNavBurger
          onClick={() => setShowNavMenu(!showNavMenu)}
          expand={showNavMenu}
        />
      </MainNavBrand>
      <MainNavMenu expand={showNavMenu}>
        <MainNavMenuStart>
          <MainNavItem href="#!">Who we are</MainNavItem>
        </MainNavMenuStart>
        <MainNavMenuEnd>
          <MainNavDropdown isMega label="Mega Dropdown">
            <Row>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 1</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 2</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
              <Col is={4}>
                <MainNavItem as={MyMenuHeader}>Mega menu column 3</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
                <MainNavItem href="#!">Mega menu link</MainNavItem>
              </Col>
            </Row>
          </MainNavDropdown>
          <MainNavItem>Not a link</MainNavItem>
          <MainNavItem href="www.example.com">External Link</MainNavItem>
        </MainNavMenuEnd>
      </MainNavMenu>
    </MainNavComposable>
  );
};

const Link = (props) => {
  return (
    <a href={props.to} className={props.className}>
      {props.children}
    </a>
  );
};

const MyMenuHeader = (props) => {
  return <strong className={props.className}>{props.children}</strong>;
};

const MainNavStories = (props) => {
  const [selectedItem, setSelectedItem] = useState("");
  return (
    <Page>
      <Title>
        <h2>Main Navigation</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          The Main Navigation Bar helps users navigate top-level pages within a
          website
        </h3>
        <p>
          The main nav is a DSS component. It should be present in all 'gov.sg'
          websites.
        </p>

        <Divider />

        <h3>Standard Main Navigation Bar</h3>
        <MainNav
          brand={mainNavItems.brand}
          links={mainNavItems.links}
          selectItem={setSelectedItem}
        />
        <p>Selected Item: {selectedItem}</p>
        <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>

        <Divider />
        <h3>Main Navigation with Search</h3>
        <MainNav
          brand={mainNavItems.brand}
          links={mainNavItems.links}
          displaySearch={true}
          searchChangeHandler={(event) => {
            event.preventDefault();
            console.log("Search input changed");
          }}
          searchClickHandler={(event) => {
            event.preventDefault();
            console.log("Search button clicked");
          }}
        />
        <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>
      </section>
      <section className="sgds-section">
        <h3>Composable main navigation</h3>
        <p>
          You can find a set of composable standard components under the import
          at
          <code>sgds-govtech-react/dist/standard</code>
        </p>
        <p>
          The composable Main Nav provides you with more flexibility in crafting
          your navigation bar. It supports broadly 3 types of children
          containers
        </p>
        <ul>
          <li>
            MainNavBrand: visible across all device sizes and always sits at the
            left of MainNavMenu
          </li>
          <li>
            MainNavMenu: to the right of MainNavBrand, and hidden on mobile
            devices (&lt;1024px wide). Its children are:
            <ul>
              <li>
                MainNavStart: Positioned at the left on desktop and top on
                mobile.
              </li>
              <li>
                MainNavEnd: Positioned at the right on desktop and bottom on
                mobile.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          MainNavBrand, MainNavStart and MainNavEnd further support child
          components:
        </p>
        <ul>
          <li>
            MainNavItem: a flexible component that renders links or container
            components styled to fit inside the main nav. Also accepts the{" "}
            <code>as</code> prop that allows you to define any component you
            want to be rendered, e.g. the <code>Link</code> component from{" "}
            <code>react-router</code>.
          </li>
          <li>MainNavDropdown</li>
        </ul>

        <h4>Code</h4>

        <ComposableMainNav1 />

        <SyntaxHighlighter>
          {formatCode(composableMainNav1Code)}
        </SyntaxHighlighter>

        <ComposableMainNav2 />

        <SyntaxHighlighter>
          {formatCode(composableMainNav2Code)}
        </SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default MainNavStories;
