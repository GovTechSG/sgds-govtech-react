import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterBottomCopyrights } from '../../src/Footer';

describe('<FooterBottomCopyrights/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterBottomCopyrights />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain('footer-copyrights');
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.querySelector('div.col>div.d-flex.justify-content-lg-end')).toBeInTheDocument()
  });
  it('bsPrefix footer gets override', () => {
    const {container} = render(<FooterBottomCopyrights bsPrefix="test"/>)
    expect(container.firstElementChild?.classList).not.toContain('footer-copyrights');
    expect(container.firstElementChild?.classList).toContain('test');
  })

  it('className gets forwarded ', () => {
    const {container} = render(<FooterBottomCopyrights className="test"/>)
    expect(container.firstElementChild?.classList).toContain('footer-copyrights');
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.firstElementChild?.classList).toContain('test');
  })
});
