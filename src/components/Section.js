import React from "react";
import PropTypes from "prop-types";

function Section(props) {
  const getSelfClassName = () => {
    return props.className ?? false;
  };

  const getClassName = () => {
    let className = "";
    if (props.isSmall) {
      className = "sgds-section is-small";
    } else if (props.isMedium) {
      className = "sgds-section is-medium";
    } else if (props.isLarge) {
      className = "sgds-section is-large";
    } else {
      className = "sgds-section";
    }
    if (getSelfClassName()) {
      return `${className} ${getSelfClassName()}`;
    } else {
      return className;
    }
  };

  return (
    <section className={getClassName()} style={props.style}>
      {props.children}
    </section>
  );
}

Section.propTypes = {
  isSmall: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isMedium: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isLarge: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string
};

export default Section;
