import { render, waitFor } from '@testing-library/react';
import * as React from 'react';

import DropdownItem from '../../Dropdown/DropdownItem';
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
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
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
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>
    );
    const navDropdownElem = getByTestId('test');
    expect(navDropdownElem.firstElementChild!.classList).toContain('active');
  });

  it('should handle child active state', async () => {
    const { getByText } = render(
      <Nav activeKey="2">
        <NavDropdown show id="test-id" title="title" data-testid="test">
          <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
          <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
          <DropdownItem eventKey="3">DropdownItem 3 content</DropdownItem>
        </NavDropdown>
      </Nav>
    );

    expect(getByText('DropdownItem 2 content').classList).toContain('active');
    expect(getByText('DropdownItem 1 content').classList).not.toContain(
      'active'
    );
    expect(getByText('DropdownItem 3 content').classList).not.toContain(
      'active'
    );
  });

  it('should pass the id to the NavLink element', () => {
    const { getByTestId } = render(
      <NavDropdown id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').firstElementChild!.id).toEqual('test-id');
  });

  it('should support as as prop', () => {
    const { getByTestId } = render(
      <NavDropdown as="li" id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('li');
  });

  it('passes menuVariant to dropdown menu', () => {
    render(
      <NavDropdown renderMenuOnMount title="blah" menuVariant="dark" id="test">
        <DropdownItem>Item 1</DropdownItem>
      </NavDropdown>
    );
    expect(document.querySelector('.dropdown-menu-dark')!).not.toBeNull();
  });

  it('sets data-bs-popper attribute on dropdown menu', async () => {
    render(
      <Navbar>
        <NavDropdown show id="test-id" title="title" data-testid="test">
          <DropdownItem>Item 1</DropdownItem>
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
        isMegaMenu
        show
        id="test-id"
        title="title"
        data-testid="test"
      >
        <DropdownItem>Item 1</DropdownItem>
      </NavDropdown>
    );
    expect(getByTestId('test').classList).toContain('has-megamenu');
    expect(container.querySelector('.dropdown-menu')?.classList).toContain('mega-menu') 
  });
});
