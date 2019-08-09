import React, { Component } from "react";

class AccordionSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAccordion: -1
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

  toggleActiveAccordion = (index) => {
    if (index === this.state.activeAccordion) {
      this.setState({
        activeAccordion: -1
      });
      return;
    }
    this.setState({
      activeAccordion: index
    });
  }

  shouldAccordionRender = index => {
    return this.state.activeAccordion === index;
  }

  render() {
    return (
      <div className="accordion-set">
        {
          React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
              isActive: this.shouldAccordionRender(index),
              onHeaderClick: () => {
                this.toggleActiveAccordion(index);
              }
            })
          })
        }
      </div>
    );
  }
}

export default AccordionSet;
