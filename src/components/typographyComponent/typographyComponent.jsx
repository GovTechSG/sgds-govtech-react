/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class TypographyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="typography">
        <h1
          className="display"
          style={{ fontSize: this.props.displayFontsize }}
        >
          display
        </h1>
        <h1 style={{ fontSize: this.props.h1Fontsize }}>h1</h1>
        <h2 style={{ fontSize: this.props.h2Fontsize }}>h2</h2>
        <h3 style={{ fontSize: this.props.h3Fontsize }}>h3</h3>
        <h4 style={{ fontSize: this.props.h4Fontsize }}>h4</h4>
        <h5 style={{ fontSize: this.props.h5Fontsize }}>h5</h5>
        <h6 style={{ fontSize: this.props.h6Fontsize }}>h6</h6>
        <small style={{ fontSize: this.props.smallFontsize }}>small</small>
      </div>
    );
  }
}
export default TypographyComponent;
