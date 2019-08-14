import React, { Component } from "react";
import PropTypes from "prop-types";

class Dropdown extends Component {
  state = {
    showDropdown: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.hideDropdown);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideDropdown);
  }

  toggleDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  setContentWrapperRef = node => {
    this.contentWrapperRef = node; // Set directly on 'this' since it won't change/re-render
  };

  hideDropdown = event => {
    if (
      this.contentWrapperRef &&
      !this.contentWrapperRef.contains(event.target)
    ) {
      this.setState({
        showDropdown: false
      });
    }
  };

  render() {
    return (
      <div
        className={`sgds-dropdown ${
          this.state.showDropdown ? "is-active" : ""
        }`}
        ref={this.setContentWrapperRef}
      >
        <div className="sgds-dropdown-trigger">
          <button
            className="sgds-button"
            aria-haspopup="true"
            aria-controls="sgds-dropdown-menu"
            onClick={this.toggleDropdown}
          >
            <span>{this.props.title}</span>
            <span className="icon">
              <span
                className={`sgds-icon sgds-icon-chevron-${
                  this.state.showDropdown ? "up" : "down"
                }`}
              />
            </span>
          </button>
        </div>
        <div className="sgds-dropdown-menu" id="sgds-dropdown-menu" role="menu">
          <div
            className="sgds-dropdown-content"
            onClick={() => {
              this.setState({ showDropdown: false });
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string
};

export default Dropdown;
