/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Brand from "./Brand";
import PropTypes from "prop-types";

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedSub: 0,
      selectedSunItem: 0,
      showSearch: false
    };
  }
  selectMenuTab = (item, index, subIndex, subMenuIndex) => {
    this.props.selectItem(item);
    if (subMenuIndex >= 0) {
      this.setState({
        selectedTab: index,
        selectedSub: subIndex,
        selectedSunItem: subMenuIndex
      });
    } else if (subIndex >= 0) {
      this.setState({
        selectedTab: index,
        selectedSub: subIndex,
        selectedSunItem: null
      });
    } else {
      this.setState({
        selectedTab: index,
        selectedSub: null,
        selectedSunItem: null
      });
    }
  };
  toggleSearchBar = () => {
    this.setState(
      {
        showSearch: !this.state.showSearch
      },
      () => console.log(this.state.showSearch)
    );
  };
  // hoverOn = index => {
  //   this.setState(
  //     {
  //       selected: index
  //     }
  //   );
  // };
  // hoverOff = () => {
  //   this.setState({
  //     selected: null
  //   });
  // };
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="sgds-container">
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
                        <a
                          className={
                            "navbar-link is-uppercase" +
                            (this.state.selectedTab === index
                              ? " is-active"
                              : "")
                          }
                        >
                          {link.name}
                        </a>
                        <div className="navbar-dropdown">
                          {link.sublinks.map((sublink, i) => {
                            return (
                              <a
                                className={
                                  "navbar-item" +
                                  (this.state.selectedSub === i &&
                                  this.state.selectedTab === index
                                    ? " is-active"
                                    : "")
                                }
                                href={sublink.link}
                                key={i}
                                onClick={() =>
                                  this.selectMenuTab(sublink.name, index, i)
                                }
                              >
                                {sublink.name}
                              </a>
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
                        <a
                          className={
                            "navbar-link is-uppercase" +
                            (this.state.selectedTab === index
                              ? " is-active"
                              : "")
                          }
                        >
                          {link.name}
                        </a>
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
                                          <a
                                            className={
                                              "navbar-item" +
                                              (this.state.selectedTab ===
                                                index &&
                                              this.state.selectedSub === i &&
                                              this.state.selectedSunItem === b
                                                ? " is-active"
                                                : "")
                                            }
                                            key={b}
                                            onClick={() =>
                                              this.selectMenuTab(
                                                subMenuItem.name,
                                                index,
                                                i,
                                                b
                                              )
                                            }
                                          >
                                            {subMenuItem.name}
                                          </a>
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
                      <a
                        href={link.link}
                        key={index}
                        className={
                          "navbar-item is-uppercase" +
                          (this.state.selectedTab === index
                            ? " is-active"
                            : "") +
                          " is-tab"
                        }
                        onClick={() => this.selectMenuTab(link.name, index)}
                      >
                        {link.img ? (
                          <img src={link.img} alt={link.name} />
                        ) : (
                          link.name
                        )}
                      </a>
                    );
                  }
                })}
              </div>
            ) : null}
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
          </div>
        </nav>
        <div
          className={
            "sgds-container is-fluid is-hidden-touch is-marginless" +
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
                    />
                    <span className="icon is-left">
                      <i className="search-bar-icon sgds-icon sgds-icon-search is-size-7" />
                    </span>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="sgds-button is-primary has-text-white padding--left padding--right"
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
      // link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string
    })
  )
};

export default MainNav;
