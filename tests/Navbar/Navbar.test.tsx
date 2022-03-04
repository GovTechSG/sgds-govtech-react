import { fireEvent, render } from '@testing-library/react';
import { Nav } from '../../src/Nav';
import { Navbar } from '../../src/Navbar';
import * as React from 'react';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    const { getByTestId } = render(<Navbar data-testid="test" />);
    const navbarElem = getByTestId('test');

    expect(navbarElem.classList).toContain('navbar');
    expect(navbarElem.classList).toContain('navbar-expand');
    expect(navbarElem.classList).toContain('navbar-light');
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    const { getByTestId } = render(<Navbar as="div" data-testid="test" />);
    const navbarElem = getByTestId('test');

    expect(navbarElem.tagName.toLowerCase()).toEqual('div');
    expect(navbarElem.getAttribute('role')!).toEqual('navigation');
  });

  it('Should add fixed=top|bottom variation', () => {
    const { getByTestId: getByFirstTestId } = render(
      <Navbar fixed="top" data-testid="test1" />
    );
    const firstNavbarElem = getByFirstTestId('test1');
    expect(firstNavbarElem.classList).toContain('fixed-top');

    const { getByTestId: getBySecondTestId } = render(
      <Navbar fixed="bottom" data-testid="test2" />
    );
    const navbarElem = getBySecondTestId('test2');
    expect(navbarElem.classList).toContain('fixed-bottom');
  });

  it('Should override role attribute', () => {
    const { getByTestId } = render(<Navbar role="banner" data-testid="test" />);
    expect(getByTestId('test').getAttribute('role')!).toEqual('banner');
  });

  describe('Brand', () => {
    it('Should render brand', () => {
      const { getByTestId } = render(<Navbar.Brand data-testid="test" />);
      const navbarBrandElem = getByTestId('test');
      expect(navbarBrandElem.classList).toContain('navbar-brand');
      expect(navbarBrandElem.tagName.toLowerCase()).toEqual('span');
    });

    it('Should render brand as anchor', () => {
      const { getByTestId } = render(
        <Navbar.Brand href="#" data-testid="test" />
      );
      const navbarBrandElem = getByTestId('test');
      expect(navbarBrandElem.classList).toContain('navbar-brand');
      expect(navbarBrandElem.tagName.toLowerCase()).toEqual('a');
    });
  });

  it('Should pass navbar context to navs', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav data-testid="test" />
      </Navbar>
    );
    const navElem = getByTestId('test');
    expect(navElem.classList).toContain('navbar-nav');
  });

  it('Should add custom toggle', () => {
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle as="p" data-testid="test">
          hi
        </Navbar.Toggle>
      </Navbar>
    );
    const navToggleElem = getByTestId('test');
    expect(navToggleElem.textContent!).toEqual('hi');
    expect(navToggleElem.classList).toContain('navbar-toggler');
    expect(navToggleElem.tagName.toLowerCase()).toEqual('p');
  });

  it('Should trigger onToggle', () => {
    const toggleSpy = jest.fn();
    const { getByTestId } = render(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Toggle data-testid="test" />
      </Navbar>
    );
    const toggleElem = getByTestId('test');
    fireEvent.click(toggleElem);

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith(true);
  });

  it('Should not swallow onClick', () => {
    const clickSpy = jest.fn();

    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle onClick={clickSpy} data-testid="test" />
      </Navbar>
    );
    const toggleElem = getByTestId('test');
    fireEvent.click(toggleElem);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('Should render collapse', () => {
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>
    );
    expect(getByTestId('test').classList).toContain('navbar-collapse');
  });

  it('Should pass expanded to Collapse', () => {
    const { getByTestId } = render(
      <Navbar expanded>
        <Navbar.Collapse data-testid="test">hello</Navbar.Collapse>
      </Navbar>
    );
    const toggleElem = getByTestId('test');
    expect(toggleElem.classList).toContain('show');
  });

  it('Should wire the toggle to the collapse', (done) => {
    const clock = jest.useFakeTimers();

    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle data-testid="toggler" />
        <Navbar.Collapse data-testid="collapse">hello</Navbar.Collapse>
      </Navbar>
    );

    let toggleElem = getByTestId('toggler');
    let collapseElem = getByTestId('collapse');

    expect(collapseElem.classList).not.toContain('show');
    expect(toggleElem.classList).toContain('collapsed');

    fireEvent.click(toggleElem);
    clock.advanceTimersByTime(500);

    toggleElem = getByTestId('toggler');
    collapseElem = getByTestId('collapse');

    expect(collapseElem.classList).toContain('show');
    expect(toggleElem.classList).not.toContain('collapsed');
    clock.useRealTimers();
    done();
  });

  it('Should open external href link in collapseOnSelect', () => {
    const spy = jest.fn((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
    });
    const { getByTestId } = render(
      <Navbar>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link
              href="https://www.google.com"
              data-testid="test"
              onClick={spy}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    const linkItem = getByTestId('test');
    fireEvent.click(linkItem);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getByTestId('test').getAttribute('href')!).toEqual(
      'https://www.google.com'
    );
  });

  it('Should fire external href click', (done) => {
    const spy = jest.fn((e) => {
      // prevent actual redirect
      e.persist();
      e.preventDefault();
      done();
    });
    const { getByTestId } = render(
      <Navbar expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="https://www.google.com" onClick={spy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    const innerLinkItem = getByTestId('test');
    fireEvent.click(innerLinkItem);
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const toggleSpy = jest.fn();
    const navItemSpy = jest.fn();
    const { getByTestId } = render(
      <Navbar collapseOnSelect onToggle={toggleSpy} expanded>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#" onClick={navItemSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    const innerLinkElem = getByTestId('test');
    fireEvent.click(innerLinkElem);

    expect(navItemSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', () => {
    const selectSpy = jest.fn();
    const navItemSpy = jest.fn();

    const { getByTestId } = render(
      <Navbar onSelect={selectSpy}>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="div">
            <Nav.Link href="#home" onClick={navItemSpy}>
              <span className="link-text" data-testid="test">
                Option 1
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    const innerLinkElem = getByTestId('test');
    fireEvent.click(innerLinkElem);

    expect(navItemSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledWith('#home', expect.anything());
  });

  it('Should have nav as default component', () => {
    const { getByTestId } = render(<Navbar data-testid="test" />);
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('nav');
  });

  it('Should render correctly when expand is a string', () => {
    const { getByTestId } = render(<Navbar expand="sm" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('navbar-expand-sm');
  });

  it('Should render correctly when bg is set', () => {
    const { getByTestId } = render(<Navbar bg="light" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('bg-light');
  });

  it('Should render correctly when sticky is set', () => {
    const { getByTestId } = render(<Navbar sticky="top" data-testid="test" />);
    expect(getByTestId('test').classList).toContain('sticky-top');
  });

  it('should have border-bottom when prop is true', () => {
    const { getByTestId, rerender } = render(<Navbar data-testid="test" />);
    expect(getByTestId('test').classList).not.toContain('border-bottom');
    rerender(<Navbar hasBorderBottom data-testid="test" />);
    expect(getByTestId('test').classList).toContain('border-bottom');
  });
});
