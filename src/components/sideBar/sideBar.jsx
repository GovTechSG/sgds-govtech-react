/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Presets
import cssPresets from "../../cssPresets/cssPresets";
import elementList from "../../elementList/elementList";

// Import Elements
import ColorPicker from "./colorPicker";
// Import Color Picker
// import { SketchPicker } from "react-color";

import { debounce } from "throttle-debounce";

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
  updateTableNarrow,
  updateThemePrimaryColor
} from "../../store/actions/index";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    const debounceTime = 500;
    this.state = {
      showElement: elementList[0],
      // Buttons
      smallButtonPaddingHorizontal:
        cssPresets.buttonPresets.smPaddingHorizontalDefault,
      smallButtonPaddingVertical:
        cssPresets.buttonPresets.smPaddingVerticalDefault,
      mediumButtonPaddingHorizontal:
        cssPresets.buttonPresets.mePaddingHorizontalDefault,
      mediumButtonPaddingVertical:
        cssPresets.buttonPresets.mePaddingVerticalDefault,
      largeButtonPaddingHorizontal:
        cssPresets.buttonPresets.laPaddingHorizontalDefault,
      largeButtonPaddingVertical:
        cssPresets.buttonPresets.laPaddingVerticalDefault,
      // Typographys
      displayFontsize: cssPresets.typographyPresets.displayFontsizeDefault,
      h1Fontsize: cssPresets.typographyPresets.h1FontsizeDefault,
      h2Fontsize: cssPresets.typographyPresets.h2FontsizeDefault,
      h3Fontsize: cssPresets.typographyPresets.h3FontsizeDefault,
      h4Fontsize: cssPresets.typographyPresets.h4FontsizeDefault,
      h5Fontsize: cssPresets.typographyPresets.h5FontsizeDefault,
      h6Fontsize: cssPresets.typographyPresets.h6FontsizeDefault,
      smallFontsize: cssPresets.typographyPresets.smallFontsizeDefault,
      // Tables
      tableHeadColor: cssPresets.tablePresets.tableHeadColor,
      tableIsNarrow: cssPresets.tablePresets.tableIsNarrow,
      tableIsHoverable: cssPresets.tablePresets.tableIsHoverable,
      tableIsFullwidth: cssPresets.tablePresets.tableIsFullwidth
    };
    this.setDebounced(debounceTime);
  }

  // Set Debounced
  setDebounced = debounceTime => {
    this.setSmallButtonHorizontalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateSmallButtonHorizontalPadding
    );
    this.setSmallButtonVerticalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateSmallButtonVerticalPadding
    );
    this.setMediumButtonHorizontalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateMediumButtonHorizontalPadding
    );
    this.setMediumButtonVerticalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateMediumButtonVerticalPadding
    );
    this.setLargeButtonHorizontalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateLargeButtonHorizontalPadding
    );
    this.setLargeButtonVerticalPaddingDebounced = debounce(
      debounceTime,
      this.props.updateLargeButtonVerticalPadding
    );
    this.setDisplayFontsizeDebounced = debounce(
      debounceTime,
      this.props.updateDisplayFontsize
    );
    this.setH1FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH1Fontsize
    );
    this.setH2FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH2Fontsize
    );
    this.setH3FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH3Fontsize
    );
    this.setH4FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH4Fontsize
    );
    this.setH5FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH5Fontsize
    );
    this.setH6FontsizeDebounced = debounce(
      debounceTime,
      this.props.updateH6Fontsize
    );
    this.setSmallFontsizeDebounced = debounce(
      debounceTime,
      this.props.updateSmallFontsize
    );
  };

  // Handle Properties Changes
  handleSmallButtonHorizontalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          smallButtonPaddingHorizontal: padding
        },
        this.setSmallButtonHorizontalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        smallButtonPaddingHorizontal: "Please enter a valid value."
      });
    }
  };

  handleSmallButtonVerticalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          smallButtonPaddingVertical: padding
        },
        this.setSmallButtonVerticalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        smallButtonPaddingVertical: "Please enter a valid value."
      });
    }
  };

  handleMediumButtonHorizontalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          mediumButtonPaddingHorizontal: padding
        },
        this.setMediumButtonHorizontalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        mediumButtonPaddingHorizontal: "Please enter a valid value."
      });
    }
  };

  handleMediumButtonVerticalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          mediumButtonPaddingVertical: padding
        },
        this.setMediumButtonVerticalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        mediumButtonPaddingVertical: "Please enter a valid value."
      });
    }
  };

  handleLargeButtonHorizontalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          largeButtonPaddingHorizontal: padding
        },
        this.setLargeButtonHorizontalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        largeButtonPaddingHorizontal: "Please enter a valid value."
      });
    }
  };

  handleLargeButtonVerticalPaddingUpdate = event => {
    const padding = event.target.value;
    if (padding && !isNaN(padding)) {
      this.setState(
        {
          largeButtonPaddingVertical: padding
        },
        this.setLargeButtonVerticalPaddingDebounced(Number(padding))
      );
    } else {
      this.setState({
        largeButtonPaddingVertical: "Please enter a valid value."
      });
    }
  };

  handleDisplayFontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          displayFontsize: fontsize
        },
        this.setDisplayFontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        displayFontsize: "Please enter a valid value."
      });
    }
  };

  handleH1FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h1Fontsize: fontsize
        },
        this.setH1FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h1Fontsize: "Please enter a valid value."
      });
    }
  };

  handleH2FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h2Fontsize: fontsize
        },
        this.setH2FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h2Fontsize: "Please enter a valid value."
      });
    }
  };

  handleH3FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h3Fontsize: fontsize
        },
        this.setH3FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h3Fontsize: "Please enter a valid value."
      });
    }
  };

  handleH4FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h4Fontsize: fontsize
        },
        this.setH4FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h4Fontsize: "Please enter a valid value."
      });
    }
  };

  handleH5FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h5Fontsize: fontsize
        },
        this.setH5FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h5Fontsize: "Please enter a valid value."
      });
    }
  };

  handleH6FontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          h6Fontsize: fontsize
        },
        this.setH6FontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        h6Fontsize: "Please enter a valid value."
      });
    }
  };

  handleSmallFontsizeUpdate = event => {
    const fontsize = event.target.value;
    if (fontsize && !isNaN(fontsize)) {
      this.setState(
        {
          smallFontsize: fontsize
        },
        this.setSmallFontsizeDebounced(Number(fontsize))
      );
    } else {
      this.setState({
        smallFontsize: "Please enter a valid value."
      });
    }
  };

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

  // Render Reset Buttons
  renderSetSmallBtnHorizontalPaddingDefault = () => {
    if (
      Number(this.state.smallButtonPaddingHorizontal) !==
      cssPresets.buttonPresets.smPaddingHorizontalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetSmallBtnHorizontalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetSmallBtnVerticalPaddingDefault = () => {
    if (
      Number(this.state.smallButtonPaddingVertical) !==
      cssPresets.buttonPresets.smPaddingVerticalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetSmallBtnVerticalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetMediumBtnHorizontalPaddingDefault = () => {
    if (
      Number(this.state.mediumButtonPaddingHorizontal) !==
      cssPresets.buttonPresets.mePaddingHorizontalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetMediumBtnHorizontalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetMediumBtnVerticalPaddingDefault = () => {
    if (
      Number(this.state.mediumButtonPaddingVertical) !==
      cssPresets.buttonPresets.mePaddingVerticalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetMediumBtnVerticalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetLargeBtnHorizontalPaddingDefault = () => {
    if (
      Number(this.state.largeButtonPaddingHorizontal) !==
      cssPresets.buttonPresets.laPaddingHorizontalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetLargeBtnHorizontalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetLargeBtnVerticalPaddingDefault = () => {
    if (
      Number(this.state.largeButtonPaddingVertical) !==
      cssPresets.buttonPresets.laPaddingVerticalDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetLargeBtnVerticalPaddingDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetDisplayFontsizeDefault = () => {
    if (
      Number(this.state.displayFontsize) !==
      cssPresets.typographyPresets.displayFontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetDisplayFontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH1FontsizeDefault = () => {
    if (
      Number(this.state.h1Fontsize) !==
      cssPresets.typographyPresets.h1FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH1FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH2FontsizeDefault = () => {
    if (
      Number(this.state.h2Fontsize) !==
      cssPresets.typographyPresets.h2FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH2FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH3FontsizeDefault = () => {
    if (
      Number(this.state.h3Fontsize) !==
      cssPresets.typographyPresets.h3FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH3FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH4FontsizeDefault = () => {
    if (
      Number(this.state.h4Fontsize) !==
      cssPresets.typographyPresets.h4FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH4FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH5FontsizeDefault = () => {
    if (
      Number(this.state.h5Fontsize) !==
      cssPresets.typographyPresets.h5FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH5FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetH6FontsizeDefault = () => {
    if (
      Number(this.state.h6Fontsize) !==
      cssPresets.typographyPresets.h6FontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetH6FontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
    }
  };

  renderSetSmallFontsizeDefault = () => {
    if (
      Number(this.state.smallFontsize) !==
      cssPresets.typographyPresets.smallFontsizeDefault
    ) {
      return (
        <div
          className="col is-12 resetBtn"
          onClick={() => this.resetSmallFontsizeDefault()}
        >
          <a>Reset to default</a>
        </div>
      );
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

  // Reset Properties to Default
  resetSmallBtnHorizontalPaddingDefault = () => {
    this.setState(
      {
        smallButtonPaddingHorizontal:
          cssPresets.buttonPresets.smPaddingHorizontalDefault
      },
      () =>
        this.props.updateSmallButtonHorizontalPadding(
          cssPresets.buttonPresets.smPaddingHorizontalDefault
        )
    );
  };

  resetSmallBtnVerticalPaddingDefault = () => {
    this.setState(
      {
        smallButtonPaddingVertical:
          cssPresets.buttonPresets.smPaddingVerticalDefault
      },
      () =>
        this.props.updateSmallButtonVerticalPadding(
          cssPresets.buttonPresets.smPaddingVerticalDefault
        )
    );
  };

  resetMediumBtnHorizontalPaddingDefault = () => {
    this.setState(
      {
        mediumButtonPaddingHorizontal:
          cssPresets.buttonPresets.mePaddingHorizontalDefault
      },
      () =>
        this.props.updateMediumButtonHorizontalPadding(
          cssPresets.buttonPresets.mePaddingHorizontalDefault
        )
    );
  };

  resetMediumBtnVerticalPaddingDefault = () => {
    this.setState(
      {
        mediumButtonPaddingVertical:
          cssPresets.buttonPresets.mePaddingVerticalDefault
      },
      () =>
        this.props.updateMediumButtonVerticalPadding(
          cssPresets.buttonPresets.mePaddingVerticalDefault
        )
    );
  };

  resetLargeBtnHorizontalPaddingDefault = () => {
    this.setState(
      {
        largeButtonPaddingHorizontal:
          cssPresets.buttonPresets.laPaddingHorizontalDefault
      },
      () =>
        this.props.updateLargeButtonHorizontalPadding(
          cssPresets.buttonPresets.laPaddingHorizontalDefault
        )
    );
  };

  resetLargeBtnVerticalPaddingDefault = () => {
    this.setState(
      {
        largeButtonPaddingVertical:
          cssPresets.buttonPresets.laPaddingVerticalDefault
      },
      () =>
        this.props.updateLargeButtonVerticalPadding(
          cssPresets.buttonPresets.laPaddingVerticalDefault
        )
    );
  };

  resetDisplayFontsizeDefault = () => {
    this.setState(
      {
        displayFontsize: cssPresets.typographyPresets.displayFontsizeDefault
      },
      () =>
        this.props.updateDisplayFontsize(
          cssPresets.typographyPresets.displayFontsizeDefault
        )
    );
  };

  resetH1FontsizeDefault = () => {
    this.setState(
      {
        h1Fontsize: cssPresets.typographyPresets.h1FontsizeDefault
      },
      () =>
        this.props.updateH1Fontsize(
          cssPresets.typographyPresets.h1FontsizeDefault
        )
    );
  };

  resetH2FontsizeDefault = () => {
    this.setState(
      {
        h2Fontsize: cssPresets.typographyPresets.h2FontsizeDefault
      },
      () =>
        this.props.updateH2Fontsize(
          cssPresets.typographyPresets.h2FontsizeDefault
        )
    );
  };

  resetH3FontsizeDefault = () => {
    this.setState(
      {
        h3Fontsize: cssPresets.typographyPresets.h3FontsizeDefault
      },
      () =>
        this.props.updateH3Fontsize(
          cssPresets.typographyPresets.h3FontsizeDefault
        )
    );
  };

  resetH4FontsizeDefault = () => {
    this.setState(
      {
        h4Fontsize: cssPresets.typographyPresets.h4FontsizeDefault
      },
      () =>
        this.props.updateH4Fontsize(
          cssPresets.typographyPresets.h4FontsizeDefault
        )
    );
  };

  resetH5FontsizeDefault = () => {
    this.setState(
      {
        h5Fontsize: cssPresets.typographyPresets.h5FontsizeDefault
      },
      () =>
        this.props.updateH5Fontsize(
          cssPresets.typographyPresets.h5FontsizeDefault
        )
    );
  };

  resetH6FontsizeDefault = () => {
    this.setState(
      {
        h6Fontsize: cssPresets.typographyPresets.h6FontsizeDefault
      },
      () =>
        this.props.updateH6Fontsize(
          cssPresets.typographyPresets.h6FontsizeDefault
        )
    );
  };

  resetSmallFontsizeDefault = () => {
    this.setState(
      {
        smallFontsize: cssPresets.typographyPresets.smallFontsizeDefault
      },
      () =>
        this.props.updateSmallFontsize(
          cssPresets.typographyPresets.smallFontsizeDefault
        )
    );
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
          {/* <div className="buttonGroup">
            <div className="inputTitle">Font Family</div>
          </div> */}
          {this.renderSetPrimaryColorDefault()}
        </div>
      );
    }
  };

  // Render Button Group
  renderButtonGroup = () => {
    if (this.state.showElement === elementList[1]) {
      return (
        <div className="buttonGroup">
          <div className="col is-12 inputTitle">
            $is-small padding left/right
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.smallButtonPaddingHorizontal}
              onChange={this.handleSmallButtonHorizontalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetSmallBtnHorizontalPaddingDefault()}
          <div className="col is-12 inputTitle">
            $is-small padding top/bottom
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.smallButtonPaddingVertical}
              onChange={this.handleSmallButtonVerticalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetSmallBtnVerticalPaddingDefault()}
          <div className="col is-12 inputTitle">
            $is-medium padding left/right
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.mediumButtonPaddingHorizontal}
              onChange={this.handleMediumButtonHorizontalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetMediumBtnHorizontalPaddingDefault()}
          <div className="col is-12 inputTitle">
            $is-medium padding top/bottom
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.mediumButtonPaddingVertical}
              onChange={this.handleMediumButtonVerticalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetMediumBtnVerticalPaddingDefault()}
          <div className="col is-12 inputTitle">
            $is-large padding left/right
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.largeButtonPaddingHorizontal}
              onChange={this.handleLargeButtonHorizontalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetLargeBtnHorizontalPaddingDefault()}
          <div className="col is-12 inputTitle">
            $is-large padding top/bottom
          </div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.largeButtonPaddingVertical}
              onChange={this.handleLargeButtonVerticalPaddingUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetLargeBtnVerticalPaddingDefault()}
        </div>
      );
    }
  };

  // Render Typography
  renderTypography = () => {
    if (this.state.showElement === elementList[2]) {
      return (
        <div className="buttonGroup">
          <div className="col is-12 inputTitle">$display font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.displayFontsize}
              onChange={this.handleDisplayFontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetDisplayFontsizeDefault()}
          <div className="col is-12 inputTitle">$h1 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h1Fontsize}
              onChange={this.handleH1FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH1FontsizeDefault()}
          <div className="col is-12 inputTitle">$h2 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h2Fontsize}
              onChange={this.handleH2FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH2FontsizeDefault()}
          <div className="col is-12 inputTitle">$h3 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h3Fontsize}
              onChange={this.handleH3FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH3FontsizeDefault()}
          <div className="col is-12 inputTitle">$h4 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h4Fontsize}
              onChange={this.handleH4FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH4FontsizeDefault()}
          <div className="col is-12 inputTitle">$h5 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h5Fontsize}
              onChange={this.handleH5FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH5FontsizeDefault()}
          <div className="col is-12 inputTitle">$h6 font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.h6Fontsize}
              onChange={this.handleH6FontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetH6FontsizeDefault()}
          <div className="col is-12 inputTitle">$small font-size</div>
          <div className="col is-12">
            <input
              className="col is-11 inputField"
              type="text"
              value={this.state.smallFontsize}
              onChange={this.handleSmallFontsizeUpdate}
              name=""
              id=""
            />
          </div>
          {this.renderSetSmallFontsizeDefault()}
        </div>
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
    buttonSmallHorizontalPadding:
      state.cssProperties.buttonSmallHorizontalPadding,
    buttonSmallVerticalPadding: state.cssProperties.buttonSmallVerticalPadding,
    buttonMediumHorizontalPadding:
      state.cssProperties.buttonMediumHorizontalPadding,
    buttonMediumVerticalPadding:
      state.cssProperties.buttonMediumVerticalPadding,
    buttonLargeHorizontalPadding:
      state.cssProperties.buttonLargeHorizontalPadding,
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
    updateDisplayFontsize: fontsize =>
      dispatch(updateDisplayFontsize(fontsize)),
    updateH1Fontsize: fontsize => dispatch(updateH1Fontsize(fontsize)),
    updateH2Fontsize: fontsize => dispatch(updateH2Fontsize(fontsize)),
    updateH3Fontsize: fontsize => dispatch(updateH3Fontsize(fontsize)),
    updateH4Fontsize: fontsize => dispatch(updateH4Fontsize(fontsize)),
    updateH5Fontsize: fontsize => dispatch(updateH5Fontsize(fontsize)),
    updateH6Fontsize: fontsize => dispatch(updateH6Fontsize(fontsize)),
    updateSmallFontsize: fontsize => dispatch(updateSmallFontsize(fontsize)),
    updateTableHeadColor: color => dispatch(updateTableHeadColor(color)),
    updateTableNarrow: isNarrow => dispatch(updateTableNarrow(isNarrow)),
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
)(Sidebar);
