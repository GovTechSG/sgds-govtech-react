

import React from "react";
import styled from "styled-components";

function NavTabWithNoSub (props){
    const StyledNavTabWithNoSub = styled.a`
    border-bottom: 5px solid transparent
    min-height: 5.25rem;
    padding-bottom: calc(0.5rem - 1px);
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
    color: #484848;
    line-height: 1.5;
    padding: 0.5rem 0.75rem;
    position: relative;
    &:hover {
      color: ${props.themePrimaryColor};
      font-weight: 600;
      border-bottom: 5px solid ${props.themePrimaryColor};
    }
    &.is-uppercase {
      text-transform: uppercase!important;
    }
    `;

  const selectMenuTab = (index) => {
    props.onChange(index);
  };

    return (
        <StyledNavTabWithNoSub
            className={"is-uppercase"}
            href={props.link.link}
            key={props.index}
            style={
              props.active.index === props.index
                ? {
                    color: props.themePrimaryColor,
                    fontWeight: 600,
                    borderBottom: "5px solid",
                    borderBottomColor: props.themePrimaryColor
                  }
                : null
            }
            onClick={() => selectMenuTab(props.index)}
          >
            {props.link.img ? (
              <img src={props.link.img} alt={props.link.name} />
            ) : (
              props.link.name
            )}
          </StyledNavTabWithNoSub>
    )
}

export default NavTabWithNoSub;
