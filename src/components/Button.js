/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  // Handle button hovered
  mouseHoverOn() {
    this.setState({
      hovered: true
    });
  }

  mouseHoverOff() {
    this.setState({
      hovered: false
    });
  }

  // isPrimary, isOutlined, isRounded, disabled, buttonSize
  getClassName() {
    let className = "sgds-button";
    if (this.props.isPrimary) {
      className = className.concat(" is-primary");
    }
    if (this.props.isOutlined) {
      className = className.concat(" is-outlined");
    }
    if (this.props.isRounded) {
      className = className.concat(" is-rounded");
    }
    if (this.props.buttonSize === "small") {
      className = className.concat(" is-small");
    } else if (this.props.buttonSize === "medium") {
      className = className.concat(" is-medium");
    } else if (this.props.buttonSize === "large") {
      className = className.concat(" is-large");
    }
    return className;
  }

  getStyle() {
    if (this.props.isOutlined) {
      return {
        paddingLeft: this.props.paddingHorizontal,
        paddingRight: this.props.paddingHorizontal,
        paddingTop: this.props.paddingVertical,
        paddingBottom: this.props.paddingVertical,
        borderColor: this.props.themePrimaryColor,
        backgroundColor: this.state.hovered
          ? this.props.themePrimaryColor
          : "transparent",
        color: this.state.hovered ? "#fff" : this.props.themePrimaryColor
      };
    } else {
      return {
        paddingLeft: this.props.paddingHorizontal,
        paddingRight: this.props.paddingHorizontal,
        paddingTop: this.props.paddingVertical,
        paddingBottom: this.props.paddingVertical,
        backgroundColor: this.props.themePrimaryColor
      };
    }
  }

  onClick = () => {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <a
        className={this.getClassName()}
        style={this.getStyle()}
        disabled={this.props.isDisabled}
        onMouseEnter={() => this.mouseHoverOn()}
        onMouseLeave={() => this.mouseHoverOff()}
        onClick={this.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}

Button.propTypes = {
  isPrimary: PropTypes.bool,
  isOutlined: PropTypes.bool,
  isRounded: PropTypes.bool,
  buttonSize: PropTypes.string,
  isDisabled: PropTypes.bool,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  themePrimaryColor: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick() {}
}

export default Button;
