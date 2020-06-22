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

function NavMenu(props) {

  const [active, setActive] = useState(0);

  const handleChange = (index, sub, subItem) => {
    setActive({
      index: index,
      sub: sub,
      subItem: subItem
    })
  }
  return (
  <MenuContainer>
    {React.Children.map(props.children, (child, childIndex) => {
            if (!React.isValidElement(child)) {
              return null;
            }

            return React.cloneElement(child, {
                active: active,
                links: props.links,
                themePrimaryColor: props.themePrimaryColor,
                onChange: handleChange,
                rootId: props.rootId
            });
          })}

  </MenuContainer>
  );
}

export default NavMenu;
