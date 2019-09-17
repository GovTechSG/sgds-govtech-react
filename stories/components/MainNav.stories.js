import React,{useState} from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { MainNav } from "../../src/components";
import { Page, Title } from "../shared-styles";

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
brand={this.mainNavItems.brand}
links={this.mainNavItems.links}
selectItem={this.selectMenuItem}
/>

`;
const code2 = `
<MainNav
brand={this.mainNavItems.brand}
links={this.mainNavItems.links}
selectItem={this.selectMenuItem}
displaySearch={true}
/>
`;
const MainNavStories = props => {
  const [selectedItem, setSelectedItem] = useState('')
  return (
    <Page>
      <Title className="sgds-section">
        <h3 className="has-text-white has-text-weight-semibold">Main Nav</h3>
      </Title>
      <section className="sgds-section">
        <h4 className="has-text-primary">
        The main nav is a standard navigation component that must be present in all pages of '.gov.sg' websites.
        </h4>

        <hr className="margin--bottom--lg margin--top--lg"></hr>

        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Standard Main Navigation Bar
        </h5>
        <div className="row is-multiline">
          <div className="col">
          <MainNav
          brand={mainNavItems.brand}
          links={mainNavItems.links}
          selectItem={setSelectedItem}
        />
        <p className="padding--top">Selected Item: {selectedItem}</p>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>
          </div>
        </div>
        <hr className="margin--bottom--lg margin--top--lg"></hr>
        <h5 className="has-text-primary has-text-weight-semibold margin--bottom">
          Main Navigation with Search
        </h5>
        <div className="row is-multiline">
          <div className="col">
            <MainNav
            brand={mainNavItems.brand}
            links={mainNavItems.links}
            displaySearch={true}
            searchChangeHandler={(event)=>console.log(event.target.value)}
            searchClickHandler={(inp)=>console.log("clicked")}
          />
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default MainNavStories;
