import React, { useState } from "react";
import PropTypes from "prop-types";

export function MainNav({ children, isFluid }) {
  return (
    <nav className="sgds-navbar" role="navigation">
      <div className={`sgds-container ${isFluid ? "is-fluid" : ""}`}>
        {children}
      </div>
    </nav>
  );
}

export function MainNavBrand(props) {
  return <div className="sgds-navbar-brand">{props.children}</div>;
}

export function MainNavItem({ as, href = "", ...props }) {
  let navItemClass = `sgds-navbar-item ${
    props.isUpperCase ? "is-uppercase" : ""
  } ${props.isTab ? "is-tab" : ""} ${props.isActive ? "is-active" : ""}`;

  if (as) {
    const MorphedComponent = as;
    return (
      <MorphedComponent className={navItemClass} {...props}>
        {props.children}
      </MorphedComponent>
    );
  }

  const mainNavItemProps = {
    className: navItemClass,
    href,
    onClick: props.onClick
  };

  return href ? (
    <a {...mainNavItemProps}>{props.children}</a>
  ) : (
    <div {...mainNavItemProps}>{props.children}</div>
  );
}
MainNavItem.propTypes = {
  as: PropTypes.elementType,
  href: PropTypes.string,
  isUpperCase: PropTypes.bool,
  isTab: PropTypes.bool,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

export function MainNavBurger({ onClick, expand = "" }) {
  return (
    <div
      className={`sgds-navbar-burger ${expand ? "is-active" : ""}`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
MainNavBurger.propTypes = {
  onClick: PropTypes.func,
  expand: PropTypes.bool
};

export function MainNavMenu({ children, expand = "" }) {
  return (
    <div className={`sgds-navbar-menu ${expand ? "is-active" : ""}`}>
      {children}
    </div>
  );
}
MainNavMenuEnd.propTypes = {
  expand: PropTypes.bool
};

export function MainNavMenuStart({ children }) {
  return <div className="sgds-navbar-start">{children}</div>;
}

export function MainNavMenuEnd({ children }) {
  return <div className="sgds-navbar-end">{children}</div>;
}

export function MainNavDropdown({
  children,
  label,
  href = "",
  onClick = () => {},
  ...props
}) {
  const [showChildren, setShowChildren] = useState(true);
  const onDropdownClick = (e) => {
    e.preventDefault();
    setShowChildren(!showChildren);
    onClick();
  };
  return (
    <div
      className={`sgds-navbar-item has-dropdown is-hoverable ${
        props.isMega ? "is-mega" : ""
      }`}
    >
      <a
        className={`sgds-navbar-link ${
          props.isUpperCase ? "is-uppercase" : ""
        } ${props.isActive ? "is-active" : ""}`}
        href={href}
        onClick={onDropdownClick}
      >
        {label}
      </a>
      <div
        className={`sgds-navbar-dropdown ${
          !showChildren ? "is-hidden-touch" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
MainNavDropdown.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isUpperCase: PropTypes.bool,
  isMega: PropTypes.bool
};
