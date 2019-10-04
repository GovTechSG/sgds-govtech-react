import React, { Component, useState } from "react";
import PropTypes from "prop-types";

const DropDownLink = (props) =>{
  const dropDownClickHandler = () =>{
    props.onClick(props.id,!props.isActive);
  }
  let computedLinkClass = "second-level-nav-header "
  let computedIconClass = "sgds-icon "
  if(props.isActive){
    computedLinkClass += 'is-active'
    computedIconClass += 'sgds-icon-chevron-up'
  }else{
    computedIconClass += 'sgds-icon-chevron-down'
  }
  return (
    <a className={computedLinkClass} onClick={dropDownClickHandler}>
      {props.children}
      <i className={computedIconClass} aria-hidden="true"></i>
    </a>
  )
}
// TODO: Take in a onClick handler on the links instead.
// For accessibility, change a to Button
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.menuItems = props.menuItems
    //Initialize the dropdown states
    let dropDownStates = {}
    this.menuItems.forEach((item,idx)=>{
      dropDownStates[`dropdown-${idx}`]=false
    })
    this.state = dropDownStates
  }
  mainLinkOnClickHandler = (id,isActive)=>{
    this.setState({[id]:isActive})
  }
  renderSubMenuItems=(subMenuItems)=>{
    let renderedSubMenuItems = subMenuItems.map((subItem,idx) => {
      return(
        <li key={`subItem-${idx}`}>
          <a className="second-level-nav-item" href={subItem.link}>
            {subItem.title}
          </a>
        </li>)
    })
    return renderedSubMenuItems
  }
  // Traverses only 2 levels of menu Items
  renderMenuItems=()=>{
    let renderedItems =[]
    this.menuItems.forEach((item,idx)=>{ 
      if(item.subMenuItems){
        renderedItems.push(          
          <li key={`mainList-${idx}`} className="second-level-nav">
            <DropDownLink isActive={this.state[`dropdown-${idx}`]} onClick={this.mainLinkOnClickHandler} key={`dropdown-${idx}`} id={`dropdown-${idx}`}>
              {item.title}
            </DropDownLink>
          </li>
        )
        let hiddenClass = this.state[`dropdown-${idx}`] ? '':'is-hidden'
        renderedItems.push(
          <div key={`subMenuList-${idx}`} className={`second-level-nav-div ${hiddenClass}`}>
            {this.renderSubMenuItems(item.subMenuItems)}
          </div>
        )
      }else{
        renderedItems.push(          
          <li key={`mainList-${idx}`}>
            <a href={item.link}>
                {item.title}
            </a>
          </li>
        )
      }
    })
    return renderedItems
  }

  render() {
    return(
      <aside className="sgds-menu">
        <ul className="sgds-menu-list">
          {this.renderMenuItems()}
        </ul>
      </aside>
    )
  }
}

export default SideNav;
