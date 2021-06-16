import React from "react";
import PropTypes from "prop-types";

export function SideNavMenu(props) {
    let initiallyOpen = !!props.initiallyOpen;
    let [open, setOpen] = useState(initiallyOpen);
    return (
        <>
            <li className="second-level-nav">
                <a
                    href="#!"
                    className={`second-level-nav-header ${
                        props.isActive ? "is-active" : ""
                    }`}
                    onClick={e => {
                        e.preventDefault();
                        setOpen(!open);
                    }}
                >
                    {props.text}
                    <i
                        className={`sgds-icon sgds-icon-chevron-${
                            open ? "up" : "down"
                        } `}
                        aria-hidden={open ? "false" : "true"}
                    ></i>
                </a>
            </li>
            {open ? <div>{props.children}</div> : null}
        </>
    );
}

SideNavMenu.propTypes = {
    initiallyOpen: PropTypes.bool,
    isActive: PropTypes.bool,
    text: PropTypes.string
};

export default SideNavMenu;
