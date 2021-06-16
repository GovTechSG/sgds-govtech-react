import React from "react";
import PropTypes from "prop-types";

function BreadcrumbItem(props) {
    return (
        <li>
            <a
                className={props.hasTextWhite ? "has-text-white" : ""}
                onClick={props.onClick}
                href={props.href}
            >
                {props.children}
            </a>
        </li>
    );
}

BreadcrumbItem.PropTypes = {
    hasTextWhite: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string
};

export default BreadcrumbItem;
