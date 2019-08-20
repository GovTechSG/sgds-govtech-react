/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  render() {
    return (
      <div className="sgds-card">
        <div className="sgds-card-content">
          <p className="title">{this.props.card.cardTitle}</p>
          <p className="subtitle">{this.props.card.carSubTitle}</p>
        </div>
        <div className="sgds-card-footer">
          <div className="sgds-card-footer-item">
            <span>
              <a
                style={
                  this.props.infoColor ? { color: this.props.infoColor } : {}
                }
                href={this.props.card.button1.link}
              >
                {this.props.card.button1.text}
              </a>
            </span>
          </div>
          <div className="sgds-card-footer-item">
            <span>
              <a
                style={
                  this.props.infoColor ? { color: this.props.infoColor } : {}
                }
                href={this.props.card.button2.link}
              >
                {this.props.card.button2.text}
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
