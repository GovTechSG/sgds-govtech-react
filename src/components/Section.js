import React from "react";
import PropTypes from "prop-types";

function Section(props) {
  const getClassName = () => {
    if (props.isSmall) {
      return "sgds-section is-small";
    } else if (props.isMedium) {
      return "sgds-section is-medium";
    } else if (props.isLarge) {
      return "sgds-section is-large";
    } else {
      return "sgds-section";
    }
  };

  return <section className={getClassName()} style={props.style}>{props.children}</section>;
}

Section.propTypes = {
  isSmall: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isMedium: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isLarge: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  style: PropTypes.object
};

export default Section;
