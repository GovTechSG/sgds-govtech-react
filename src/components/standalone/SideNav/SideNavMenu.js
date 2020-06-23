import React, { Component, useState } from "react";
import styled from "styled-components";

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


const Icon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

class SideNavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: !!props.initiallyOpen,
        }
    }
    render() {
        return (
            <>
              <MenuListItem>
                <a
                  href="#!"
                  className={`${
                    this.state.open ? "is-active" : ""
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({open: !this.state.open});
                  }}
                >
                  {this.props.text}
                <Icon>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2799 8.61124L10.2753 8.60692L12.0003 7L21 15.384L19 17L12.0049 10.2182L4.72495 17L3 15.3931L10.2799 8.61124Z" 
                        fill={this.state.open ? "#6037b3" : "#484848"}/>
                    </svg>
                </Icon>
                </a>
              </MenuListItem>
              {this.state.open ? <div>{this.props.children}</div> : null}
            </>
          );
    }
    
  }
  
  export default SideNavMenu;