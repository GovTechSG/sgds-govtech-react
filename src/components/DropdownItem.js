import React from "react";
import PropTypes from "prop-types";

function DropdownItem(props) {
  if (props.href) {
    return (
      <a
        className="sgds-dropdown-item"
        href={props.href}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
  return (
    <div className="sgds-dropdown-item" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

DropdownItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default DropdownItem;
