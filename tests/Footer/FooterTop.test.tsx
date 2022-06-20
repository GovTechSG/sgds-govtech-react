import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterTop } from '../../src/Footer';

describe('<FooterTop/>', () => {
    it('should render default html', () => {
      const { container } = render(<FooterTop />);
      expect(container.firstElementChild?.tagName).toBe('SECTION');
      expect(container.firstElementChild?.classList).toContain('footer-top');
    });
    it('bsPrefix footer gets override', () => {
      const {container} = render(<FooterTop bsPrefix="test"/>)
      expect(container.firstElementChild?.classList).not.toContain('footer-top');
      expect(container.firstElementChild?.classList).toContain('test');
    })
  
    it('className gets forwarded ', () => {
      const {container} = render(<FooterTop className="test"/>)
      expect(container.firstElementChild?.classList).toContain('footer-top');
      expect(container.firstElementChild?.classList).toContain('test');
    })
  });