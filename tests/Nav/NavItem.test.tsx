import { render } from '@testing-library/react';
import * as React from 'react';

import { NavItem } from '../../src/Nav';

describe('<NavItem>', () => {
  it('should have div as default component', () => {
    const { getByTestId } = render(<NavItem data-testid="test" />);
    const navItemElem = getByTestId('test');

    expect(navItemElem.tagName.toLowerCase()).toEqual('li');
    expect(navItemElem.classList).toContain('nav-item');
  });

  it('should allow custom elements instead of "li"', () => {
    const { getByTestId } = render(<NavItem data-testid="test" as="section" />);
    const navItemElem = getByTestId('test');

    expect(navItemElem.tagName.toLowerCase()).toEqual('section');
    expect(navItemElem.classList).toContain('nav-item');
  });

  it('should pass classNames down and render children', () => {
    const { getByTestId } = render(
      <NavItem data-testid="test" className="custom-class and-other">
        <strong>Children</strong>
      </NavItem>
    );
    const navItemElem = getByTestId('test');

    expect(navItemElem.classList).toContain('nav-item');
    expect(navItemElem.classList).toContain('custom-class');
    expect(navItemElem.classList).toContain('and-other');
    expect(navItemElem.firstElementChild!.tagName.toLowerCase()).toEqual(
      'strong'
    );
  });
});
