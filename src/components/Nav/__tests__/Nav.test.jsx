import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import CardHeader from '../../Card/CardHeader';
import Nav from '../Nav';
import Navbar from '../../Navbar/Navbar';
import NavDropdown from '../NavDropdown';
import { shouldWarn } from '../../../utils/helpers';

describe('<Nav>', () => {
  it('should have div as default component', () => {
    const { getByTestId } = render(<Nav data-testid="test" />);
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('ul');
  }); 
 
  it('should have .sgds as default component but not when under navbar', () => {
    const { getByTestId, rerender } = render(<Nav data-testid="test" />);
    expect(getByTestId('test').classList).toContain('sgds'); 

    rerender(<Navbar><Nav data-testid="test" /></Navbar>)
    expect(getByTestId('test').classList).not.toContain('sgds'); 
    expect(getByTestId('test').classList).toContain('navbar-nav'); 

  }); 
 
  it('should set the correct item active', () => {
    const { getByTestId } = render(
      <Nav variant="pills" activeKey={1} data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>
    );
    const navLinks = getByTestId('test').children;

    expect(navLinks[0].classList).toContain('active');
    expect(navLinks[1].classList).not.toContain('active');
  });
  // OBSOLETE IN SGDS
  // it('should add variant class', () => {
  //   const { getByTestId } = render(
  //     <Nav variant="tabs" data-testid="test"> 
  //       <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
  //       <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
  //     </Nav>
  //   );
  //   const navElem = getByTestId('test');
  //   expect(navElem.classList).toContain('nav-tabs');
  //   expect(navElem.classList).toContain('nav');
  // });

  it('should add justified class', () => {
    const { getByTestId } = render(
      <Nav justify data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>
    );
    const navElem = getByTestId('test');
    expect(navElem.classList).toContain('nav-justified');
  });

  it('should add fill class', () => {
    const { getByTestId } = render(
      <Nav fill data-testid="test">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>
    );
    const navElem = getByTestId('test');
    expect(navElem.classList).toContain('nav-fill');
  });

  it('should be navbar aware', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav data-testid="test">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </Navbar>
    );
    const navItem = getByTestId('test');
    expect(navItem.classList).toContain('navbar-nav');
  });

  it('should handle navbarScroll if within navbar', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav navbarScroll data-testid="test" />
      </Navbar>
    );
    const navItem = getByTestId('test');
    expect(navItem.classList).toContain('navbar-nav-scroll');
  });

  it('should not add navbarScroll when not within navbar', () => {
    const { getByTestId } = render(<Nav navbarScroll data-testid="test" />);

    const navItem = getByTestId('test');
    expect(navItem.classList).not.toContain('navbar-nav-scroll');
  }); 
 // OBSOLETE IN SGDS
  // it('should be card header aware', () => {
  //   const { getByTestId } = render(
  //     <CardHeader>
  //       <Nav variant="pills" data-testid="test">
  //         <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
  //         <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
  //       </Nav>
  //     </CardHeader>
  //   );
  //   const navItem = getByTestId('test');
  //   expect(navItem.classList).toContain('card-header-pills');
  // });

  it('should call onSelect when a Nav.Link is selected', () => {
    const onSelectSpy = jest.fn();

    const { getByTestId } = render(
      // eslint-disable-next-line react/jsx-no-bind
      <Nav onSelect={onSelectSpy} data-testid="test">
        <Nav.Link eventKey={1}>Tab 1 content</Nav.Link>
        <Nav.Link eventKey={2}>
          <span>Tab 2 content</span>
        </Nav.Link>
      </Nav>
    );
    const navItem = getByTestId('test');
    fireEvent.click(navItem.lastElementChild);
    expect(onSelectSpy).toHaveBeenCalled()
  });

  it('should call onSelect when a NavDropdown.Item is selected', () => {
    const onSelectSpy = jest.fn();

    const { getByTestId } = render(
      <Nav onSelect={onSelectSpy}>
        <NavDropdown title="Dropdown" id="nav-dropdown-test" renderMenuOnMount>
          <NavDropdown.Item eventKey={1} data-testid="test">
            Dropdown item
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
    const dropdownItem = getByTestId('test');
    fireEvent.click(dropdownItem);

    waitFor(() => expect(onSelectSpy).toHaveBeenCalledTimes(1));
  });

  it('should set the correct item active by href', () => {
    const { getByTestId } = render(
      <Nav defaultActiveKey="#item1" data-testid="test">
        <Nav.Link href="#item1" className="test-selected">
          Pill 1 content
        </Nav.Link>
        <Nav.Link href="#item2">Pill 2 content</Nav.Link>
      </Nav>
    );
    const navItem = getByTestId('test');
    expect(navItem.firstElementChild.classList).toContain('active');
  });

  it('should warn when attempting to use a justify navbar nav', () => {
    shouldWarn('justify navbar `Nav`s are not supported');

    render(<Nav navbar justify />);
  });

  describe('Web Accessibility', () => {
    it('should have tablist and tab roles', () => {
      const Component = (props) => (
        <Nav data-testid="test" {...props}>
          <Nav.Link key={1}>Tab 1 content</Nav.Link>
          <Nav.Link key={2}>Tab 2 content</Nav.Link>
        </Nav>
      );
      const { rerender, getByTestId } = render(<Component />);

      rerender(<Component role="tablist" />);
      const navItem = getByTestId('test');
      expect(navItem.getAttribute('role')).toEqual('tablist');
      expect(navItem.querySelectorAll('a[role="tab"]').length).toEqual(2);
    });
  });
});
