/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class NavigationBar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="sgds-container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="/assets/img/logo_sgds.png" alt="" />
            </a>
            <div className="navbar-burger burger" data-target="mainnav-2">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="mainnav-2" className="navbar-menu">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link is-uppercase is-active">Who we are</a>
              <div className="navbar-dropdown">
                <a className="navbar-item is-active">Sub Link 1</a>
                <a className="navbar-item">Sub Link 2</a>
                <a className="navbar-item">Sub Link 3</a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link is-uppercase">Link 2</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">External Link 1</a>
                <a className="navbar-item">External Link 2</a>
                <a className="navbar-item">External Link 3</a>
              </div>
            </div>
            <div className="navbar-item">
              <a className="navbar-link is-uppercase">External Link 3</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
