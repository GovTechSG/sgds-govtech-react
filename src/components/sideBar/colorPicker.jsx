/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

// Import Color Picker
import { SketchPicker } from "react-color";
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { showColorPicker: false };
  }
  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }
  hideColorPicker() {
    this.setState({ showColorPicker: false });
  }
  render() {
    const popover = {
      position: "absolute",
      zIndex: "2"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
    return (
      <div className="colorPicker">
        <div>{this.props.colorName}</div>
        <input
          className="col is-11 color"
          type="button"
          value={this.props.inputColor}
          onClick={() => this.toggleColorPicker()}
          readOnly
        />
        <div
          className="color-preview"
          style={{ backgroundColor: this.props.inputColor }}
        />
        {this.state.showColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={() => this.hideColorPicker()} />
            <SketchPicker
              color={this.props.inputColor}
              onChangeComplete={this.props.changeColor}
              disableAlpha={true}
              presetColors={[]}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default ColorPicker;
