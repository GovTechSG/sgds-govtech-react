import React, { Component } from "react";
import PropTypes from "prop-types";

class Accordion extends Component {
  state = {
    isActive: this.props.initiallyOpen
  };

  isAccordionActive = () => {
    // If isActive is passed by props, override internal state
    if (this.props.hasOwnProperty("isActive")) {
      return this.props.isActive;
    }
    return this.state.isActive;
  };

  onHeaderClick = (event) => {
    event.preventDefault();
    if (!this.props.onHeaderClick) {
      this.setState({ isActive: !this.state.isActive });
      return;
    }
    this.props.onHeaderClick();
  };

  render() {
    return (
      <div className={`sgds-accordion ${this.isAccordionActive() ? "is-open" : ""}`}>
        <a
          href="#!"
          className={`sgds-accordion-header ${this.isAccordionActive() ? "is-active" : ""}`}
          role="button"
          aria-expanded={this.isAccordionActive()}
          onClick={this.onHeaderClick}
        >
          {this.props.header}
          <i
            className={`sgds-icon sgds-icon-chevron-${this.isAccordionActive() ? "up" : "down"}`}
          />
        </a>
        <div className={`sgds-accordion-body`}>{this.props.children}</div>
      </div>
    );
  }
}

Accordion.defaultProps = {
  initiallyOpen: false
};

Accordion.propTypes = {
  header: PropTypes.string,
  initiallyOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onHeaderClick: PropTypes.func
};

export default Accordion;
