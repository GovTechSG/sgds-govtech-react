/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  getNavClassName() {
    let className = "sgds-breadcrumb";
    if (this.props.hasBackgroundDark) {
      className = className.concat(" has-background-dark");
    }
    return className;
  }

  render() {
    let items = this.props.items;
    return (
      <nav className={this.getNavClassName()} aria-label="breadcrumbs">
        <ul>
          {items.map((value, index) => {
            return (
              <li key={index}>
                <a
                  className={this.props.hasTextWhite ? "has-text-white" : null}
                  href={value.link}
                >
                  {value.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Breadcrumb;
