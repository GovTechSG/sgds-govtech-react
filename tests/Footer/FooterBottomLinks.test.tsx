import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterBottomLinks } from '../../src/Footer';

describe('<FooterBottomLinks/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterBottomLinks />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain(
      'footer-mandatory-links'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.querySelector('div.col>ul')).toBeInTheDocument();
  });
  it('bsPrefix FooterBottomLinks gets override', () => {
    const { container } = render(<FooterBottomLinks bsPrefix="test" />);
    expect(container.firstElementChild?.classList).not.toContain(
      'footer-mandatory-links'
    );
    expect(container.firstElementChild?.classList).toContain('test');
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterBottomLinks className="test" />);
    expect(container.firstElementChild?.classList).toContain(
      'footer-mandatory-links'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.firstElementChild?.classList).toContain('test');
  });
  it('children should be wrapped in li', () => {
    const { container } = render(
      <FooterBottomLinks>
        <a>one</a>
        <a>two</a>
        <a>three</a>
      </FooterBottomLinks>
    );
    expect(container.querySelectorAll('ul>li>a').length).toEqual(3);
  });
});
