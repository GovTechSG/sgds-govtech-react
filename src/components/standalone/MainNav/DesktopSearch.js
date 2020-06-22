import React, {useState} from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  align-items: stretch;
  display: flex;
  min-height: 5.25rem;
  width: 100%;
  flex-grow: 1;
  margin: 0!important;
  position: relative;

  @media screen and (max-width: 1023px) {
  display: block;
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

const SearchInputIcon = styled.span`
left: 0.5em;
display: flex;
align-items: center;
height: 2.25em;
pointer-events: none;
position: absolute;
top: 0;
width: 2.25em;
z-index: 4;
`;

const SearchbarContainer = styled.div`
display: flex;
justify-content: flex-start;
padding: .5rem!important;
`;

const SearchInputSection = styled.div`
flex-grow: 1;
clear: both;
font-size: 1.25rem;
position: relative;
text-align: left;
margin-right: -1px;
padding-bottom: .5rem!important;
`;

const SearchInput = styled.input`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 2.25em!important;
  display: block;
  width: 100%;
  border-color: transparent;
  border-radius: 0;
  -webkit-appearance: none;
  align-items: center;
  font-size: 1.25rem;
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(.375em - 1px) calc(.625em - 1px);
  position: relative;
  vertical-align: top;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  color: #323232;
  max-width: 100%;
  box-shadow: none!important;
  margin: 0;

`;


const SearchButton = styled.button`
    align-items: center;
    background-color: #6037b3;
    border-bottom-left-radius: 0;
    border-color: transparent;
    border-radius: 0;
    box-shadow: none;
    border-top-left-radius: 0;
    border-width: 1px !default;
    color: #fff!important;
    cursor: pointer;
    display: inline-flex;
    font-size: 1.25rem;
    height: 2.25em;
    justify-content: center;
    line-height: 1.5;
    padding: calc(.375em - 1px) .75em;
    padding-left: 1rem!important;
    padding-right: 1rem!important;
    position: relative;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    :hover {
      background-color: #4f2d94;
      border-color: transparent;
    }
  `;

  const StyledHR = styled.hr`
  background-color: #d6d6d6;
  border: none;
  display: block;
  height: 1px;
  margin: 0;
  padding: 0;
  margin-top: 2rem!important;
  margin-bottom: 2rem!important;
  `;

function DesktopSearch(props) {
    return (
    <SearchContainer
        id="searchbar-1"
      >
        <Row>
          <Col>
            <StyledHR/>
            <form>
              <SearchbarContainer>
                <SearchInputSection>
                  <SearchInputIcon>
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5189 2.6665C7.97308 2.6665 2.66663 7.97296 2.66663 14.5188C2.66663 21.0646 7.97308 26.3711 14.5189 26.3711C17.2575 26.3711 19.7791 25.4423 21.786 23.8825L27.2381 29.3347L29.3333 27.2395L23.8814 21.7875C25.4419 19.7804 26.3712 17.2581 26.3712 14.5188C26.3712 7.97296 21.0648 2.6665 14.5189 2.6665ZM14.5189 5.62957C19.4283 5.62957 23.4081 9.60941 23.4081 14.5188C23.4081 19.4282 19.4283 23.408 14.5189 23.408C9.60949 23.408 5.62965 19.4282 5.62965 14.5188C5.62965 9.60941 9.60949 5.62957 14.5189 5.62957Z" fill="#d6d6d6"/>
                    </svg>
                  </SearchInputIcon>
                  <SearchInput
                    id="nav-4-search"
                    type="text"
                    placeholder="What are you looking for?"
                    name="nav-4-search"
                    onChange={props.searchChangeHandler.bind(this)}
                  />

                </SearchInputSection>
                <div className="control">
                  <SearchButton
                    type="submit"
                    style={{ backgroundColor: props.themePrimaryColor }}
                    onClick={props.searchClickHandler.bind(this)}
                  >
                    SEARCH
                  </SearchButton>
                </div>
              </SearchbarContainer>
            </form>
          </Col>
        </Row>
      </SearchContainer>);
    
}

export default DesktopSearch;