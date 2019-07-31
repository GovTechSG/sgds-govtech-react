import React, { Component } from "react";

class Header extends Component {
  state = {};

  render() {
    return (
      <div className="sgds-masthead">
        <div className="sgds-container">
          <div className="row">
            <div className="col">
              <a
                href="https://www.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sgds-icon sgds-icon-sg-crest" />
                <span className="is-text">
                  A Singapore Government Agency Website
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
