import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import FormControlToggle from '../../src/Form/FormControlToggle';
import InputGroupContext from '../../src/InputGroup/InputGroupContext';
import DropdownContext from '../../src/Dropdown/DropdownContext';

describe('<FormControlToggle/>', () => {
  it('should have the default html', () => {
    const { container } = render(<FormControlToggle />);
    expect(container.firstElementChild.tagName).toBe('INPUT');
    expect(container.querySelector('input.dropdown-toggle')).toBeDefined();
  });
  it('should not have aria-expanded attribute', () => {
    const { container } = render(<FormControlToggle />);
    expect(container.firstElementChild).not.toHaveAttribute('aria-expanded');
  });
});
