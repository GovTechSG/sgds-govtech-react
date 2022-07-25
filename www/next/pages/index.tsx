import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button, Row, Col, Container, Badge } from "@govtechsg/sgds-react"; 
import { Nav, NavDropdown, Navbar } from '@govtechsg/sgds-react/Nav'
// import { Navbar } from '@govtechsg/sgds-react/Navbar'

import { Tabs, Tab} from '@govtechsg/sgds-react/Tabs'
import { CloseButton } from "@govtechsg/sgds-react/CloseButton";
import { Alert } from "@govtechsg/sgds-react/Alert";
// import { TooltipBox } from "@govtechsg/sgds-react/esm/Tooltip";
// import {Tooltip} from "./tooltip";
import { TooltipBox, Tooltip } from "@govtechsg/sgds-react/Tooltip";
import { Toast } from "@govtechsg/sgds-react/Toast";
import { Accordion } from "@govtechsg/sgds-react";
import { SideNav } from "@govtechsg/sgds-react/SideNav";
import { Modal } from "@govtechsg/sgds-react/Modal";
import { Overlay } from "@govtechsg/sgds-react/Overlay";
import { FileUpload } from "@govtechsg/sgds-react/FileUpload";
import { Form } from '@govtechsg/sgds-react/Form'
import {  Combobox } from "@govtechsg/sgds-react/Combobox";
// import { SgdsMasthead } from "@govtechsg/sgds-masthead-react";
// import { Dropdown } from "@govtechsg/sgds-react";
// import { Button } from '@govtechsg/sgds-react'
// const {Button} = require('@govtechsg/sgds-react')
import { useState, useRef } from "react";
// import { Dropdown } from "react-bootstrap";
import dynamic from 'next/dynamic'
import { DatePicker } from "@govtechsg/sgds-react/DatePicker";

const {Dropdown} = require('@govtechsg/sgds-react/Dropdown')

