'use client'
import { Navbar, Nav, Container, Row, Col } from '@govtechsg/sgds-react';
import { useState } from 'react';

const NavCom = () => {
    const [activeK, setActiveK] = useState('4');
    const [activeDropdownLink, setActiveDropdownLink] = useState('4.1');

    return (
        <Navbar>
            <Nav activeKey={activeK}>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        Link
                    </Nav.Link>
                </Nav.Item>
                <Nav.Dropdown
                    eventKey="4"
                    title="Dropdown"
                    id="nav-dropdown"
                >
                    <Nav.Dropdown.Item
                        eventKey="4.1"
                        active={activeDropdownLink === '4.1'}
                    >
                        Action
                    </Nav.Dropdown.Item>
                    <Nav.Dropdown.Item
                        eventKey="4.2"
                        active={activeDropdownLink === '4.2'}
                    >
                        Another action
                    </Nav.Dropdown.Item>
                    <Nav.Dropdown.Item
                        eventKey="4.3"
                        active={activeDropdownLink === '4.3'}
                    >
                        Something else here
                    </Nav.Dropdown.Item>
                    <Nav.Dropdown.Divider />
                    <Nav.Dropdown.Item
                        eventKey="4.4"
                        active={activeDropdownLink === '4.4'}
                    >
                        Separated link
                    </Nav.Dropdown.Item>
                </Nav.Dropdown>
                <Nav.Dropdown
                    eventKey="5"
                    isMegaMenu
                    title="Megamenu"
                    id="nav-mega"
                >
                    <Container>
                        <Row>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.1"
                                    active={activeDropdownLink === '5.1'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.2"
                                    active={activeDropdownLink === '5.2'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.3"
                                    active={activeDropdownLink === '5.3'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.4"
                                    active={activeDropdownLink === '5.4'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.5"
                                    active={activeDropdownLink === '5.5'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                            <Col>
                                <Nav.Dropdown.Item
                                    eventKey="5.6"
                                    active={activeDropdownLink === '5.6'}
                                >
                                    Action
                                </Nav.Dropdown.Item>
                            </Col>
                        </Row>
                    </Container>
                </Nav.Dropdown>
            </Nav>
        </Navbar>
    );
}

export default NavCom;
