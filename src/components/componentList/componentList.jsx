/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Elements
import TypographyComponent from "../typographyComponent/typographyComponent";
import TableComponent from "../tableComponent/tableComponent";
import cssPresets from "../../cssPresets/cssPresets";

import { MainNav, Button, Breadcrumb, AccordionBar, Card, Callout } from "../common";

// Import Redux Store
import {
  updateSmallButtonHorizontalPadding,
  updateSmallButtonVerticalPadding,
  updateMediumButtonHorizontalPadding,
  updateMediumButtonVerticalPadding,
  updateLargeButtonHorizontalPadding,
  updateLargeButtonVerticalPadding,
  updateDisplayFontsize,
  updateH1Fontsize,
  updateH2Fontsize,
  updateH3Fontsize,
  updateH4Fontsize,
  updateH5Fontsize,
  updateH6Fontsize,
  updateSmallFontsize,
  updateTableHeadColor,
  updateTableHoverable,
  updateTableFullwidth,
  updateThemePrimaryColor
} from "../../store/actions/index";

class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
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
    if (cssPresets.typographyPresets.displayFontSize !== this.props.displayFontsize) {
      displayFontSize =
        "display \r\n { \r\n\t font-size: " + this.props.displayFontsize + "px; \r\n } \r\n";
    }

    var h1fontSize = "h1 \r\n { \r\n\t font-size: " + this.props.h1Fontsize + "px; \r\n } \r\n";
    var h2fontSize = "h2 \r\n { \r\n\t font-size: " + this.props.h2Fontsize + "px; \r\n } \r\n";
    var h3fontSize = "h3 \r\n { \r\n\t font-size: " + this.props.h3Fontsize + "px; \r\n } \r\n";
    var h4fontSize = "h4 \r\n { \r\n\t font-size: " + this.props.h4Fontsize + "px; \r\n } \r\n";
    var h5fontSize = "h5 \r\n { \r\n\t font-size: " + this.props.h5Fontsize + "px; \r\n } \r\n";
    var h6fontSize = "h6 \r\n { \r\n\t font-size: " + this.props.h6Fontsize + "px; \r\n } \r\n";
    var smallFontsize =
      "small \r\n { \r\n\t font-size: " + this.props.smallFontsize + "px; \r\n } \r\n";

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
          content: "You can put short paragraph of information here to describe about this section."
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

  // Handle button hovered
  hoverOn() {
    this.setState({
      hover: true
    });
  }

  hoverOff() {
    this.setState({
      hover: false
    });
  }

  render() {
    const smBtnPaddingHorizontal = this.props.buttonSmallHorizontalPadding;
    const smBtnPaddingVertical = this.props.buttonSmallVerticalPadding;
    const meBtnPaddingHorizontal = this.props.buttonMediumHorizontalPadding;
    const meBtnPaddingVertical = this.props.buttonMediumVerticalPadding;
    const laBtnPaddingHorizontal = this.props.buttonLargeHorizontalPadding;
    const laBtnPaddingVertical = this.props.buttonLargeVerticalPadding;
    const displayFontsize = this.props.displayFontsize;
    const h1Fontsize = this.props.h1Fontsize;
    const h2Fontsize = this.props.h2Fontsize;
    const h3Fontsize = this.props.h3Fontsize;
    const h4Fontsize = this.props.h4Fontsize;
    const h5Fontsize = this.props.h5Fontsize;
    const h6Fontsize = this.props.h6Fontsize;
    const smallFontsize = this.props.smallFontsize;
    const tableHeadColor = this.props.tableHeadColor;
    const themePrimaryColor = this.props.themePrimaryColor;
    return (
      <div className="componentList content">
        <div className="elementTitle">Buttons</div>
        <div className="button-row">
          <Button
            isPrimary={true}
            paddingHorizontal={smBtnPaddingHorizontal}
            paddingVertical={smBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          />
          <Button
            isPrimary={true}
            isOutlined={true}
            paddingHorizontal={smBtnPaddingHorizontal}
            paddingVertical={smBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          />
          <Button
            isPrimary={true}
            isRounded={true}
            paddingHorizontal={smBtnPaddingHorizontal}
            paddingVertical={smBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          />
          <Button
            isPrimary={true}
            isDisabled={true}
            paddingHorizontal={smBtnPaddingHorizontal}
            paddingVertical={smBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="small"
          />
        </div>
        <div className="button-row">
          <Button
            isPrimary={true}
            paddingHorizontal={meBtnPaddingHorizontal}
            paddingVertical={meBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          />
          <Button
            isPrimary={true}
            isOutlined={true}
            paddingHorizontal={meBtnPaddingHorizontal}
            paddingVertical={meBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          />
          <Button
            isPrimary={true}
            isRounded={true}
            paddingHorizontal={meBtnPaddingHorizontal}
            paddingVertical={meBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          />
          <Button
            isPrimary={true}
            isDisabled={true}
            paddingHorizontal={meBtnPaddingHorizontal}
            paddingVertical={meBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="medium"
          />
        </div>
        <div className="button-row">
          <Button
            isPrimary={true}
            paddingHorizontal={laBtnPaddingHorizontal}
            paddingVertical={laBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          />
          <Button
            isPrimary={true}
            isOutlined={true}
            paddingHorizontal={laBtnPaddingHorizontal}
            paddingVertical={laBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          />
          <Button
            isPrimary={true}
            isRounded={true}
            paddingHorizontal={laBtnPaddingHorizontal}
            paddingVertical={laBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          />
          <Button
            isPrimary={true}
            isDisabled={true}
            paddingHorizontal={laBtnPaddingHorizontal}
            paddingVertical={laBtnPaddingVertical}
            themePrimaryColor={themePrimaryColor}
            buttonSize="large"
          />
        </div>
        <div className="elementTitle">Navigation Bar</div>
        <MainNav brand={this.mainNavItems.brand} links={this.mainNavItems.links} />
        <div className="elementTitle">Typography</div>
        <TypographyComponent
          displayFontsize={displayFontsize}
          h1Fontsize={h1Fontsize}
          h2Fontsize={h2Fontsize}
          h3Fontsize={h3Fontsize}
          h4Fontsize={h4Fontsize}
          h5Fontsize={h5Fontsize}
          h6Fontsize={h6Fontsize}
          smallFontsize={smallFontsize}
        />
        <div className="elementTitle">Tables{this.props.tableIsNarrow}</div>
        <TableComponent
          tableBackgroundColor={tableHeadColor}
          isFullwidth={this.props.tableIsFullwidth}
          isHoverable={this.props.tableIsHoverable}
          isNarrow={this.props.tableIsNarrow}
        />
        <div className="elementTitle">Breadcrumb</div>
        <Breadcrumb hasBackgroundDark={false} hasTextWhite={false} items={this.breadcrumbItems} />
        <Breadcrumb hasBackgroundDark={true} hasTextWhite={true} items={this.breadcrumbItems} />
        <div className="elementTitle">Accordion Bar</div>
        <AccordionBar items={this.accordionBarItems} />
        <div className="elementTitle">Card</div>
        <Card card={this.cardItems} />
        <div className="elementTitle">Callout</div>
        <Callout callout={this.callout} />
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
    buttonSmallHorizontalPadding: state.cssProperties.buttonSmallHorizontalPadding,
    buttonSmallVerticalPadding: state.cssProperties.buttonSmallVerticalPadding,
    buttonMediumHorizontalPadding: state.cssProperties.buttonMediumHorizontalPadding,
    buttonMediumVerticalPadding: state.cssProperties.buttonMediumVerticalPadding,
    buttonLargeHorizontalPadding: state.cssProperties.buttonLargeHorizontalPadding,
    buttonLargeVerticalPadding: state.cssProperties.buttonLargeVerticalPadding,
    displayFontsize: state.cssProperties.displayFontsize,
    h1Fontsize: state.cssProperties.h1Fontsize,
    h2Fontsize: state.cssProperties.h2Fontsize,
    h3Fontsize: state.cssProperties.h3Fontsize,
    h4Fontsize: state.cssProperties.h4Fontsize,
    h5Fontsize: state.cssProperties.h5Fontsize,
    h6Fontsize: state.cssProperties.h6Fontsize,
    smallFontsize: state.cssProperties.smallFontsize,
    tableHeadColor: state.cssProperties.tableHeadColor,
    tableIsNarrow: state.cssProperties.tableIsNarrow,
    tableIsHoverable: state.cssProperties.tableIsHoverable,
    tableIsFullwidth: state.cssProperties.tableIsFullwidth,
    themePrimaryColor: state.cssProperties.themePrimaryColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSmallButtonHorizontalPadding: smButtonHorizontalPadding =>
      dispatch(updateSmallButtonHorizontalPadding(smButtonHorizontalPadding)),
    updateSmallButtonVerticalPadding: smButtonVerticalPadding =>
      dispatch(updateSmallButtonVerticalPadding(smButtonVerticalPadding)),
    updateMediumButtonHorizontalPadding: meButtonHorizontalPadding =>
      dispatch(updateMediumButtonHorizontalPadding(meButtonHorizontalPadding)),
    updateMediumButtonVerticalPadding: meButtonVerticalPadding =>
      dispatch(updateMediumButtonVerticalPadding(meButtonVerticalPadding)),
    updateLargeButtonHorizontalPadding: laButtonHorizontalPadding =>
      dispatch(updateLargeButtonHorizontalPadding(laButtonHorizontalPadding)),
    updateLargeButtonVerticalPadding: laButtonVerticalPadding =>
      dispatch(updateLargeButtonVerticalPadding(laButtonVerticalPadding)),
    updateDisplayFontsize: displayFontsize => dispatch(updateDisplayFontsize(displayFontsize)),
    updateH1Fontsize: h1Fontsize => dispatch(updateH1Fontsize(h1Fontsize)),
    updateH2Fontsize: h2Fontsize => dispatch(updateH2Fontsize(h2Fontsize)),
    updateH3Fontsize: h3Fontsize => dispatch(updateH3Fontsize(h3Fontsize)),
    updateH4Fontsize: h4Fontsize => dispatch(updateH4Fontsize(h4Fontsize)),
    updateH5Fontsize: h5Fontsize => dispatch(updateH5Fontsize(h5Fontsize)),
    updateH6Fontsize: h6Fontsize => dispatch(updateH6Fontsize(h6Fontsize)),
    updateSmallFontsize: smallFontsize => dispatch(updateSmallFontsize(smallFontsize)),
    updateTableHeadColor: color => dispatch(updateTableHeadColor(color)),
    updateTableHoverable: isHoverable => dispatch(updateTableHoverable(isHoverable)),
    updateTableFullwidth: isFullWidth => dispatch(updateTableFullwidth(isFullWidth)),
    updateThemePrimaryColor: themePrimaryColor =>
      dispatch(updateThemePrimaryColor(themePrimaryColor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentList);
