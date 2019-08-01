/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Presets
import cssPresets from "../../cssPresets/cssPresets";
import elementList from "../../elementList/elementList";

// Import Elements
import ColorPicker from "./colorPicker";

// Import Redux Store
import {
  updateTableHeadColor,
  updateTableHoverable,
  updateTableFullwidth,
  updateTableNarrow,
  updateThemePrimaryColor
} from "../../store/actions/index";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showElement: elementList[0],
      // Tables
      tableHeadColor: cssPresets.tablePresets.tableHeadColor,
      tableIsNarrow: cssPresets.tablePresets.tableIsNarrow,
      tableIsHoverable: cssPresets.tablePresets.tableIsHoverable,
      tableIsFullwidth: cssPresets.tablePresets.tableIsFullwidth
    };
  }

  handleTableHeadColorUpdate = color => {
    try {
      this.props.updateTableHeadColor(color.hex);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  handleTableIsHoverableUpdate = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        tableIsHoverable: value
      },
      () => this.props.updateTableHoverable(value)
    );
  };

  handleTableIsFullwidthUpdate = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        tableIsFullwidth: value
      },
      () => this.props.updateTableFullwidth(value)
    );
  };

  handleTableIsNarrow = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        tableIsNarrow: value
      },

      () => this.props.updateTableNarrow(value)
    );
  };

  handlePrimaryColorUpdate = color => {
    try {
      this.props.updateThemePrimaryColor(color.hex);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  renderSetPrimaryColorDefault = () => {
    if (this.props.themePrimaryColor !== cssPresets.themePresets.primaryColor) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetPrimaryColorDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetTableHeadColorDefault = () => {
    if (
      this.props.tableHeadColor !==
      cssPresets.tablePresets.tableHeadColorDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetTableHeadColerDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  resetTableHeadColerDefault = () => {
    try {
      this.props.updateTableHeadColor(
        cssPresets.tablePresets.tableHeadColorDefault
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  resetPrimaryColorDefault = () => {
    try {
      this.props.updateThemePrimaryColor(cssPresets.themePresets.primaryColor);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Render Global Picker
  renderGlobalProperties = () => {
    if (this.state.showElement === elementList[0]) {
      return (
        <div className="buttonGroup">
          <ColorPicker
            colorName="Primary Color"
            inputColor={this.props.themePrimaryColor}
            changeColor={this.handlePrimaryColorUpdate}
          />
          {this.renderSetPrimaryColorDefault()}
        </div>
      );
    }
  };

  // Render Button Group
  renderButtonGroup = () => {
    if (this.state.showElement === elementList[1]) {
      return (
        <div />
        // <div className="buttonGroup">
        //   <div className="col is-12 inputTitle">
        //     $is-small padding left/right
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.smallButtonPaddingHorizontal}
        //       onChange={this.handleSmallButtonHorizontalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetSmallBtnHorizontalPaddingDefault()}
        //   <div className="col is-12 inputTitle">
        //     $is-small padding top/bottom
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.smallButtonPaddingVertical}
        //       onChange={this.handleSmallButtonVerticalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetSmallBtnVerticalPaddingDefault()}
        //   <div className="col is-12 inputTitle">
        //     $is-medium padding left/right
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.mediumButtonPaddingHorizontal}
        //       onChange={this.handleMediumButtonHorizontalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetMediumBtnHorizontalPaddingDefault()}
        //   <div className="col is-12 inputTitle">
        //     $is-medium padding top/bottom
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.mediumButtonPaddingVertical}
        //       onChange={this.handleMediumButtonVerticalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetMediumBtnVerticalPaddingDefault()}
        //   <div className="col is-12 inputTitle">
        //     $is-large padding left/right
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.largeButtonPaddingHorizontal}
        //       onChange={this.handleLargeButtonHorizontalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetLargeBtnHorizontalPaddingDefault()}
        //   <div className="col is-12 inputTitle">
        //     $is-large padding top/bottom
        //   </div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.largeButtonPaddingVertical}
        //       onChange={this.handleLargeButtonVerticalPaddingUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetLargeBtnVerticalPaddingDefault()}
        // </div>
      );
    }
  };

  // Render Typography
  renderTypography = () => {
    if (this.state.showElement === elementList[2]) {
      return (
        <div />
        // <div className="buttonGroup">
        //   <div className="col is-12 inputTitle">$display font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.displayFontsize}
        //       onChange={this.handleDisplayFontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetDisplayFontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h1 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h1Fontsize}
        //       onChange={this.handleH1FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH1FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h2 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h2Fontsize}
        //       onChange={this.handleH2FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH2FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h3 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h3Fontsize}
        //       onChange={this.handleH3FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH3FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h4 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h4Fontsize}
        //       onChange={this.handleH4FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH4FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h5 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h5Fontsize}
        //       onChange={this.handleH5FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH5FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$h6 font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.h6Fontsize}
        //       onChange={this.handleH6FontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetH6FontsizeDefault()}
        //   <div className="col is-12 inputTitle">$small font-size</div>
        //   <div className="col is-12">
        //     <input
        //       className="col is-11 inputField"
        //       type="text"
        //       value={this.state.smallFontsize}
        //       onChange={this.handleSmallFontsizeUpdate}
        //       name=""
        //       id=""
        //     />
        //   </div>
        //   {this.renderSetSmallFontsizeDefault()}
        // </div>
      );
    }
  };

  // Render Tables
  renderTables = () => {
    if (this.state.showElement === elementList[3]) {
      return (
        <div className="buttonGroup">
          <ColorPicker
            colorName="Table Head Color"
            inputColor={this.props.tableHeadColor}
            changeColor={this.handleTableHeadColorUpdate}
          />
          {this.renderSetTableHeadColorDefault()}
          <label className="col is-12 inputTitle">
            $is-narrow {this.props.tableHeadColorDefault}
            <input
              name="tableIsNarrow"
              type="checkbox"
              checked={this.state.tableIsNarrow}
              onChange={this.handleTableIsNarrow}
            />
          </label>
          <label className="col is-12 inputTitle">
            $is-hoverable
            <input
              name="tableIsHovrable"
              type="checkbox"
              checked={this.state.tableIsHoverable}
              onChange={this.handleTableIsHoverableUpdate}
            />
          </label>
          <label className="col is-12 inputTitle">
            $is-fullwidth
            <input
              name="tableIsFullwidth"
              type="checkbox"
              checked={this.state.tableIsFullwidth}
              onChange={this.handleTableIsFullwidthUpdate}
            />
          </label>
        </div>
      );
    }
  };

  // Toggle Element
  toggleElement = elementName => {
    this.setState({
      showElement: elementName
    });
  };

  render() {
    const styleProperties = {
      color: "#6037B3",
      fontWeight: "600"
    };
    return (
      <div className="sideBar">
        <div className="elementList">
          <div
            className="listItem"
            style={
              this.state.showElement === elementList[0] ? styleProperties : null
            }
            onClick={() => this.toggleElement(elementList[0])}
          >
            <a>Global Styles</a>
          </div>
          <div
            className="listItem"
            style={
              this.state.showElement === elementList[1] ? styleProperties : null
            }
            onClick={() => this.toggleElement(elementList[1])}
          >
            <a>Buttons</a>
          </div>
          <div
            className="listItem"
            style={
              this.state.showElement === elementList[2] ? styleProperties : null
            }
            onClick={() => this.toggleElement(elementList[2])}
          >
            <a>Typography</a>
          </div>
          <div
            className="listItem"
            style={
              this.state.showElement === elementList[3] ? styleProperties : null
            }
            onClick={() => this.toggleElement(elementList[3])}
          >
            <a>Tables</a>
          </div>
        </div>
        <div className="elements">
          {this.renderGlobalProperties()}
          {this.renderButtonGroup()}
          {this.renderTypography()}
          {this.renderTables()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableHeadColor: state.cssProperties.tableHeadColor,
    tableIsNarrow: state.cssProperties.tableIsNarrow,
    tableIsHoverable: state.cssProperties.tableIsHoverable,
    tableIsFullwidth: state.cssProperties.tableIsFullwidth,
    themePrimaryColor: state.cssProperties.themePrimaryColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateThemePrimaryColor: themePrimaryColor =>
      dispatch(updateThemePrimaryColor(themePrimaryColor)),
    updateTableHeadColor: color => dispatch(updateTableHeadColor(color)),
    updateTableNarrow: isNarrow => dispatch(updateTableNarrow(isNarrow)),
    updateTableHoverable: isHoverable =>
      dispatch(updateTableHoverable(isHoverable)),
    updateTableFullwidth: isFullWidth =>
      dispatch(updateTableFullwidth(isFullWidth))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
