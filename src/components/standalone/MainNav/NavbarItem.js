import React from "react";
import styled from "styled-components";
import DesktopSearch from "./DesktopSearch";
import ReactDOM from "react-dom";
import MobileSearch from "./MobileSearch";

const NavBarSection = styled.div`
@media screen and (min-width: 1024px){
  justify-content: flex-end;
  align-items: stretch;
  display: flex;  
}

&.is-end {
  @media screen and (min-width: 1024px){
    justify-content: flex-end;
    margin-left: auto;
  }
}

&.is-start {
  @media screen and (min-width: 1024px){
    justify-content: flex-start;
    margin-right: auto;
  }
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

const SearchIconButton = styled.button`
font-size: 1.375rem;
background-color: #fff;
border-color: transparent;
color: #0a0a0a;
align-items: center;
border-radius: 0;
box-shadow: none;
display: inline-flex;
height: 2.25em;
line-height: 1.5;
position: relative;
vertical-align: top;
user-select: none;
border: 1px solid transparent;
cursor: pointer;
justify-content: center;
padding: calc(.375em - 1px) .75em;
text-align: center;
white-space: nowrap;
:hover {
  background-color: #ebebeb;
  border-color: transparent;
  color: #0a0a0a;
}

@media screen and (max-width: 1023px) {
  display: none!important;
}

`;


function Modal (props) {
    return (props.open ? 
    ReactDOM.createPortal(
        <DesktopSearch
        themePrimaryColor = {props.themePrimaryColor}
        searchChangeHandler = {props.searchChangeHandler}
        searchClickHandler = {props.searchClickHandler}
        />,
      document.getElementById(props.rootId)
    ) : null);
  
}

class NavbarItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }

  render (){
    return (
      <NavBarSection className={this.props.isStart ? "is-start" : "is-end"}>
        {React.Children.map(this.props.children, (child, childIndex) => {
              if (!React.isValidElement(child)) {
                return null;
              }

              return React.cloneElement(child, {
                  active: this.props.active,
                  index: childIndex,
                  themePrimaryColor: this.props.themePrimaryColor,
                  onChange: this.props.onChange
              });
            })}
    
      { this.props.displaySearch ? 
          <NavBarItem>
            <MobileSearch
            themePrimaryColor = {this.props.themePrimaryColor}
            searchChangeHandler = {this.props.searchChangeHandler}
            searchClickHandler = {this.props.searchClickHandler}/>
            <SearchIconButton
              data-target="searchbar-1"
              onClick={() => this.setState({
                showSearch : !this.state.showSearch
              }) }
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5189 2.6665C7.97308 2.6665 2.66663 7.97296 2.66663 14.5188C2.66663 21.0646 7.97308 26.3711 14.5189 26.3711C17.2575 26.3711 19.7791 25.4423 21.786 23.8825L27.2381 29.3347L29.3333 27.2395L23.8814 21.7875C25.4419 19.7804 26.3712 17.2581 26.3712 14.5188C26.3712 7.97296 21.0648 2.6665 14.5189 2.6665ZM14.5189 5.62957C19.4283 5.62957 23.4081 9.60941 23.4081 14.5188C23.4081 19.4282 19.4283 23.408 14.5189 23.408C9.60949 23.408 5.62965 19.4282 5.62965 14.5188C5.62965 9.60941 9.60949 5.62957 14.5189 5.62957Z" fill="#323232"/>
              </svg>

            </SearchIconButton>
            
            <Modal open = {this.state.showSearch}
            themePrimaryColor = {this.props.themePrimaryColor}
            searchChangeHandler = {this.props.searchChangeHandler}
            searchClickHandler = {this.props.searchClickHandler}
            rootId = {this.props.rootId}>
            </Modal>
          </NavBarItem>

          : null
        }
      </NavBarSection>
        
    );
  }
}

export default NavbarItem;
