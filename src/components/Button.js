/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      focused: false
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
        borderColor: this.props.primaryColor,
        backgroundColor:
          this.state.hovered || this.state.focused ? this.props.primaryColor : "transparent",
        color: this.state.hovered || this.state.focused ? "#fff" : this.props.primaryColor
      };
    } else {
      return {
        paddingLeft: this.props.paddingHorizontal,
        paddingRight: this.props.paddingHorizontal,
        paddingTop: this.props.paddingVertical,
        paddingBottom: this.props.paddingVertical,
        backgroundColor: this.props.primaryColor
      };
    }
  }

  onClick = () => {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <button
        className={this.getClassName()}
        style={this.getStyle()}
        disabled={this.props.isDisabled}
        onMouseEnter={() =>
          this.setState({
            hovered: true
          })
        }
        onMouseLeave={() =>
          this.setState({
            hovered: false
          })
        }
        onClick={this.onClick}
        onFocus={() => this.setState({ focused: true })}
        onBlur={() => this.setState({ focused: false })}
      >
        {this.props.children}
      </button>
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
  primaryColor: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick() {}
};

export default Button;
