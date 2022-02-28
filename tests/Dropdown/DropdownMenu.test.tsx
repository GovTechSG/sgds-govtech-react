import { render } from '@testing-library/react';
import {Dropdown} from '../../src' 
import DropdownMenu, { getDropdownMenuPlacement } from '../../src/Dropdown/DropdownMenu';
import * as React from 'react';

describe('<Dropdown.Menu>', () => {
  it('renders div with dropdown-menu class', () => {
    const { container } = render(
      <DropdownMenu show>
        <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
        <Dropdown.Item eventKey="2">Item 2</Dropdown.Item>
        <Dropdown.Item eventKey="3">Item 3</Dropdown.Item>
        <Dropdown.Item eventKey="4">Item 4</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('dropdown-menu')
  });

  it('Should pass props to dropdown', () => {
    const { container } = render(
      <DropdownMenu show className="new-fancy-class">
        <Dropdown.Item eventKey="1">Dropdown.Item 1 content</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('new-fancy-class')
  });

  it('applies align="end"', () => {
    const { container } = render(
      <DropdownMenu show align="end">
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('dropdown-menu-end')
  });

  it('renders on mount with prop', () => {
    const { container } = render(
      <DropdownMenu renderOnMount>
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('dropdown-menu')
  });

  it('does not add any extra classes when align="start"', () => {
    const { container } = render(
      <DropdownMenu show align="start">
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.className).toEqual('dropdown-menu show');
  });

  it('adds responsive start alignment classes', () => {
    const { container } = render(
      <DropdownMenu show align={{ lg: 'start' }}>
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );
  expect(container.firstElementChild!.classList).toContain('dropdown-menu-end')
  expect(container.firstElementChild!.classList).toContain('dropdown-menu-lg-start')
  });

  it('adds responsive end alignment classes', () => {
    const { container } = render(
      <DropdownMenu show align={{ lg: 'end' }}>
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('dropdown-menu-lg-end')
  expect(container.querySelector('[data-bs-popper="static"]')).not.toBeNull()
  });

  it('should render variant', () => {
    const { container } = render(
      <DropdownMenu show variant="dark">
        <Dropdown.Item>Item</Dropdown.Item>
      </DropdownMenu>,
    );

  expect(container.firstElementChild!.classList).toContain('dropdown-menu-dark')
  });

  describe('getDropdownMenuPlacement', () => {
    it('should return top placement', () => {
      expect(getDropdownMenuPlacement(false, 'up', false)).toEqual('top-start');
      expect(getDropdownMenuPlacement(true, 'up', false)).toEqual('top-end');
    });

    it('should return top placement for RTL', () => {
      expect(getDropdownMenuPlacement(false, 'up', true)).toEqual('top-end');
      expect(getDropdownMenuPlacement(true, 'up', true)).toEqual('top-start');
    });

    it('should return end placement', () => {
      expect(getDropdownMenuPlacement(false, 'end', false)).toEqual('right-start');
      expect(getDropdownMenuPlacement(true, 'end', false)).toEqual('right-end');
    });

    it('should return end placement for RTL', () => {
      expect(getDropdownMenuPlacement(false, 'end', true)).toEqual('left-start');
      expect(getDropdownMenuPlacement(true, 'end', true)).toEqual('left-end');
    });

    it('should return bottom placement', () => {
      expect(getDropdownMenuPlacement(false, 'down', false)).toEqual(
        'bottom-start',
      );
      expect(getDropdownMenuPlacement(true, 'down', false)).toEqual('bottom-end');
    });

    it('should return bottom placement for RTL', () => {
      expect(getDropdownMenuPlacement(false, 'down', true)).toEqual('bottom-end');
      expect(getDropdownMenuPlacement(true, 'down', true)).toEqual('bottom-start');
    });
   
  });
});
