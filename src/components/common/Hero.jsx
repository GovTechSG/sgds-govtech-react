/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Hero extends Component {
  render() {
    return (
      <section
        className={
          "sgds-hero" +
          (this.props.themePrimaryColor ? "" : " has-background-primary")
        }
        style={{ backgroundColor: this.props.themePrimaryColor }}
      >
        <div className="sgds-hero-body sgds-container">
          <div className="row is-vcentered">
            <div className="col is-8 is-offset-2 has-text-white has-text-centered">
              <h1 className="display">
                <b>{this.props.title}</b>
              </h1>
              <h5 className="is-hidden-mobile margin--top--lg  margin--bottom--lg">
                {this.props.subtitle}
              </h5>
              <div className="field has-addons">
                <div className="control  is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="Find a repository"
                  />
                </div>
                <div className="control">
                  <a className="sgds-button is-white is-outlined">Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
