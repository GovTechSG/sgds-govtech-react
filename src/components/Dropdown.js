import React, { Component } from "react";
import PropTypes from "prop-types";

class Dropdown extends Component {
  state = {
    showDropdown: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.hideDropdownOnClick);
    document.addEventListener("keydown", this.hideDropdownOnEscape);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideDropdownOnClick);
    document.removeEventListener("keydown", this.hideDropdownOnEscape);
  }

  toggleDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  setContentWrapperRef = node => {
    this.contentWrapperRef = node; // Set directly on 'this' since it won't change/re-render
  };

  hideDropdownOnClick = event => {
    if (
      this.contentWrapperRef &&
      !this.contentWrapperRef.contains(event.target)
    ) {
      this.setState({
        showDropdown: false
      });
    }
  };

  hideDropdownOnEscape = event => {
    if (event.key === "Escape") {
      this.setState({
        showDropdown: false
      });
    }
  };

  render() {
    if (this.props.isHoverable) {
      return (
        <div
          className={`sgds-dropdown ${
            this.state.showDropdown ? "is-active" : ""
          }`}
          onMouseLeave={() => this.setState({ showDropdown: false })}
        >
          <div className="sgds-dropdown-trigger">
            <button
              className="sgds-button"
              aria-haspopup="true"
              aria-controls="sgds-dropdown-menu"
              onMouseEnter={() => this.setState({ showDropdown: true })}
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
          <div className="sgds-dropdown-menu" role="menu">
            <div className="sgds-dropdown-content">{this.props.children}</div>
          </div>
        </div>
      );
    }
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
        <div className="sgds-dropdown-menu" role="menu">
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
  title: PropTypes.string,
  isHoverable: PropTypes.bool
};

export default Dropdown;
