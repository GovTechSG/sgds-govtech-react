import { render, waitFor } from '@testing-library/react';
import * as React from 'react';

import NavDropdownItem from '../NavDropdownItem';
import Nav from '../Nav';
import Navbar from '../../Navbar/Navbar';
import NavDropdown from '../NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', () => {
    const { getByTestId } = render(
      <NavDropdown
        defaultShow
        title="Title"
        className="test-class"
        id="nav-test"
        data-testid="test"
        show
        eventKey="1" 
      >
        <NavDropdownItem of="1"  eventKey="1">NavDropdownItem 1 content</NavDropdownItem>
        <NavDropdownItem of="1"  eventKey="2">NavDropdownItem 2 content</NavDropdownItem>
      </NavDropdown>
    );
    const navDropdownElem = getByTestId('test');
    waitFor(() => {
      expect(navDropdownElem.tagName).toEqual('LI');
      expect(navDropdownElem.classList).toContain('dropdown');
      expect(navDropdownElem.classList).toContain('test-class');

      expect(navDropdownElem.firstElementChild!.classList).toContain(
        'nav-link'
      );
      expect(navDropdownElem.firstElementChild!.textContent!).toEqual('Title');
    });
  });

  it('renders active toggle', () => {
    const { getByTestId } = render(
      <NavDropdown
        defaultShow
        active
        title="Title"
        id="nav-test"
        data-testid="test"
        eventKey="1"
      >
        <NavDropdownItem of="1" eventKey="1">NavDropdownItem of="1" 1 content</NavDropdownItem>
        <NavDropdownItem of="1"  eventKey="2">NavDropdownItem of="1" 2 content</NavDropdownItem>
      </NavDropdown>
    );
    const navDropdownElem = getByTestId('test');
    expect(navDropdownElem.firstElementChild!.classList).toContain('active');
  });

  it('should handle child active state', async () => {
    const { getByText } = render(
      <Nav activeKey="2">
        <NavDropdown     eventKey="1" show id="test-id" title="title" data-testid="test">
          <NavDropdownItem of="1"  eventKey="1">NavDropdownItem 1 content</NavDropdownItem>
          <NavDropdownItem of="1" eventKey="2">NavDropdownItem 2 content</NavDropdownItem>
          <NavDropdownItem of="1"  eventKey="3">NavDropdownItem 3 content</NavDropdownItem>
        </NavDropdown>
      </Nav>
    );

    expect(getByText('NavDropdownItem 2 content').classList).toContain('active');
    expect(getByText('NavDropdownItem 1 content').classList).not.toContain(
      'active'
    );
    expect(getByText('NavDropdownItem 3 content').classList).not.toContain(
      'active'
    );
  });

  it('should pass the id to the NavLink element', () => {
    const { getByTestId } = render(
      <NavDropdown eventKey="1" id="test-id" title="title" data-testid="test">
        <NavDropdownItem of="1" eventKey="1">NavDropdownItem 1 content</NavDropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').firstElementChild!.id).toEqual('test-id');
  });

  it('should support as as prop', () => {
    const { getByTestId } = render(
      <NavDropdown eventKey="1" as="li" id="test-id" title="title" data-testid="test">
        <NavDropdownItem of="1" eventKey="1">Item 1</NavDropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('li');
  });

  it('passes menuVariant to dropdown menu', () => {
    render(
      <NavDropdown eventKey="1" renderMenuOnMount title="blah" menuVariant="dark" id="test">
        <NavDropdownItem of="1">Item 1</NavDropdownItem>
      </NavDropdown>
    );
    expect(document.querySelector('.dropdown-menu-dark')!).not.toBeNull();
  });

  it('sets data-bs-popper attribute on dropdown menu', async () => {
    render(
      <Navbar>
        <NavDropdown eventKey="1" show id="test-id" title="title" data-testid="test">
          <NavDropdownItem of="1">Item 1</NavDropdownItem>
        </NavDropdown>
      </Navbar>
    );
    expect(
      document.querySelectorAll('.dropdown-menu[data-bs-popper="static"]')
        .length
    ).toEqual(1);
  });
  it('should have .has-megamenu when isMegaMenu is true ', () => {
    const { getByTestId, container } = render(
      <NavDropdown
      eventKey="1"
        isMegaMenu
        show
        id="test-id"
        title="title"
        data-testid="test"
      >
        <NavDropdownItem of="1">Item 1</NavDropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').classList).toContain('has-megamenu');
    expect(container.querySelector('.dropdown-menu')?.classList).toContain('mega-menu') 
  });
});
