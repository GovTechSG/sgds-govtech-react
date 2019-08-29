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

  getSize(){
     let size = "";
    if (this.props.buttonSize === "small") {
      size = " is-small";
    } else if (this.props.buttonSize === "medium") {
      size = " is-medium";
    } else if (this.props.buttonSize === "large") {
      size = " is-large";
    }
    return size
  }

  getColorType(){
    if(this.props.colorType==='success'){
      return ' is-success'
    }
    if(this.props.colorType==='warning'){
      return ' is-warning'
    }
      
    if(this.props.colorType==='danger'){
      return ' is-danger'
    }

    if(this.props.colorType==='info'){
      return ' is-info'
    }
    return ''
  }
  // isPrimary, isOutlined, isRounded, disabled, buttonSize
  getClassName() {
    let className =  this.props.isSecondary?"sgds-sec-button":"sgds-button";
    if (this.props.isPrimary) {
      className = className.concat(" is-primary");
    }
    if (this.props.isOutlined) {
      className = className.concat(" is-outlined");
    }
    if (this.props.isRounded) {
      className = className.concat(" is-rounded");
    }
    if(this.props.isLoading){
      className = className.concat(" is-loading");
    }
    className = className.concat(this.getSize());
    className = className.concat(this.getColorType());

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
  isLoading: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isOutlined: PropTypes.bool,
  isRounded: PropTypes.bool,
  buttonSize: PropTypes.string,
  isDisabled: PropTypes.bool,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  primaryColor: PropTypes.string,
  onClick: PropTypes.func,
  colorType: PropTypes.string
};

Button.defaultProps = {
  onClick() {}
};

export default Button;
