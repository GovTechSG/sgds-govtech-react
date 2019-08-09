/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Callout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  render() {
    let items = this.props.callout.excerpt;
    return (
      <blockquote>
        <p>
          <b>{this.props.callout.title}</b>
        </p>
        <ul>
          {items.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      </blockquote>
    );
  }
}

export default Callout;
