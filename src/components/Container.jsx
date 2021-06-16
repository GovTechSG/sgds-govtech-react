import React from "react";
import PropTypes from "prop-types";

function Container(props) {
    const getSelfClassName = () => {
        return props.className ?? false;
    };

    const getClassName = () => {
        let className = "";
        if (props.isFluid) {
            className = "sgds-container is-fluid";
        } else {
            className = "sgds-container";
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

Container.propTypes = {
    isFluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    style: PropTypes.object,
    className: PropTypes.string
};

export default Container;
