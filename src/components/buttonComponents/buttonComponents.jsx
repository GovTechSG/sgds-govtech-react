/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row button-row">
          <div className="">
            <a
              className="sgds-button is-primary is-small"
              style={{
                paddingLeft: this.props.smallPaddingHorizontal,
                paddingRight: this.props.smallPaddingHorizontal,
                paddingTop: this.props.smallPaddingVertical,
                paddingBottom: this.props.smallPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>

          <div className="">
            <a
              className="sgds-button is-outlined is-primary is-small"
              style={{
                paddingLeft: this.props.smallPaddingHorizontal,
                paddingRight: this.props.smallPaddingHorizontal,
                paddingTop: this.props.smallPaddingVertical,
                paddingBottom: this.props.smallPaddingVertical,
                borderColor: this.props.themePrimaryColor,
                backgroundColor: this.props.hovered
                  ? this.props.themePrimaryColor
                  : "transparent",
                color: this.props.hovered
                  ? "#fff"
                  : this.props.themePrimaryColor
              }}
              onMouseEnter={this.props.hoverOn}
              onMouseLeave={this.props.hoverOff}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-rounded is-primary is-small"
              style={{
                paddingLeft: this.props.smallPaddingHorizontal,
                paddingRight: this.props.smallPaddingHorizontal,
                paddingTop: this.props.smallPaddingVertical,
                paddingBottom: this.props.smallPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-primary is-small"
              style={{
                paddingLeft: this.props.smallPaddingHorizontal,
                paddingRight: this.props.smallPaddingHorizontal,
                paddingTop: this.props.smallPaddingVertical,
                paddingBottom: this.props.smallPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
              disabled
            >
              button
            </a>
          </div>
        </div>
        <div className="row button-row">
          <div className="">
            <a
              className="sgds-button is-primary is-medium"
              style={{
                paddingLeft: this.props.mediumPaddingHorizontal,
                paddingRight: this.props.mediumPaddingHorizontal,
                paddingTop: this.props.mediumPaddingVertical,
                paddingBottom: this.props.mediumPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>

          <div className="">
            <a
              className="sgds-button is-outlined is-primary is-medium"
              style={{
                paddingLeft: this.props.mediumPaddingHorizontal,
                paddingRight: this.props.mediumPaddingHorizontal,
                paddingTop: this.props.mediumPaddingVertical,
                paddingBottom: this.props.mediumPaddingVertical,
                borderColor: this.props.themePrimaryColor,
                backgroundColor: this.props.hovered
                  ? this.props.themePrimaryColor
                  : "transparent",
                color: this.props.hovered
                  ? "#fff"
                  : this.props.themePrimaryColor
              }}
              onMouseEnter={this.props.hoverOn}
              onMouseLeave={this.props.hoverOff}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-rounded is-primary is-medium"
              style={{
                paddingLeft: this.props.mediumPaddingHorizontal,
                paddingRight: this.props.mediumPaddingHorizontal,
                paddingTop: this.props.mediumPaddingVertical,
                paddingBottom: this.props.mediumPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-primary is-medium"
              style={{
                paddingLeft: this.props.mediumPaddingHorizontal,
                paddingRight: this.props.mediumPaddingHorizontal,
                paddingTop: this.props.mediumPaddingVertical,
                paddingBottom: this.props.mediumPaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
              disabled
            >
              button
            </a>
          </div>
        </div>
        <div className="row button-row">
          <div className="">
            <a
              className="sgds-button is-primary is-large"
              style={{
                paddingLeft: this.props.largePaddingHorizontal,
                paddingRight: this.props.largePaddingHorizontal,
                paddingTop: this.props.largePaddingVertical,
                paddingBottom: this.props.largePaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>

          <div className="">
            <a
              className="sgds-button is-outlined is-primary is-large"
              style={{
                paddingLeft: this.props.largePaddingHorizontal,
                paddingRight: this.props.largePaddingHorizontal,
                paddingTop: this.props.largePaddingVertical,
                paddingBottom: this.props.largePaddingVertical,
                borderColor: this.props.themePrimaryColor,
                backgroundColor: this.props.hovered
                  ? this.props.themePrimaryColor
                  : "transparent",
                color: this.props.hovered
                  ? "#fff"
                  : this.props.themePrimaryColor
              }}
              onMouseEnter={this.props.hoverOn}
              onMouseLeave={this.props.hoverOff}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-rounded is-primary is-large"
              style={{
                paddingLeft: this.props.largePaddingHorizontal,
                paddingRight: this.props.largePaddingHorizontal,
                paddingTop: this.props.largePaddingVertical,
                paddingBottom: this.props.largePaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
            >
              button
            </a>
          </div>
          <div className="">
            <a
              className="sgds-button sgds-button is-primary is-large"
              style={{
                paddingLeft: this.props.largePaddingHorizontal,
                paddingRight: this.props.largePaddingHorizontal,
                paddingTop: this.props.largePaddingVertical,
                paddingBottom: this.props.largePaddingVertical,
                backgroundColor: this.props.themePrimaryColor
              }}
              disabled
            >
              button
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default ButtonComponent;
