/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Fotter extends Component {
  state = {};

  render() {
    return (
      <footer className="sgds-footer top-section">
        <div className="sgds-container is-fluid">
          <div className="row">
            <div className="col header">
              <h5 className="sub-header has-text-white">
                <b>Design System</b>
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col is-right-desktop-only">
              <ul>
                <li className="is-inline-block-desktop-only">
                  <p>
                    <a href="">Contact</a>
                  </p>
                </li>
                <li className="is-inline-block-desktop-only">
                  <p>
                    <a href="">Tell us more</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="row is-vcentered divider">
            <div className="col">
              <ul>
                <li>
                  <a href="">Privacy</a>
                </li>
                <li>
                  <a href="">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div className="col has-text-right-desktop has-text-right-tablet has-text-left-mobile">
              <p> © 2018 Government of Singapore</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Fotter;
