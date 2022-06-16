import * as React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '../../src/Footer';

describe('<Footer/>', () => {
  it('should render default html', () => {
    const { container } = render(<Footer />);
    expect(container.firstElementChild?.tagName).toBe('FOOTER');
    expect(container.firstElementChild?.classList).toContain('footer');
    expect(container.firstElementChild?.classList).toContain('sgds');
  });
  it('bsPrefix footer gets override', () => {
    const {container} = render(<Footer bsPrefix="test"/>)
    expect(container.firstElementChild?.classList).not.toContain('footer');
    expect(container.firstElementChild?.classList).toContain('test');
  })

  it('className gets forwarded ', () => {
    const {container} = render(<Footer className="test"/>)
    expect(container.firstElementChild?.classList).toContain('footer');
    expect(container.firstElementChild?.classList).toContain('test');
  })
});
