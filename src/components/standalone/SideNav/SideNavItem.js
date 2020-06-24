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

function SideNavItem(props) {
  if (props.component) {
    let componentProps = { ...props };
    delete componentProps.component;
    return (
      <MenuListItem className={`${props.className}`}>
        <props.component {...componentProps} />
      </MenuListItem>
    );
  }
  return (
    <MenuListItem className={`${props.className}`}>
      <a
        href={props.href || ""}
        onClick={props.onClick || (() => {})}
        className={`${props.className} ${props.isActive ? "is-active" : ""}`}
      >
        {props.children}
      </a>
    </MenuListItem>
  );
}


export default SideNavItem;
