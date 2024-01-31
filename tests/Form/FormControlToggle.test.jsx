import { render } from '@testing-library/react';
import * as React from 'react';
import FormControlToggle from '../../src/Form/FormControlToggle';

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
