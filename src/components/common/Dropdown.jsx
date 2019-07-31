import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.hideDropdown);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.hideDropdown);
  }

  toggleDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };
  setContentWrapperRef = node => {
    this.contentWrapperRef = node; // Set directly on 'this' since it won't change/re-render
  };
  hideDropdown = event => {
    if (
      this.contentWrapperRef &&
      !this.contentWrapperRef.contains(event.target)
    ) {
      this.setState({
        showDropdown: false
      });
    }
  };

  render() {
    return (
      <div className="sgds-dropdown" ref={this.setContentWrapperRef}>
        <div className="sgds-dropdown-trigger">
          <button
            className="sgds-button"
            aria-haspopup="true"
            aria-controls="sgds-dropdown-menu"
            onClick={this.toggleDropdown}
          >
            <span>{this.props.name}</span>
            <span className="icon">
              <span
                className={`sgds-icon sgds-icon-chevron-${
                  this.state.showDropdown ? "up" : "down"
                }`}
              />
            </span>
          </button>
        </div>
        <div
          className="sgds-dropdown-menu"
          id="sgds-dropdown-menu"
          role="menu"
          style={{
            display: this.state.showDropdown ? "block" : "none"
          }}
        >
          <div className="sgds-dropdown-content">
            {this.props.links.map((link, index) => {
              if (link.divider) {
                return <hr key={index} className="sgds-dropdown-divider" />;
              }
              return (
                <a
                  href={link.link}
                  className={`sgds-dropdown-item ${
                    link.active ? "is-active" : ""
                  }`}
                  key={index}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
