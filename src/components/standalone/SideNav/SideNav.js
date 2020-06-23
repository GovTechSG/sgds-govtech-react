import React, { Component, useState } from "react";
import styled from "styled-components";
import SideNavMenu from "./SideNavMenu";
import SideNavMenuItem from "./SideNavMenuItem";


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
  
  &.is-sub{
    a {
      border: 0!important;
      padding-left: 1.5rem;
      padding-top: 0;
    }
    button {
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

const Icon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
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
        return <MenuListItem className = "is-sub" key={`subItem-${idx}`}>{linkChild}</MenuListItem>;
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
  let computedLinkClass = "";
  let computedIconClass = "sgds-icon ";
  if (props.isActive) {
    computedLinkClass += "is-active";
    // computedIconClass += "sgds-icon-chevron-up";
  } else {
    // computedIconClass += "sgds-icon-chevron-down";
  }
  return (
    <a className={computedLinkClass} onClick={dropDownClickHandler}>
      {props.children}
      {props.isActive ? 
      (<Icon>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2799 8.61124L10.2753 8.60692L12.0003 7L21 15.384L19 17L12.0049 10.2182L4.72495 17L3 15.3931L10.2799 8.61124Z" fill="#6037b3"/>
        </svg>
      </Icon>) :
      (<Icon>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.7201 15.3888L13.7247 15.3931L11.9997 17L3 8.61605L5 7L11.9951 13.7818L19.2751 7L21 8.60692L13.7201 15.3888Z" fill="#484848"/>
          </svg>
      </Icon>)
      }
    </a>
  );
}

export default SideNav;
