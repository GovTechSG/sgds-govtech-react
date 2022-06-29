import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterBottom } from '../../src/Footer';

describe('<FooterBottom/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterBottom />);
    expect(container.firstElementChild?.tagName).toBe('SECTION');
    expect(container.firstElementChild?.classList).toContain('footer-bottom');
    expect(container.firstElementChild?.firstElementChild?.classList).toContain('container-fluid')
    expect(container.firstElementChild?.firstElementChild?.tagName).toBe('DIV')
  });
  it('bsPrefix footer gets override', () => {
    const { container } = render(<FooterBottom bsPrefix="test" />);
    expect(container.firstElementChild?.classList).not.toContain(
      'footer-bottom'
    );
    expect(container.firstElementChild?.classList).toContain('test');
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterBottom className="test" />);
    expect(container.firstElementChild?.classList).toContain('footer-bottom');
    expect(container.firstElementChild?.classList).toContain('test');
  });
});
