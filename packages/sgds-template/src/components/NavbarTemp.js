import { Nav, NavDropdown, Navbar } from "@govtechsg/sgds-govtech-react/Nav";
import { Container } from "@govtechsg/sgds-govtech-react/Container";
import { Row } from "@govtechsg/sgds-govtech-react/Row";
import { Col } from "@govtechsg/sgds-govtech-react/Col";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const NavbarTemp = () => {
  const [active, setActive] = useState("home");
  const clickNavbarItem = (eventKey) => {
    setActive(eventKey);
  };
  return (
    <>
      <Navbar>
        <Navbar.Brand href='#'>
          <img
            src='https://www.developer.tech.gov.sg/assets/img/logo_color.svg'
            alt='Home'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto' navbarScroll activeKey={active}>
            <Nav.Item>
              <Nav.Link
              >
                <Link style={{ color: "inherit", textDecoration: 'none'}} to='/'>
                  Single Page
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
              >
                <Link style={{ color: "inherit", textDecoration: 'none'}} to='/multi'>
                  Multi Page
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
              >
                <Link style={{ color: "inherit", textDecoration: 'none'}} to='/collapsible'>
                  Collapsible Page
                </Link>
              </Nav.Link>
            </Nav.Item>
            <NavDropdown
              title='Dropdown'
              id='basic-nav-dropdown'
              href='https://google.com'
              eventKey='firstDropdown'
              onClick={() => clickNavbarItem("firstDropdown")}
            >
              <NavDropdown.Item
                href='#action/3.1'
                onClick={() => clickNavbarItem("firstDropdown")}
              >
                Action
              </NavDropdown.Item>
              <NavDropdown.Item
                href='#action/3.2'
                onClick={() => clickNavbarItem("firstDropdown")}
              >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item
                href='#action/3.3'
                onClick={() => clickNavbarItem("firstDropdown")}
              >
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href='#action/3.4'
                onClick={() => clickNavbarItem("firstDropdown")}
              >
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Dropdown
              isMegaMenu
              title='Megamenu'
              href='#'
              eventKey='mega'
              onClick={() => clickNavbarItem("mega")}
            >
              <Container fluid>
                <Row className='p-4'>
                  <Col>
                    <p>
                      <strong>
                        Co-create innovative digital solutions with the
                        Government
                      </strong>
                    </p>
                    <p>
                      Discover events, blogs, open-source technologies and other
                      collaboration opportunities
                    </p>
                  </Col>
                  <Col>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#'>Features</NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      onClick={() => clickNavbarItem("mega")}
                    >
                      Features
                    </NavDropdown.Item>
                  </Col>
                </Row>
              </Container>
            </Nav.Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarTemp;