const TabsCom = () => (
  <>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Home">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </Tab>
      <Tab eventKey="profile" title="Profile">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source.
      </Tab>
    </Tabs>
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example2"
      variant="tabs-basic-toggle"
    >
      <Tab
        eventKey="home"
        title="Home"
        contentLeft={<i className="bi bi-house left"></i>}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </Tab>
      <Tab
        eventKey="profile"
        title="Profile"
        contentRight={
          <Badge bg="light" text="dark" className="right">
            99
          </Badge>
        }
      >
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum
      </Tab>
      <Tab
        eventKey="contact"
        title="Contact"
        contentRight={<i className="bi bi-telephone right"></i>}
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        look like readable English.
      </Tab>
    </Tabs>
    <Tabs
  defaultActiveKey="profile"
  id="uncontrolled-tab-example3"
  variant="tabs-info-toggle"
>
  <Tab
    eventKey="home"
    title="Home"
    contentLeft={<i className="bi bi-house"></i>}
    contentBottom={99}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco
  </Tab>
  <Tab
    eventKey="profile"
    title="Profile"
    contentBottom={
      <Badge bg="light" text="dark" className="right">
        99
      </Badge>
    }
  >
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has
    roots in a piece of classical Latin literature from 45 BC, making it over
    2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
    College in Virginia, looked up one of the more obscure Latin words,
    consectetur, from a Lorem Ipsum
  </Tab>
</Tabs>
  </>
);
const NavbarCom = () => {
  const [active, setActive] = useState('home');
  const clickNavbarItem = (eventKey: string) => {
    setActive(eventKey);
  };
  return (
    <Navbar>
      <Navbar.Brand href="#">
        <img
          src="https://www.developer.tech.gov.sg/assets/img/logo_color.svg"
          alt="Home"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" navbarScroll activeKey={active}>
          <Nav.Item>
            <Nav.Link
              href="#"
              eventKey="home"
              onClick={() => clickNavbarItem('home')}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              eventKey="link"
              onClick={() => clickNavbarItem('link')}
            >
              Link
            </Nav.Link>
          </Nav.Item>
          <NavDropdown
            title="Dropdown"
            id="basic-nav-dropdown"
            eventKey="firstDropdown"
            onClick={() => clickNavbarItem('firstDropdown')}
          >
            <NavDropdown.Item
              href="#action/3.1"
              onClick={() => clickNavbarItem('firstDropdown')}
            >
              Action
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#action/3.2"
              onClick={() => clickNavbarItem('firstDropdown')}
            >
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#action/3.3"
              onClick={() => clickNavbarItem('firstDropdown')}
            >
              Something
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="#action/3.4"
              onClick={() => clickNavbarItem('firstDropdown')}
            >
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Dropdown
            isMegaMenu
            title="Megamenu"
            eventKey="mega"
            onClick={() => clickNavbarItem('mega')}
          >
            <Container fluid>
              <Row className="p-4">
                <Col>
                  <p>
                    <strong>
                      Co-create innovative digital solutions with the Government
                    </strong>
                  </p>
                  <p>
                    Discover events, blogs, open-source technologies and other
                    collaboration opportunities
                  </p>
                </Col>
                <Col>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                </Col>
                <Col>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                </Col>
                <Col>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
                  >
                    Features
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Features</NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => clickNavbarItem('mega')}
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
  );
};

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const target = useRef(null);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const [selectedFile, setSelectedFile] = useState({});
 const onChangeFile = (data: any) => {
    setSelectedFile(data);
  };

  return (
    <div className={styles.container}>
      <>
      {/* <SgdsMasthead/> */}
      <TabsCom/>  
      <NavbarCom/>
      <DatePicker
  initialValue={new Date('2020-01-01')}
  displayDate={new Date('2020-01-01')}
/>
      <Form>
      <FileUpload
        controlId="fileupload1"
        onChangeFile={onChangeFile}
        selectedFile={selectedFile}
      >
        <i className="bi bi-upload me-2"></i>Choose a file
      </FileUpload>
    </Form>
      <Combobox menuList={["apple", "orange", "banana"]}></Combobox>
        <Button variant="primary" onClick={handleShow}>
          modal
        </Button>
        <Modal show={modalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo,reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
        <div>
          <CloseButton></CloseButton>
          <Dropdown>
            <Dropdown.Toggle id="dropdownidomg">
              Dropdown Button<i className="bi bi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Clicked")}>
                Something else
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <br />
          <br />
          <br />
          <br />
          <>
            <Button ref={target} onClick={() => setShow(!show)}>
              Click me!
            </Button>
            <Overlay target={target.current} show={show} placement="right">
              {(props) => (
                <TooltipBox id="overlay-example" {...props}>
                  My Tooltip
                </TooltipBox>
              )}
            </Overlay>
          </>
          <Tooltip type="click" content="im a tooltip">
            <button>Tooltip</button>
          </Tooltip>
          <Tooltip type="hover" content="im a tooltip">
            <button>Hover</button>
          </Tooltip>
        </div>
        <SideNav>
          <SideNav.Item eventKey="0">
            <SideNav.Button>SideNav Item #1</SideNav.Button>
            <SideNav.Collapse>
              <>
                <SideNav.Link eventKey="nl-1" href="#">
                  number one
                </SideNav.Link>
                <SideNav.Link eventKey="nl-2" href="#">
                  number one
                </SideNav.Link>
                <SideNav.Link eventKey="nl-3" href="#">
                  number one
                </SideNav.Link>
              </>
            </SideNav.Collapse>
          </SideNav.Item>
          <SideNav.Item eventKey="1">
            <SideNav.Button>SideNav Item #2</SideNav.Button>
            <SideNav.Collapse>
              <>
                <SideNav.Link eventKey="nl-4">number two</SideNav.Link>
                <SideNav.Link eventKey="nl-6">number two</SideNav.Link>
                <SideNav.Link eventKey="nl-7">number two</SideNav.Link>
                <SideNav.Link eventKey="nl-8">number two</SideNav.Link>
              </>
            </SideNav.Collapse>
          </SideNav.Item>
          <SideNav.Item eventKey="2">
            <SideNav.Button href="#">SideNav Item #3</SideNav.Button>
          </SideNav.Item>
        </SideNav>
        {/* {<Tooltip content="this is tooltip"><div>Test</div></Tooltip>} */}
        <Alert>Alert</Alert>
        <Button>Button</Button>
        <Toast>Toast</Toast>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
    </div>
  );
};

export default Home;
