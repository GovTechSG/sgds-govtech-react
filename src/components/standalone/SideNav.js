import React, { Component, useState } from "react";
import styled from "styled-components";


const SGDSMenu = styled.aside`
  display: block; 
`;

const SGDSMenuList = styled.ul`
  list-style: none!important;
  margin-left: 2em;
  margin-top: 1em;
  margin: 0;

 li {
    font-size: 1.3rem;
    line-height: 2rem;
    margin: 0;
    padding: 0;
  }
`;

const MenuListItem = styled.li`

  a {
    color: #323232;
    display: flex;
    font-size: 1.0625rem;
    justify-content: space-between;
    align-items: center;
    padding: .75rem 0;
    cursor: pointer;
    text-decoration: none;
  }

  a.is-active {
    color: #6037b3;
    font-weight: 600;
    border-color: #6037b3;
  }

  :not(:first-child) a {
    border-top: 1px solid #767676;
  }
  
  &.is-second-level{
    a {
      border: 0!important;
      padding-left: 1.5rem;
      padding-top: 0;
    }
  }

`;

const SubMenu = styled.div`
  &.is-hidden {
    display: none!important;
  }
`;

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
          <a href={subItem.link}>
            {subItem.title}
          </a>
        );
        return <MenuListItem className = "is-second-level" key={`subItem-${idx}`}>{linkChild}</MenuListItem>;
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
          <MenuListItem key={`mainList-${idx}`}>
            <DropDownLink
              isActive={this.state[`dropdown-${idx}`]}
              onClick={this.mainLinkOnClickHandler}
              key={`dropdown-${idx}`}
              position={idx}
            >
              {item.title}
            </DropDownLink>
          </MenuListItem>
        );
        let hiddenClass = this.state[`dropdown-${idx}`] ? "" : "is-hidden";
        renderedItems.push(
          <SubMenu
            key={`subMenuList-${idx}`}
            className={`${hiddenClass}`}
          >
            {this.renderSubMenuItems(item.subMenuItems)}
          </SubMenu>
        );
      } else {
        let listContent = item.children ? (
          item.children
        ) : (
          <a href={item.link}>{item.title}</a>
        );
        renderedItems.push(<MenuListItem key={`mainList-${idx}`}>{listContent}</MenuListItem>);
      }
    });
    return renderedItems;
  };

  render() {
    if (this.props.menuItems && this.props.menuItems.length > 0) {
      return (
        <SGDSMenu>
          <SGDSMenuList>{this.renderMenuItems()}</SGDSMenuList>
          </SGDSMenu>
      );
    }
    return (
      <SGDSMenu>
        <SGDSMenuList>{this.props.children}</SGDSMenuList>
      </SGDSMenu>
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
