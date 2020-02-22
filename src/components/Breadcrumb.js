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
    let className = `sgds-breadcrumb ${this.props.className || ""}`;
    if (this.props.hasBackgroundDark) {
      className = className.concat(" has-background-dark");
    }
    return className;
  }

  render() {
    return (
      <nav className={this.getNavClassName()} aria-label="breadcrumbs">
        <ul>
          {this.props.items.length > 0
            ? this.props.items.map((value, index) => {
                return (
                  <li key={index}>
                    <a
                      style={
                        this.props.infoColor
                          ? { color: this.props.infoColor }
                          : {}
                      }
                      className={
                        this.props.hasTextWhite ? "has-text-white" : null
                      }
                      href={value.link}
                    >
                      {value.text}
                    </a>
                  </li>
                );
              })
            : React.Children.map(this.props.children, (child, index) => {
                return React.cloneElement(child, {
                  hasTextWhite: this.props.hasTextWhite
                });
              })}
        </ul>
      </nav>
    );
  }
}

export function BreadcrumbItem(props) {
  return (
    <li>
      <a
        className={props.hasTextWhite ? "has-text-white" : ""}
        onClick={props.onClick}
        href={props.href}
      >
        {props.children}
      </a>
    </li>
  );
}

Breadcrumb.defaultProps = {
  items: []
};

export default Breadcrumb;
