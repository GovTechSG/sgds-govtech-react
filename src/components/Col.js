import React from "react";
import PropTypes from "prop-types";

function Col(props) {
  const getSelfClassName = () => {
    return props.className ?? false;
  };

  const getClassName = () => {
    let className = "col";
    if (props.is) {
      className = `${className} is-${props.is}`;
    }
    if (props.isOffset) {
      className = `${className} is-offset-${props.isOffset}`;
    }
    if (props.isNested) {
      className = `${className} is-nested`;
    }
    if (props.isNarrow) {
      className = `${className} is-narrow`;
    }
    if (props.isMobile) {
      className = `${className} is-${props.isMobile}-mobile`;
    }
    if (props.isTablet) {
      className = `${className} is-${props.isTablet}-tablet`;
    }
    if (props.isDesktop) {
      className = `${className} is-${props.isDesktop}-desktop`;
    }
    if (props.isWidescreen) {
      className = `${className} is-${props.isWidescreen}-widescreen`;
    }
    if (props.isFullHd) {
      className = `${className} is-${props.isFullHd}-fullhd`;
    }
    if (getSelfClassName()) {
      return `${className} ${getSelfClassName()}`;
    } else {
      return className;
    }
  };

  return (
    <div className={getClassName()} style={props.style}>
      {props.children}
    </div>
  );
}

Col.propTypes = {
  is: PropTypes.number,
  isOffset: PropTypes.number,
  isNested: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isNarrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isMobile: PropTypes.number,
  isTablet: PropTypes.number,
  isDesktop: PropTypes.number,
  isWidescreen: PropTypes.number,
  isFullHd: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Col;
