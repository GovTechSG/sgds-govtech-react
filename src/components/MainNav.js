/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import styled from "styled-components";
import Brand from "./Brand";
import PropTypes from "prop-types";

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedSub: 0,
      selectedSubItem: 0,
      hoverTabName: null,
      hoverTab: null,
      hoverSub: null,
      hoverSunItem: null,
      showSearch: false
    };
    this.searchChangeHandler = props.searchChangeHandler?props.searchChangeHandler:()=>{}
    this.searchClickHandler = props.searchClickHandler?props.searchClickHandler:()=>{}
  }
   
  selectMenuTab = (item, index, subIndex, subMenuIndex) => {
    this.props.selectItem(item);
    if (subMenuIndex >= 0) {
      this.setState({
        selectedTab: index,
        selectedSub: subIndex,
        selectedSubItem: subMenuIndex
      });
    } else if (subIndex >= 0) {
      this.setState({
        selectedTab: index,
        selectedSub: subIndex,
        selectedSubItem: null
      });
    } else {
      this.setState({
        selectedTab: index,
        selectedSub: null,
        selectedSubItem: null
      });
    }
  };
  toggleSearchBar = () => {
    this.setState({showSearch: !this.state.showSearch});
  };
  hoverOn = (name, index, subIndex, subMenuIndex) => {
    if (subMenuIndex >= 0) {
      this.setState({
        hoverTabName: name,
        hoverTab: index,
        hoverSub: subIndex,
        hoverSunItem: subMenuIndex
      });
    } else if (subIndex >= 0) {
      this.setState({
        hoverTabName: name,
        hoverTab: index,
        hoverSub: subIndex,
        hoverSunItem: null
      });
    } else {
      this.setState({
        hoverTabName: name,
        hoverTab: index,
        hoverSub: null,
        hoverSunItem: null
      });
    }
  };
  hoverOff = () => {
    this.setState({
      hoverTabName: null,
      hoverTab: null,
      hoverSub: null,
      hoverSunItem: null
    });
  };
  render() {
    const NavTabWithSub = styled.a`
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
        color: ${this.props.themePrimaryColor};
      }
      &:after {
        color: ${this.props.themePrimaryColor};
        content: "";
        display: block;
        font-family: sgds-icons;
        margin-top: -0.7rem;
        pointer-events: none;
        position: absolute;
        top: 50%;
        right: 0.5rem;
        border: 0;
      }
    `;
    const NavTabWithNoSub = styled.a`
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
        color: ${this.props.themePrimaryColor};
        font-weight: 600;
        border-bottom: 5px solid ${this.props.themePrimaryColor};
      }
    `;
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
        color: ${this.props.themePrimaryColor};
        font-weight: 600;
      }
    `;

    return (
      <div>
        <nav className="navbar">
          <div
            className={
              "sgds-container" + (this.props.isFluid ? " is-fluid" : "")
            }
          >
            <div className="navbar-brand">
              <Brand
                img={this.props.brand.img}
                name={this.props.brand.name}
                link={this.props.brand.link}
              />
              {this.props.links ? (
                <div className="navbar-burger burger ">
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
            </div>
            {this.props.links ? (
              <div className={"navbar-menu "}>
                {this.props.links.map((link, index) => {
                  if (link.sublinks) {
                    return (
                      <div
                        className="navbar-item has-dropdown is-hoverable"
                        key={index}
                      >
                        <NavTabWithSub
                          className={"is-uppercase"}
                          style={
                            this.state.selectedTab === index
                              ? {
                                  color: this.props.themePrimaryColor,
                                  fontWeight: 600,
                                  borderBottom: "5px solid",
                                  borderBottomColor: this.props
                                    .themePrimaryColor
                                }
                              : null
                          }
                        >
                          {link.name}
                        </NavTabWithSub>
                        <div className="navbar-dropdown">
                          {link.sublinks.map((sublink, i) => {
                            return (
                              <NavSub
                                href={sublink.link}
                                key={i}
                                style={
                                  this.state.selectedSub === i &&
                                  this.state.selectedTab === index
                                    ? {
                                        color: this.props.themePrimaryColor,
                                        fontWeight: 600
                                      }
                                    : null
                                }
                                onClick={() =>
                                  this.selectMenuTab(sublink.name, index, i)
                                }
                                onMouseEnter={() =>
                                  this.hoverOn(sublink.name, index, i)
                                }
                                onMouseLeave={() => this.hoverOff()}
                              >
                                {sublink.name}
                              </NavSub>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else if (link.subMenus) {
                    return (
                      <div
                        className="navbar-item has-dropdown is-hoverable is-mega"
                        key={index}
                      >
                        <NavTabWithSub
                          className={"is-uppercase"}
                          style={
                            this.state.selectedTab === index
                              ? {
                                  color: this.props.themePrimaryColor,
                                  fontWeight: 600,
                                  borderBottom: "5px solid",
                                  borderBottomColor: this.props
                                    .themePrimaryColor
                                }
                              : null
                          }
                        >
                          {link.name}
                        </NavTabWithSub>
                        <div className="navbar-dropdown">
                          <div className="sgds-container is-fluid">
                            <div className="row">
                              {link.subMenus.map((subMenu, i) => {
                                return (
                                  <div className="col is-3" key={i}>
                                    <p className="navbar-item is-uppercase">
                                      <b>{subMenu.subMenuTitle}</b>
                                    </p>
                                    {subMenu.subMenuItems.map(
                                      (subMenuItem, b) => {
                                        return (
                                          <NavSub
                                            key={b}
                                            style={
                                              this.state.selectedTab ===
                                                index &&
                                              this.state.selectedSub === i &&
                                              this.state.selectedSubItem === b
                                                ? {
                                                    color: this.props
                                                      .themePrimaryColor,
                                                    fontWeight: 600
                                                  }
                                                : null
                                            }
                                            onClick={() =>
                                              this.selectMenuTab(
                                                subMenuItem.name,
                                                index,
                                                i,
                                                b
                                              )
                                            }
                                            onMouseEnter={() =>
                                              this.hoverOn(
                                                subMenuItem.name,
                                                index,
                                                i,
                                                b
                                              )
                                            }
                                            onMouseLeave={() => this.hoverOff()}
                                          >
                                            {subMenuItem.name}
                                          </NavSub>
                                        );
                                      }
                                    )}
                                  </div>
                                );
                              })}
                              {link.subMenuInfo ? (
                                <div className="col is-6">
                                  <div className="navbar-item is-wrapped">
                                    <p>
                                      <b>{link.subMenuInfo.title}</b>
                                      <br />
                                      {link.subMenuInfo.content}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <NavTabWithNoSub
                        className={"is-uppercase"}
                        href={link.link}
                        key={index}
                        style={
                          this.state.selectedTab === index
                            ? {
                                color: this.props.themePrimaryColor,
                                fontWeight: 600,
                                borderBottom: "5px solid",
                                borderBottomColor: this.props.themePrimaryColor
                              }
                            : null
                        }
                        onClick={() => this.selectMenuTab(link.name, index)}
                        onMouseEnter={() => this.hoverOn(link.name, index)}
                        onMouseLeave={() => this.hoverOff()}
                      >
                        {link.img ? (
                          <img src={link.img} alt={link.name} />
                        ) : (
                          link.name
                        )}
                      </NavTabWithNoSub>
                    );
                  }
                })}
              </div>
            ) : null}
            {this.props.displaySearch ? (
              <div className="navbar-end is-hidden-touch">
                <div className="navbar-item">
                  <button
                    className="sgds-button is-white is-large search-toggle"
                    data-target="searchbar-1"
                    onClick={() => this.toggleSearchBar()}
                  >
                    <span className="sgds-icon sgds-icon-search" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
        <div
          className={
            "sgds-container is-hidden-touch is-marginless" +
            (this.state.showSearch ? null : " hide")
          }
          id="searchbar-1"
        >
          <div className="row">
            <div className="col">
              <hr className="margin--bottom--sm" />
              <form>
                <div className="field has-addons padding--sm">
                  <div className="control has-icons-left is-expanded padding--bottom--sm">
                    <input
                      className="input is-fullwidth is-borderless is-shadowless"
                      id="nav-4-search"
                      type="text"
                      placeholder="What are you looking for?"
                      name="nav-4-search"
                      onChange={this.searchChangeHandler.bind(this)}
                    />
                    <span className="icon is-left">
                      <i className="search-bar-icon sgds-icon sgds-icon-search is-size-7" />
                    </span>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="sgds-button is-primary has-text-white padding--left padding--right"
                      style={{ backgroundColor: this.props.themePrimaryColor }}
                      onClick={this.searchClickHandler.bind(this)}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string
    })
  )
};

export default MainNav;
