import React from "react";
import PropTypes from "prop-types";

function Row(props) {
    const getSelfClassName = () => {
        return props.className ?? false;
    };

    const getClassName = () => {
        let className = "";
        if (props.isDesktop) {
            className = "row is-desktop";
        } else if (props.isMobile) {
            className = "row is-mobile";
        } else {
            className = "row";
        }
        if (props.isMultiline) {
            className = className + " is-multiline";
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

Row.propTypes = {
    isMultiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isDesktop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isMobile: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string
};

export default Row;
