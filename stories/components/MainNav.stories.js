import React, { useState } from "react";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { MainNav } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";

const mainNavItems = {
  brand: {
    img: "https://www.designsystem.gov.sg/assets/img/logo_sgds.png",
    name: "Brand",
    link: ""
  },
  links: [
    {
      img: "",
      name: "MEGA MENU1",
      subMenuInfo: {
        title: "Sub Menu 1 Info",
        content:
          "You can put short paragraph of information here to describe about this section."
      },
      subMenus: [
        {
          subMenuTitle: "SUB MENU 1A",
          subMenuItems: [
            {
              name: "Sub Link 1",
              link: "#link1"
            },
            {
              name: "Sub Link 2",
              link: "#link1"
            },
            {
              name: "Sub Link 3",
              link: "#link1"
            }
          ]
        },
        {
          subMenuTitle: "SUB MENU 1B",
          subMenuItems: [
            {
              name: "SUB MENU 2A",
              link: "#link1"
            },
            {
              name: "SUB MENU 2A",
              link: "#link1"
            },
            {
              name: "SUB MENU 2A",
              link: "#link1"
            }
          ]
        }
      ]
    },
    {
      img: "",
      name: "Link2",
      sublinks: [
        {
          img: "",
          name: "SubLink2-1"
        },
        {
          img: "",
          name: "SubLink2-2"
        },
        {
          img: "",
          name: "SubLink2-3"
        }
      ]
    },
    {
      img: "",
      name: "Link3",
      link: "/"
    }
  ]
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
const MainNavStories = props => {
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

        <h4>Standard Main Navigation Bar</h4>
        <MainNav
          brand={mainNavItems.brand}
          links={mainNavItems.links}
          selectItem={setSelectedItem}
        />
        <p>Selected Item: {selectedItem}</p>
        <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>

        <Divider />
        <h4>Main Navigation with Search</h4>
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
        <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default MainNavStories;
