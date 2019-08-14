import React, { Component } from "react";
import PropTypes from "prop-types";

class Hero extends Component {
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
            <div className="col is-8 is-offset-2 has-text-white has-text-centered">
              <h1 className="display">{this.props.title}</h1>
              <h5 className="is-hidden-mobile margin--top--lg margin--bottom--lg">
                {this.props.subtitle}
              </h5>
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Hero.propTypes = {
  color: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Hero;
