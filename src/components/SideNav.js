import React, { Component, useState } from "react";
import PropTypes from "prop-types";


//  TODO : Add accessibility to the framework.
const DropDownLink = (props) =>{
  const dropDownClickHandler = () =>{
    props.onClick(props.position,!props.isActive);
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
    
    let defaultStates = {}
    this.isNotMissingState = true
    this.menuItems.forEach((item,idx)=>{
      if(typeof item.isActive === 'boolean'){
        defaultStates[`dropdown-${idx}`]=item.isActive
      }else{
        defaultStates[`dropdown-${idx}`]=false
      }
    })
    let dropDownStates =  defaultStates
    this.state = dropDownStates
  }

  // Need to write tests to ensure that this works properly
  mainLinkOnClickHandler = (id,isActive)=>{
    if(this.menuItems[id].onClick){
      this.menuItems[id].onClick(id,isActive)
    }
    this.setState({[`dropdown-${id}`]:isActive})
  }
  renderSubMenuItems=(subMenuItems)=>{

    let renderedSubMenuItems = subMenuItems.map((subItem,idx) => {
      try{
        let linkChild = subItem.children ? subItem.children :(
          <a class="second-level-nav-item" href={subItem.link}>
            {subItem.title}
          </a>
        )
        return(
          <li key={`subItem-${idx}`}>
            {linkChild}
          </li>)
      }catch(err){
        console.error("Sub Menu Items could not be rendered :" + err.message)
        return(<div></div>)
      }
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
            <DropDownLink isActive={this.state[`dropdown-${idx}`]} onClick={this.mainLinkOnClickHandler} key={`dropdown-${idx}`} position={idx}>
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
        let listContent = item.children? item.children : (
          <a href={item.link}>
            {item.title}
          </a>
        )
        renderedItems.push(          
          <li key={`mainList-${idx}`}>
            {listContent}
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
