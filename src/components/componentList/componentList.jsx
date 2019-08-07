/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import { connect } from "react-redux";

// Import Elements
import TypographyComponent from "../typographyComponent/typographyComponent";
import TableComponent from "../tableComponent/tableComponent";
import cssPresets from "../../cssPresets/cssPresets";

import {
  MainNav,
  Button,
  Breadcrumb,
  AccordionBar,
  Card,
  Callout,
  Hero
} from "../common";

// Import Redux Store
import {
  updateTableHeadColor,
  updateTableHoverable,
  updateTableFullwidth,
  updateThemePrimaryColor
} from "../../store/actions/index";

class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultButtonText: "Default Button",
      defaultButtonDisabled: false,
      primaryButtonText: "Primary Button",
      primaryButtonDisabled: false
    };
  }
  defaultButtonClicked = () => {
    this.setState({
      defaultButtonText: "Clicked!",
      defaultButtonDisabled: true
    });
    setTimeout(() => {
      this.setState({
        defaultButtonText: "Default Button",
        defaultButtonDisabled: false
      });
    }, 1500);
  };

  primaryButtonClicked = () => {
    this.setState({
      primaryButtonText: "Clicked!",
      primaryButtonDisabled: true
    });
    setTimeout(() => {
      this.setState({
        primaryButtonText: "Default Button",
        primaryButtonDisabled: false
      });
    }, 1500);
  };

  // Export style
  exportStyle = exportcss => {
    var buttonLarge =
      ".button-large \r\n { \r\n\t padding-left: " +
      this.props.buttonLargeHorizontalPadding +
      "px; \r\n\t padding-right: " +
      this.props.buttonLargeHorizontalPadding +
      "px;  \r\n } \r\n";
    var buttonMedium =
      ".button-medium  \r\n { \r\n\t padding-left: " +
      this.props.buttonMediumHorizontalPadding +
      "px; \r\n\t padding-right: " +
      this.props.buttonMediumHorizontalPadding +
      "px; \r\n } \r\n";
    var buttonSmall =
      ".button-small \r\n { \r\n\t padding-left: " +
      this.props.buttonSmallHorizontalPadding +
      "px; \r\n\t padding-right: " +
      this.props.buttonSmallHorizontalPadding +
      "px; \r\n } \r\n";

    // const displayFontsize = this.props.displayFontsize;
    // const smallFontsize = this.props.smallFontsize;
    // const tableHeadColor = this.props.tableHeadColor;
    // const themePrimaryColor = this.props.themePrimaryColor;

    var displayFontSize = "";
    if (
      cssPresets.typographyPresets.displayFontSize !==
      this.props.displayFontsize
    ) {
      displayFontSize =
        "display \r\n { \r\n\t font-size: " +
        this.props.displayFontsize +
        "px; \r\n } \r\n";
    }

    var h1fontSize =
      "h1 \r\n { \r\n\t font-size: " +
      this.props.h1Fontsize +
      "px; \r\n } \r\n";
    var h2fontSize =
      "h2 \r\n { \r\n\t font-size: " +
      this.props.h2Fontsize +
      "px; \r\n } \r\n";
    var h3fontSize =
      "h3 \r\n { \r\n\t font-size: " +
      this.props.h3Fontsize +
      "px; \r\n } \r\n";
    var h4fontSize =
      "h4 \r\n { \r\n\t font-size: " +
      this.props.h4Fontsize +
      "px; \r\n } \r\n";
    var h5fontSize =
      "h5 \r\n { \r\n\t font-size: " +
      this.props.h5Fontsize +
      "px; \r\n } \r\n";
    var h6fontSize =
      "h6 \r\n { \r\n\t font-size: " +
      this.props.h6Fontsize +
      "px; \r\n } \r\n";
    var smallFontsize =
      "small \r\n { \r\n\t font-size: " +
      this.props.smallFontsize +
      "px; \r\n } \r\n";

    var style =
      buttonSmall +
      buttonMedium +
      buttonLarge +
      displayFontSize +
      h1fontSize +
      h2fontSize +
      h3fontSize +
      h4fontSize +
      h5fontSize +
      h6fontSize +
      smallFontsize;

    console.log(style);

    var data = new Blob([style], { type: "text/css" });
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "custom.css");
    tempLink.click();
  };

  remove_first_occurrence(str, searchstr) {
    var index = str.indexOf(searchstr);
    if (index === -1) {
      return str;
    }
    return str.slice(0, index) + str.slice(index + searchstr.length);
  }

  mainNavItems = {
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
        name: "Link3"
      }
    ]
  };

  breadcrumbItems = [
    {
      text: "HOME",
      link: ""
    },
    {
      text: "ITEM1",
      link: ""
    },
    {
      text: "ITEM2",
      link: ""
    }
  ];

  accordionBarItems = [
    {
      title: "accodion bar 1",
      content:
        "You can add is-open className to sgds-accordion-body to show the content on page load"
    },
    {
      title: "accodion bar 2",
      content:
        "You can add is-open className to sgds-accordion-body to show the content on page load"
    },
    {
      title: "accodion bar 2",
      content:
        "You can add is-open className to sgds-accordion-body to show the content on page load"
    }
  ];

  hero = {
    defaultHero: {
      title: "design system",
      subtitle:
        "Unites Singapore Government Digital Services around a common UI language and user experience"
    },
    withDropdown: {
      title: "design system",
      subtitle:
        "Unites Singapore Government Digital Services around a common UI language and user experience",
      dropdown: {
        dropdownText: "Click Here",
        dropdownList: [
          "Dropdown item",
          "Other dropdown item",
          "Active dropdown item",
          "Other dropdown item"
        ]
      },
      hover: {
        dropdownText: "Hoverable Dropdown",
        dropdownList: [
          "Dropdown item",
          "Other dropdown item",
          "Active dropdown item",
          "Other dropdown item"
        ]
      }
    }
  };

  cardItems = {
    cardTitle: "Card Title",
    carSubTitle: "Card Sub-title",
    button1: {
      text: "Button1",
      link: ""
    },
    button2: {
      text: "Button2",
      link: ""
    }
  };

  callout = {
    title: "Note:",
    excerpt: ["Excerpt 1", "Excerpt 2", "Excerpt 3", "Excerpt 4", "Excerpt 5"]
  };

  selectMenuItem = item => {
    console.log(item);
  };

  render() {
    const tableHeadColor = this.props.tableHeadColor;
    const themePrimaryColor = this.props.themePrimaryColor;
    const styles = {
      backgroundColor: "#f1f1f1",
      "&:hover": {
        backgroundColor: "#000"
      }
    };
    return (
      <div className="componentList content">
        <div className="elementTitle">Buttons</div>
        <div className="button-row">
          <Button
            onClick={this.defaultButtonClicked}
            isDisabled={this.state.defaultButtonDisabled}
          >
            {this.state.defaultButtonText}
          </Button>
          <Button
            isPrimary={true}
            onClick={this.primaryButtonClicked}
            themePrimaryColor={themePrimaryColor}
            isDisabled={this.state.primaryButtonDisabled}
          >
            {this.state.primaryButtonText}
          </Button>
        </div>
        <div className="button-row">
          <Button
            isPrimary={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isOutlined={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isRounded={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isDisabled={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          >
            button
          </Button>
        </div>
        <div className="button-row">
          <Button
            isPrimary={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isOutlined={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isRounded={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isDisabled={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          >
            button
          </Button>
        </div>
        <div className="button-row">
          <Button
            isPrimary={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isOutlined={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isRounded={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          >
            button
          </Button>
          <Button
            isPrimary={true}
            isDisabled={true}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          >
            button
          </Button>
        </div>
        <div className="elementTitle">Navigation Bar</div>
        <MainNav
          themePrimaryColor={themePrimaryColor}
          brand={this.mainNavItems.brand}
          links={this.mainNavItems.links}
          selectItem={this.selectMenuItem}
          isFluid={true}
          displaySeardh={true}
        />
        <div className="elementTitle">Typography</div>
        <TypographyComponent />
        <div className="elementTitle">Tables{this.props.tableIsNarrow}</div>
        <TableComponent
          tableBackgroundColor={tableHeadColor}
          isFullwidth={this.props.tableIsFullwidth}
          isHoverable={this.props.tableIsHoverable}
          isNarrow={this.props.tableIsNarrow}
        />
        <div className="elementTitle">Breadcrumb</div>
        <Breadcrumb
          hasBackgroundDark={false}
          hasTextWhite={false}
          items={this.breadcrumbItems}
        />
        <Breadcrumb
          hasBackgroundDark={true}
          hasTextWhite={true}
          items={this.breadcrumbItems}
        />
        <div className="elementTitle">Accordion Bar</div>
        <AccordionBar items={this.accordionBarItems} />
        <div className="elementTitle">Card</div>
        <Card card={this.cardItems} />
        <div className="elementTitle">Callout</div>
        <Callout callout={this.callout} />
        <Hero
          themePrimaryColor={themePrimaryColor}
          title={this.hero.defaultHero.title}
          subtitle={this.hero.defaultHero.subtitle}
        />
        <div className="row">
          <div className="sgds-button sgds-button is-rounded is-primary is-large">
            <button onClick={this.exportStyle}>Export</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    themePrimaryColor: state.cssProperties.themePrimaryColor,
    themeSecondaryColor: state.cssProperties.themeSecondaryColor,
    infoColor: state.cssProperties.infoColor,
    successColor: state.cssProperties.successColor,
    dangerColor: state.cssProperties.dangerColor,
    warningColor: state.cssProperties.warningColor,
    tableHeadColor: state.cssProperties.tableHeadColor,
    tableIsNarrow: state.cssProperties.tableIsNarrow,
    tableIsHoverable: state.cssProperties.tableIsHoverable,
    tableIsFullwidth: state.cssProperties.tableIsFullwidth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTableHeadColor: color => dispatch(updateTableHeadColor(color)),
    updateTableHoverable: isHoverable =>
      dispatch(updateTableHoverable(isHoverable)),
    updateTableFullwidth: isFullWidth =>
      dispatch(updateTableFullwidth(isFullWidth)),
    updateThemePrimaryColor: themePrimaryColor =>
      dispatch(updateThemePrimaryColor(themePrimaryColor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentList);
