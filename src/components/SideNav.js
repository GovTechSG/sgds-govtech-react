import React, { Component, useState } from "react";

// TODO: Take in a onClick handler on the links instead.
// For accessibility, change a to Button
class SideNav extends Component {
  constructor(props) {
    super(props);

    let defaultStates = {};
    this.isNotMissingState = true;

    if (props.menuItems) {
      this.menuItems = props.menuItems;
      this.menuItems.forEach((item, idx) => {
        if (typeof item.isActive === "boolean") {
          defaultStates[`dropdown-${idx}`] = item.isActive;
        } else {
          defaultStates[`dropdown-${idx}`] = false;
        }
      });
    }
    let dropDownStates = defaultStates;
    this.state = dropDownStates;
  }

  // Need to write tests to ensure that this works properly
  mainLinkOnClickHandler = (id, isActive) => {
    if (this.menuItems[id].onClick) {
      this.menuItems[id].onClick(id, isActive);
    }
    this.setState({ [`dropdown-${id}`]: isActive });
  };
  renderSubMenuItems = subMenuItems => {
    let renderedSubMenuItems = subMenuItems.map((subItem, idx) => {
      try {
        let linkChild = subItem.children ? (
          subItem.children
        ) : (
          <a className="second-level-nav-item" href={subItem.link}>
            {subItem.title}
          </a>
        );
        return <li key={`subItem-${idx}`}>{linkChild}</li>;
      } catch (err) {
        console.error("Sub Menu Items could not be rendered :" + err.message);
        return <div></div>;
      }
    });
    return renderedSubMenuItems;
  };
  // Traverses only 2 levels of menu Items
  renderMenuItems = () => {
    let renderedItems = [];
    this.menuItems.forEach((item, idx) => {
      if (item.subMenuItems) {
        renderedItems.push(
          <li key={`mainList-${idx}`} className="second-level-nav">
            <DropDownLink
              isActive={this.state[`dropdown-${idx}`]}
              onClick={this.mainLinkOnClickHandler}
              key={`dropdown-${idx}`}
              position={idx}
            >
              {item.title}
            </DropDownLink>
          </li>
        );
        let hiddenClass = this.state[`dropdown-${idx}`] ? "" : "is-hidden";
        renderedItems.push(
          <div
            key={`subMenuList-${idx}`}
            className={`second-level-nav-div ${hiddenClass}`}
          >
            {this.renderSubMenuItems(item.subMenuItems)}
          </div>
        );
      } else {
        let listContent = item.children ? (
          item.children
        ) : (
          <a href={item.link}>{item.title}</a>
        );
        renderedItems.push(<li key={`mainList-${idx}`}>{listContent}</li>);
      }
    });
    return renderedItems;
  };

  render() {
    if (this.props.menuItems && this.props.menuItems.length > 0) {
      return (
        <aside className="sgds-menu">
          <ul className="sgds-menu-list">{this.renderMenuItems()}</ul>
        </aside>
      );
    }
    return (
      <aside className="sgds-menu">
        <ul className="sgds-menu-list">{this.props.children}</ul>
      </aside>
    );
  }
}

//  TODO : Add accessibility to the framework.
function DropDownLink(props) {
  const dropDownClickHandler = () => {
    props.onClick(props.position, !props.isActive);
  };
  let computedLinkClass = "second-level-nav-header ";
  let computedIconClass = "sgds-icon ";
  if (props.isActive) {
    computedLinkClass += "is-active";
    computedIconClass += "sgds-icon-chevron-up";
  } else {
    computedIconClass += "sgds-icon-chevron-down";
  }
  return (
    <a className={computedLinkClass} onClick={dropDownClickHandler}>
      {props.children}
      <i className={computedIconClass} aria-hidden="true"></i>
    </a>
  );
}

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
        className={`${props.className} ${props.isActive ? "is-active" : ""}`}
      >
        {props.children}
      </a>
    </li>
  );
}

export function SideNavMenuItem(props) {
  return (
    <SideNavItem
      {...props}
      className={`second-level-nav-item ${props.className || ""}`}
    ></SideNavItem>
  );
}

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
            className={`sgds-icon sgds-icon-chevron-${open ? "up" : "down"} `}
            aria-hidden={open ? "false" : "true"}
          ></i>
        </a>
      </li>
      {open ? <div>{props.children}</div> : null}
    </>
  );
}

export default SideNav;
