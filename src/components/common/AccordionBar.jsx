/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class AccordionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  selectAccordion(index) {
    if (index === this.state.selected) {
      this.setState({
        selected: -1
      });
      return;
    }
    this.setState({
      selected: index
    });
  }

  getAccordionHeaderClassName(index) {
    let className = "sgds-accordion-header";
    if (index === this.state.selected) {
      className = className.concat(" active");
    }
    return className;
  }

  getAccordionBodyClassName(index) {
    let className = "sgds-accordion-body";
    if (index === this.state.selected) {
      className = className.concat(" is-open");
    }
    return className;
  }

  getAccordionChevronClassName(index) {
    let className = "sgds-icon";
    if (index === this.state.selected) {
      className = className.concat(" sgds-icon-chevron-up");
    } else {
      className = className.concat(" sgds-icon-chevron-down");
    }
    return className;
  }

  render() {
    let items = this.props.items;
    return (
      <div className="sgds-accordion">
        {items.map((value, index) => {
          return (
            <div
              className="sgds-accordion-set"
              key={index}
              onClick={() => this.selectAccordion(index)}
            >
              <a
                className={this.getAccordionHeaderClassName(index)}
                role="button"
                aria-expanded="false"
              >
                {value.title}
                <i className={this.getAccordionChevronClassName(index)} />
              </a>
              <div className={this.getAccordionBodyClassName(index)}>
                <p> {value.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AccordionBar;
