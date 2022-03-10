import { render } from '@testing-library/react';
import { NavbarBrand } from '../../src/Navbar';
import * as React from 'react';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', () => {
    const { getByTestId } = render(
      <NavbarBrand data-testid="test">Brand</NavbarBrand>
    );
    const navbarBrandElem = getByTestId('test');
    expect(navbarBrandElem.tagName.toLowerCase()).toEqual('span');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });

  it('Should create NavbarBrand A (link) element', () => {
    const { getByTestId } = render(
      <NavbarBrand href="/foo" data-testid="test">
        BrandLink
      </NavbarBrand>
    );
    const navbarBrandElem = getByTestId('test');
    expect(navbarBrandElem.tagName.toLowerCase()).toEqual('a');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });
});
