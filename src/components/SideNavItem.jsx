import React from "react";
import PropTypes from "prop-types";

export function SideNavItem(props) {
    if (props.component) {
        let componentProps = { ...props };
        delete componentProps.component;
        return (
            <li>
                <props.component {...componentProps} />
            </li>
        );
    }
    return (
        <li>
            <a
                href={props.href || ""}
                onClick={props.onClick || (() => {})}
                className={`${props.className} ${
                    props.isActive ? "is-active" : ""
                }`}
            >
                {props.children}
            </a>
        </li>
    );
}

SideNavItem.propTypes = {
    component: PropTypes.object,
    href: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    isActive: PropTypes.boolean
};

export default SideNavItem;
