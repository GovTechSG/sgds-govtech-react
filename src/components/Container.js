import React from "react";
import PropTypes from "prop-types";

function Container(props) {
  const getClassName = () => {
    if (props.isFluid) {
      return "sgds-container is-fluid " + props.className;
    } else {
      return "sgds-container " + props.className;
    }
  };

  return (
    <div className={getClassName()} style={props.style}>
      {props.children}
    </div>
  );
}

Container.propTypes = {
  isFluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string
};

export default Container;
