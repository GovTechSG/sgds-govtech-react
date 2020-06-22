
import React from "react";
import styled from "styled-components";

const NavbarItemWithDropdown = styled.div`
  @media screen and (min-width: 1024px){
  align-items: stretch;
  display: flex;
  }
  position: static;
  flex-grow: 0;
  flex-shrink: 0;
  &:hover {
    .dropdown {
      display: block !important;
    }
  }
  &.is-mega {
    padding: 0;
  }
`;

const NavbarDropdown = styled.div`
  font-size: 1.125rem;
  @media screen and (min-width: 1024px) {
    background-color: #fff;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top: 2px solid #d6d6d6;
    box-shadow: 0 4px 4px rgba(10,10,10,.1);
    display: none;
    left: 0;
    min-width: 100%;
    padding: 1rem .5rem;
    position: absolute;
    top: 100%;
    z-index: 20;
  }

`;

const Icon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

function NavTabWithSub (props) {

  const NavSub = styled.a`
    font-size: 1.125rem;
    align-items: center;
    border: 0
    box-sizing: border-box;
    color: rgb(72, 72, 72);
    cursor: pointer;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    height: 43px;
    line-height: 27px;
    margin-top: 5px;
    padding: .5rem 1rem;
    position: relative;
    text-decoration: none;
    white-space: nowrap;
    width: 158.219px;
    &:hover {
      color: ${props.themePrimaryColor};
      font-weight: 600;
    }
  `;


  const StyledNavTabWithSub = styled.a`
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    align-items: center;
    display: flex;
    cursor: pointer;
    color: #484848;
    line-height: 1.5;
    position: relative;
    text-decoration: none;
    font-size: inherit;
    border-bottom: 5px solid transparent
    &:hover {
      font-weight: 600;
      color: ${props.themePrimaryColor};
    }
    &.is-uppercase {
      text-transform: uppercase!important;
    }
  `;

  const Row = styled.div`
    margin-left: -.75rem;
    margin-right: -.75rem;
    margin-top: -.75rem;
    width: 100%;
    @media print, screen and (min-width: 769px) {
      display: flex;
    }
    :last-child {
      margin-bottom: -.75rem;
    }
  `;

  const Col = styled.div`
    display: block;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    padding: .75rem;
    width: 100%;
    @media print, screen and (min-width: 769px) {
      flex: none;
      display: block;
      padding: .75rem;
      &.is-3 {
        width: 25%;
      }
      &.is-6 {
        width: 50%;
      }
    }
  `;
  const NavBarContainer = styled.div`
    align-items: stretch;
    display: flex;
    min-height: 5.25rem;
    width: 100%;
    flex-grow: 1;
    margin: 0 auto;
    position: relative;

    @media screen and (min-width: 1216px) {
      max-width: 1152px;
    }

    @media screen and (max-width: 1023px) {
      display: block;
    }

    &.is-fluid{
      max-width: none;
      padding-left: 32px;
      padding-right: 32px;
      width: 100%;
    }
  `;


  const NavBarItem = styled.div`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  color: #484848 !default;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
  font-size: 1.125rem;

  @media screen and (min-width: 1024px) {
    padding: .5rem 1rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 1023px){
    align-items: center;
    display: flex;
  }
  &.is-uppercase {
    text-transform: uppercase!important;
  }
  &.is-wrapped {
    white-space: normal!important;
  }
  `;

  const selectMenuTab = (index, subIndex, subMenuIndex) => {
    props.onChange(index, subIndex, subMenuIndex);
  };

  return (
    <NavbarItemWithDropdown
      className = { props.link.subMenus ? "isMega" : "" }
      key={props.index}
    >
      <StyledNavTabWithSub
        className={"is-uppercase"}
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
      >
        {props.link.name}
        <Icon>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.7201 15.3888L13.7247 15.3931L11.9997 17L3 8.61605L5 7L11.9951 13.7818L19.2751 7L21 8.60692L13.7201 15.3888Z" fill="#484848"/>
          </svg>
        </Icon>
      </StyledNavTabWithSub>
      {props.link.subMenus ? 
      <NavbarDropdown className="dropdown">
        <NavBarContainer className="is-fluid">
          <Row>
            {props.link.subMenus.map((subMenu, i) => {
              return (
                <Col className="is-3" key={i}>
                  <NavBarItem className="is-uppercase">
                    <b>{subMenu.subMenuTitle}</b>
                  </NavBarItem>
                  {subMenu.subMenuItems.map(
                    (subMenuItem, b) => {
                      return (
                        <NavSub
                          key={b}
                          style={
                            props.active.index ===
                              props.index &&
                            props.active.sub === i &&
                            props.active.subItem === b
                              ? {
                                  color: props.themePrimaryColor,
                                  fontWeight: 600
                                }
                              : null
                          }
                          onClick={() =>
                            selectMenuTab(
                              props.index,
                              i,
                              b
                            )
                          }
                        >
                          {subMenuItem.name}
                        </NavSub>
                      );
                    }
                  )}
                </Col>
              );
            })}
            {props.link.subMenuInfo ? (
              <Col className="is-6">
                <NavBarItem className="is-wrapped">
                  <p>
                    <b>{props.link.subMenuInfo.title}</b>
                    <br />
                    {props.link.subMenuInfo.content}
                  </p>
                </NavBarItem>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </NavBarContainer>
      </NavbarDropdown>
      :
      <NavbarDropdown className="dropdown">
        {props.link.sublinks ? props.link.sublinks.map((sublink, i) => {
          return (
            <NavSub
              href={sublink.link}
              key={i}
              style={
                props.active.sub === i &&
                props.active.index === props.index
                  ? {
                      color: props.themePrimaryColor,
                      fontWeight: 600
                    }
                  : null
              }
              onClick={() =>
                selectMenuTab(props.index, i)
              }
            >
              {sublink.name}
            </NavSub>
          );
        }) : null}
      </NavbarDropdown>
      }
    </NavbarItemWithDropdown>
  );

}


export default NavTabWithSub;