import React from "react";
import PropTypes from "prop-types";

function Section(props) {
  const getClassName = () => {
    if (props.isSmall) {
      return "sgds-section is-small " + props.className;
    } else if (props.isMedium) {
      return "sgds-section is-medium " + props.className;
    } else if (props.isLarge) {
      return "sgds-section is-large " + props.className;
    } else {
      return "sgds-section " + props.className;
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
  className: PropTypes.string,
};

export default Section;
