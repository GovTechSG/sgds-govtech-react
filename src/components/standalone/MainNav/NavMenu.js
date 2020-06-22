import React, { useState } from "react";
import styled from "styled-components";
import NavbarItem from "./NavbarItem";

    
const MenuContainer = styled.div`
  display:none;
  @media screen and (min-width: 1024px){
    margin-left: -.75rem;
    flex-grow: 1;
    flex-shrink: 0;
    align-items: stretch;
    display: flex;
  }
`;

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  render() {
    const handleChange = (index, sub, subItem) => {
      this.setState({
        active: 
          {
            index: index,
            sub: sub,
            subItem: subItem
          }
        })
    }
    return (
      <MenuContainer>
        {React.Children.map(this.props.children, (child, childIndex) => {
                if (!React.isValidElement(child)) {
                  return null;
                }
    
                return React.cloneElement(child, {
                    active: this.state.active,
                    links: this.props.links,
                    themePrimaryColor: this.props.themePrimaryColor,
                    onChange: handleChange,
                    rootId: this.props.rootId
                });
              })}
    
      </MenuContainer>
      );
  }

}

export default NavMenu;
