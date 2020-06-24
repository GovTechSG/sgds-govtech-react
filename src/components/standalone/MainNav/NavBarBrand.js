import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const NavBarItemBrand = styled.a`
display: block;
flex-grow: 0;
flex-shrink: 0;
line-height: 1.5;
padding: 0.5rem 0.75rem;
position: relative;
cursor: pointer;
text-decoration: none;
@media screen and (min-width: 1024px) {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 1023px){
  align-items: center;
  display: flex;
}
img {
  max-height: 2.5rem;
  height: auto;
  max-width: 100%;
}
`;

const NavBarBrandContainer = styled.div`
@media screen and (min-width: 1024px){
margin-left: -.75rem;
}
align-items: stretch;
display: flex;
flex-shrink: 0;
min-height: 5.25rem;
`;

const NavbarBurger = styled.div`
@media screen and (min-width: 1024px){
  display: none;
}
color: #484848;
cursor: pointer;
display: block;
height: 5.25rem;
position: relative;
width: 5.25rem;
margin-left: auto;
span:first-child {
  top: calc(50% - 6px);
}
span:nth-child(2) {
  top: calc(50% - 1px);
}
span:nth-child(3) {
  top: calc(50% + 4px);
}
span {
  background-color: #484848;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color,opacity,transform;
  transition-timing-function: ease-out;
  width: 16px;
}
`;   

function NavBarBrand (props) {

    return (
      <NavBarBrandContainer>
        <NavBarItemBrand  href={props.link}>
          {props.img ? (
            <img src={props.img} alt={props.name} />
          ) : (
            <h1>{props.name}</h1>
          )}
        </NavBarItemBrand>
        {props.links ? (
                  <NavbarBurger 
                  onClick={props.onChange}>
                    <span />
                    <span />
                    <span />
                  </NavbarBurger>
                ) : null}
      </NavBarBrandContainer>
    );
  
}

NavBarBrand.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  img: PropTypes.string
};

export default NavBarBrand;
