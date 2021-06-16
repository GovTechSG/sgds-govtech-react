/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.state = {
      selected: null,
      show: false,
      searchQuery: ""
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  toggleDropdown() {
    this.setState({
      show: !this.state.show
    });
  }

  openDropdown() {
    this.setState({
      show: true
    });
  }

  closeDropdown() {
    this.setState({
      show: false
    });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show: false
      });
    }
  }

  handleSearchQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  selectDropdown(name) {
    this.setState({ show: false, selected: name }, () =>
      this.props.selectItem(name)
    );
  }

  handleSearchButton() {
    this.props.clickSearchButton(this.state.searchQuery);
  }

  renderDropdown() {
    if (this.props.showDropdown && !this.props.isHoverable) {
      return (
        <div
          className={
            "sgds-dropdown is-fullwidth is-menu-centered" +
            // (this.props.isHoverable ? " is-hoverable" : "") +
            (this.state.show ? " is-active" : "")
          }
        >
          <div className="sgds-dropdown-trigger">
            <button
              className="sgds-button is-white is-medium is-outlined"
              aria-haspopup="true"
              aria-controls="sgds-dropdown-menu"
              onClick={() => this.openDropdown()}
            >
              <span>
                <b>
                  {this.state.selected
                    ? this.state.selected
                    : this.props.dropdownTitle}
                </b>
              </span>
              <span className="icon">
                <span className="sgds-icon sgds-icon-chevron-down"></span>
              </span>
            </button>
          </div>
          {this.props.dropdownItems ? (
            <div
              className="sgds-dropdown-menu"
              role="menu"
              ref={this.setWrapperRef}
            >
              <div className="sgds-dropdown-content">
                {this.props.dropdownItems.map((item, index) => {
                  return (
                    <a
                      href="#"
                      key={index}
                      className="sgds-dropdown-item"
                      onClick={() => this.selectDropdown(item)}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (this.props.showDropdown && this.props.isHoverable) {
      return (
        <div
          className={
            "sgds-dropdown is-fullwidth is-menu-centered" +
            (this.state.show ? " is-active" : "")
          }
        >
          <div className="sgds-dropdown-trigger">
            <button
              className="sgds-button is-white is-medium is-outlined"
              aria-haspopup="true"
              aria-controls="sgds-dropdown-menu"
              onMouseEnter={() => this.openDropdown()}
            >
              <span>
                <b>
                  {this.state.selected
                    ? this.state.selected
                    : this.props.dropdownTitle}
                </b>
              </span>
              <span className="icon">
                <span className="sgds-icon sgds-icon-chevron-down"></span>
              </span>
            </button>
          </div>
          {this.props.dropdownItems && this.state.show ? (
            <div
              className="sgds-dropdown-menu"
              role="menu"
              onMouseLeave={() => this.closeDropdown()}
            >
              <div className="sgds-dropdown-content">
                {this.props.dropdownItems.map((item, index) => {
                  return (
                    <a
                      href="#"
                      key={index}
                      className="sgds-dropdown-item"
                      onClick={() => this.selectDropdown(item)}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <section
        className={
          "sgds-hero" + (this.props.color ? "" : " has-background-primary")
        }
        style={{ backgroundColor: this.props.color }}
      >
        <div className="sgds-hero-body sgds-container">
          <div className="row is-vcentered">
            {this.props.showSearch ? (
              <div className="col is-8 is-offset-2 has-text-white has-text-centered">
                <h1 className="display">{this.props.title}</h1>
                <h5 className="is-hidden-mobile margin--top--lg margin--bottom--lg">
                  {this.props.subtitle}
                </h5>
                <div className="field has-addons">
                  <div className="control  is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="Find a repository"
                      value={this.state.searchQuery}
                      onChange={this.handleSearchQuery}
                    />
                  </div>
                  <div className="control">
                    <a
                      className="sgds-button is-white is-outlined"
                      onClick={() => this.handleSearchButton()}
                    >
                      {this.props.searchButtonText
                        ? this.props.searchButtonText
                        : "Search"}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col is-8 is-offset-2 has-text-white has-text-centered">
                <h1 className="display">{this.props.title}</h1>
                <h5 className="is-hidden-mobile margin--top--lg margin--bottom--lg">
                  {this.props.subtitle}
                </h5>
                {this.props.children}
                {this.renderDropdown()}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

Hero.propTypes = {
  color: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showSearch: PropTypes.bool
};

export default Hero;
