import React from "react";
import PropTypes from "prop-types";

export function SideNavMenuItem(props) {
    return (
        <SideNavItem
            {...props}
            className={`second-level-nav-item ${props.className || ""}`}
        ></SideNavItem>
    );
}

SideNavMenuItem.propTypes = {
    className: PropTypes.string
};

export default SideNavMenuItem;
