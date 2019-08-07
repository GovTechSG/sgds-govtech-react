/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Element
import {
  MainNav,
  Button,
  Breadcrumb,
  AccordionBar,
  Card,
  Callout
} from "../common";

// Import Redux Store
import {
  updateTableHeadColor,
  updateTableHoverable,
  updateTableFullwidth,
  updateThemePrimaryColor
} from "../../store/actions/index";

class Template extends Component {
  mainNavItems = {
    brand: {
      img: "https://www.designsystem.gov.sg/assets/img/logo_sgds.png",
      name: "Brand",
      link: ""
    },
    links: [
      {
        img: "",
        name: "MEGA MENU1",
        subMenuInfo: {
          title: "Sub Menu 1 Info",
          content:
            "You can put short paragraph of information here to describe about this section."
        },
        subMenus: [
          {
            subMenuTitle: "SUB MENU 1A",
            subMenuItems: [
              {
                name: "Sub Link 1",
                link: "#link1"
              },
              {
                name: "Sub Link 2",
                link: "#link1"
              },
              {
                name: "Sub Link 3",
                link: "#link1"
              }
            ]
          },
          {
            subMenuTitle: "SUB MENU 1B",
            subMenuItems: [
              {
                name: "SUB MENU 2A",
                link: "#link1"
              },
              {
                name: "SUB MENU 2A",
                link: "#link1"
              },
              {
                name: "SUB MENU 2A",
                link: "#link1"
              }
            ]
          }
        ]
      },
      {
        img: "",
        name: "Link2",
        sublinks: [
          {
            img: "",
            name: "SubLink2-1"
          },
          {
            img: "",
            name: "SubLink2-2"
          },
          {
            img: "",
            name: "SubLink2-3"
          }
        ]
      },
      {
        img: "",
        name: "Link3"
      }
    ]
  };

