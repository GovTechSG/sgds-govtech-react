import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterTopContactLinks } from '../../src/Footer';

describe('<FooterTopContactLinks/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterTopContactLinks />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain(
      'footer-contact-links'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.querySelector('div.col>div.d-flex.justify-content-lg-end >ul')).toBeInTheDocument();
  });
  it('bsPrefix FooterTopContactLinks gets override', () => {
    const { container } = render(<FooterTopContactLinks bsPrefix="test" />);
    expect(container.firstElementChild?.classList).not.toContain(
      'footer-contact-links'
    );
    expect(container.firstElementChild?.classList).toContain('test');
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterTopContactLinks className="test" />);
    expect(container.firstElementChild?.classList).toContain(
      'footer-contact-links'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.firstElementChild?.classList).toContain('test');
  });
  it('children should be wrapped in li', () => {
    const { container } = render(
      <FooterTopContactLinks>
        <a>one</a>
        <a>two</a>
        <a>three</a>
      </FooterTopContactLinks>
    );
    expect(container.querySelectorAll('ul>li>a').length).toEqual(3);
  });
});