  selectMenuItem = item => {
    console.log(item);
  };
  render() {
    return (
      <div className="template">
        <div className="sgds-masthead">
          <div className="sgds-container">
            <div className="row">
              <div className="col">
                <a
                  href="https://www.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sgds-icon sgds-icon-sg-crest" />
                  <span className="is-text">
                    A Singapore Government Agency Website
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <MainNav
          brand={this.mainNavItems.brand}
          links={this.mainNavItems.links}
          selectItem={this.selectMenuItem}
          themePrimaryColor={this.props.themePrimaryColor}
          displaySeardh={false}
          isFluid={true}
        />
        <section className="sgds-hero has-background-primary">
          <div className="sgds-hero-body sgds-container is-fluid">
            <div className="row is-vcentered">
              <div className="col is-8 is-offset-2 has-text-white has-text-centered">
                <h1 className="display">
                  <b>SGDS</b>
                </h1>
                <h5 className="is-hidden-mobile margin--top--lg  margin--bottom--lg">
                  The Singapore Government Design System (SGDS) was developed to
                  unite teams in creating fast, accessible and mobile friendly
                  digital services with a common set of UI components that
                  comply to the Digital Service Standards.
                </h5>
                <div className="field has-addons">
                  <div className="control  is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="Find a repository"
                    />
                  </div>
                  <div className="control">
                    <a className="sgds-button is-white is-outlined">Search</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="sgds-section is-paddingless has-background-secondary"
          id="key-highlights"
        >
          <div className="sgds-container">
            <div className="row is-gapless has-text-centered">
              <div className="col">
                <a href="/learn" className="has-text-white">
                  <p className="margin--bottom--xs">
                    <b>Lorem, ipsum dolor.</b>
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae, accusamus!
                  </p>
                </a>
              </div>
              <div className="col">
                <a href="/docs" className="has-text-white">
                  <p className="margin--bottom--xs">
                    <b>Lorem, ipsum dolor.</b>
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae, accusamus!
                  </p>
                </a>
              </div>
              <div className="col">
                <a href="/coming-soon" className="has-text-white">
                  <p className="margin--bottom--xs">
                    <b>Lorem, ipsum dolor.</b>
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae, accusamus!
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="sgds-section has-background-light">
          <div className="sgds-container">
            <div className="content">
              <div className="row has-text-centered">
                <div className="col is-10 is-offset-1">
                  <h2 className="has-text-secondary padding--bottom">
                    Lorem ipsum dolor sit amet.
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col is-10 is-offset-1">
                  <div className="row">
                    <div className="col is-4 is-flex">
                      <a href="/learn/development">
                        <div className="sgds-card sgds-card-button">
                          <div className="sgds-card-image">
                            <figure className="sgds-image is-16by9">
                              <img src="https://placehold.it/350x250" alt="" />
                            </figure>
                          </div>
                          <div className="sgds-card-content">
                            <h6 className="padding--bottom has-text-weight-semibold">
                              Lorem, ipsum.
                            </h6>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Illum, facilis?
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="col is-4 is-flex">
                      <a href="/learn/design">
                        <div className="sgds-card sgds-card-button">
                          <div className="sgds-card-image">
                            <figure className="sgds-image is-16by9">
                              <img src="https://placehold.it/350x250" alt="" />
                            </figure>
                          </div>
                          <div className="sgds-card-content">
                            <h6 className="padding--bottom has-text-weight-semibold">
                              Lorem, ipsum.
                            </h6>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Saepe, unde.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="col is-4 is-flex">
                      <a href="/learn/writing">
                        <div className="sgds-card sgds-card-button">
                          <div className="sgds-card-image">
                            <figure className="sgds-image is-16by9">
                              <img src="https://placehold.it/350x250" alt="" />
                            </figure>
                          </div>
                          <div className="sgds-card-content">
                            <h6 className="padding--bottom has-text-weight-semibold">
                              Lorem, ipsum.
                            </h6>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Natus, omnis.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sgds-container">
            <div className="row">
              <div className="col is-10 is-offset-1">
                <div className="row">
                  <div className="col is-4">
                    <a href="" className="is-media-card">
                      <div className="sgds-card is-success">
                        <div className="sgds-card-content">
                          <header>
                            <div className="padding--bottom">test</div>
                            <div>
                              <h5 className="has-text-weight-bold">Title</h5>
                            </div>
                          </header>
                          <footer>
                            <span>19 oct 2018</span>
                            <span className="sgds-icon sgds-icon-download" />
                          </footer>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col is-4">
                    <a href="" className="is-media-card">
                      <div className="sgds-card is-warning">
                        <div className="sgds-card-content">
                          <header>
                            <div className="padding--bottom">test</div>
                            <div>
                              <h5 className="has-text-weight-bold">Title</h5>
                            </div>
                          </header>
                          <footer>
                            <span>19 oct 2018</span>
                            <span className="sgds-icon sgds-icon-download" />
                          </footer>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col is-4">
                    <a href="" className="is-media-card">
                      <div className="sgds-card is-danger">
                        <div className="sgds-card-content">
                          <header>
                            <div className="padding--bottom">test</div>
                            <div>
                              <h5 className="has-text-weight-bold">Title</h5>
                            </div>
                          </header>
                          <footer>
                            <span>19 oct 2018</span>
                            <span className="sgds-icon sgds-icon-download" />
                          </footer>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="sgds-section">
          <div className="sgds-container">
            <div className="row has-text-centered">
              <div className="col is-10 is-offset-1">
                <h2 className="has-text-secondary padding--bottom">
                  Lorem ipsum dolor sit.
                </h2>
              </div>
            </div>
            <div className="row has-text-centered">
              <div className="col is-10 is-offset-1">
                <div className="row">
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-primary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-primary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-primary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                </div>
                <div className="row margin--top--lg">
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-secondary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-secondary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                  <div className="col is-4">
                    <h6 className="has-text-weight-bold">Lorem, ipsum.</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora, quod.
                    </p>
                    <a
                      className="sgds-button is-secondary margin--top"
                      role="button"
                    >
                      button
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sgds-section has-background-light">
          <div className="sgds-container">
            <div className="row">
              <div className="col is-10 is-offset-1">
                <div className="row is-flex-alignitems-c">
                  <div className="col">
                    <h4>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestias, at.
                    </h4>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquam quo quis provident nesciunt ut maiores minima,{" "}
                      <a href="">ipsa explicabo doloremque quae</a>?
                    </p>
                  </div>
                  <div className="col has-text-centered">
                    <img src="https://placehold.it/350x250" alt="" />
                  </div>
                </div>
                <div className="row is-flex-alignitems-c">
                  <div className="col has-text-centered">
                    <img src="https://placehold.it/350x250" alt="" />
                  </div>
                  <div className="col">
                    <h4>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestias, at.
                    </h4>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquam quo quis provident nesciunt ut maiores minima,{" "}
                      <a href="">ipsa explicabo doloremque quae</a>?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sgds-section">
          <div className="sgds-container">
            <div className="row">
              <div className="col is-10 is-offset-1">
                <h2 className="has-text-dark padding--bottom has-text-centered">
                  Lorem ipsum dolor sit.
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col is-10 is-offset-1">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Header Field A</th>
                      <th>Header Field B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Data 1A</td>
                      <td>Data 1B</td>
                    </tr>
                    <tr>
                      <td>Data 1A</td>
                      <td>Data 1B</td>
                    </tr>
                    <tr className="has-background-primary has-text-white">
                      <td>Data 1A</td>
                      <td>Data 1B</td>
                    </tr>
                    <tr className="has-background-secondary has-text-white">
                      <td>Data 2A</td>
                      <td>Data 2B</td>
                    </tr>
                    <tr className="has-background-warning has-text-white">
                      <td>Data 3A</td>
                      <td>Data 3B</td>
                    </tr>
                    <tr className="has-background-danger has-text-white">
                      <td>Data 3A</td>
                      <td>Data 3B</td>
                    </tr>
                    <tr className="has-background-success has-text-white">
                      <td>Data 3A</td>
                      <td>Data 3B</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <section className="sgds-section has-background-secondary">
          <div className="sgds-container">
            <div className="content has-text-white">
              <div className="row has-text-centered">
                <div className="col is-10 is-offset-1">
                  <h2>Lorem ipsum dolor sit amet.</h2>
                </div>
              </div>
              <div className="row has-text-centered">
                <div className="col is-8 is-offset-2">
                  <p className="has-text-white">
                    SGDS is{" "}
                    <a
                      href="https://github.com/govtechsg/sgds"
                      className="has-text-white"
                      style={{ textDecoration: "underline" }}
                    >
                      open source.
                    </a>
                  </p>
                  <p className="has-text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis aspernatur harum modi ullam dignissimos delectus
                    quae officiis eveniet dicta sequi.
                  </p>
                </div>
              </div>
              <div className="row padding--top padding--bottom">
                <div className="col has-text-centered">
                  <a
                    className="sgds-button is-outlined is-white"
                    href="https://form.gov.sg/forms/govtech/5bc440ac507956000fdbae91"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Let's Connect
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="sgds-footer top-section">
          <div className="sgds-container">
            <div className="row">
              <div className="col">
                <h5 className="has-text-white">
                  <b>Design System</b>
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col is-3">
                <p className="has-text-white">
                  <b>Category 1</b>
                </p>
                <p>
                  <a href="">Link</a>
                </p>
                <p>
                  <a href="">Link</a>
                </p>
              </div>
              <div className="col is-3">
                <p className="has-text-white">
                  <b>Category 2</b>
                </p>
                <p>
                  <a href="">Link</a>
                </p>
                <p>
                  <a href="">Link</a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col is-right-desktop-only">
                <ul>
                  <li className="is-inline-block-desktop-only">
                    <p>
                      <a href="" target="_blank" rel="noopener noreferrer">
                        Contact
                      </a>
                    </p>
                  </li>
                  <li className="is-inline-block-desktop-only">
                    <p>
                      <a href="" target="_blank" rel="noopener noreferrer">
                        Feedback
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <footer className="sgds-footer bottom-section">
          <div className="sgds-container">
            <div className="row is-multiline">
              <div className="col is-12">
                <ul>
                  <li>
                    <a
                      href="https://tech.gov.sg/report_vulnerability"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Report Vulnerability
                    </a>
                  </li>
                  <li>
                    <a href="">Privacy</a>
                  </li>
                  <li>
                    <a href="">Terms of Use</a>
                  </li>
                </ul>
              </div>
              <div className="col is-12 has-text-right-desktop has-text-right-tablet has-text-left-mobile">
                <p className="is-hidden-touch">
                  {" "}
                  © 2019 Government of Singapore. Last Updated 26 Jul 2019
                </p>
                <p className="is-hidden-desktop">
                  © 2019 Government of Singapore
                </p>
                <p className="is-hidden-desktop last-updated">
                  Last Updated 26 Jul 2019
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    themePrimaryColor: state.cssProperties.themePrimaryColor,
    themeSecondaryColor: state.cssProperties.themeSecondaryColor,
    infoColor: state.cssProperties.infoColor,
    successColor: state.cssProperties.successColor,
    dangerColor: state.cssProperties.dangerColor,
    warningColor: state.cssProperties.warningColor,
    tableHeadColor: state.cssProperties.tableHeadColor,
    tableIsNarrow: state.cssProperties.tableIsNarrow,
    tableIsHoverable: state.cssProperties.tableIsHoverable,
    tableIsFullwidth: state.cssProperties.tableIsFullwidth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTableHeadColor: color => dispatch(updateTableHeadColor(color)),
    updateTableHoverable: isHoverable =>
      dispatch(updateTableHoverable(isHoverable)),
    updateTableFullwidth: isFullWidth =>
      dispatch(updateTableFullwidth(isFullWidth)),
    updateThemePrimaryColor: themePrimaryColor =>
      dispatch(updateThemePrimaryColor(themePrimaryColor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
