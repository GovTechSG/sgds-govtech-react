import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterTopHeader } from '../../src/Footer';

describe('<FooterTopHeader/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterTopHeader />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain(
      'footer-header'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.querySelector('div.col.col-lg-6>div.title')).toBeInTheDocument();
    expect(container.querySelector('div.col>div.description')).toBeInTheDocument();
  });
  it('bsPrefix FooterTopHeader gets override', () => {
    const { container } = render(<FooterTopHeader bsPrefix="test" />);
    expect(container.firstElementChild?.classList).not.toContain(
      'footer-header'
    );
    expect(container.firstElementChild?.classList).toContain('test');
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterTopHeader className="test" />);
    expect(container.firstElementChild?.classList).toContain(
      'footer-header'
    );
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.firstElementChild?.classList).toContain('test');
  });
  it('columnClass is passed to .col and overrides default', () => {
    const { container } = render(
      <FooterTopHeader columnClass='test'/>
    );
    expect(container.querySelector('div.col.test')).toBeInTheDocument();
    expect(container.querySelector('div.col.col-lg-6')).not.toBeInTheDocument();
  });
  it('titleClass is passed to .title', () => {
    const { container } = render(
      <FooterTopHeader titleClass='test'/>
    );
    expect(container.querySelector('div.title.test')).toBeInTheDocument();
  });
  it('descriptionClass is passed to .description', () => {
    const { container } = render(
      <FooterTopHeader descriptionClass='test'/>
    );
    expect(container.querySelector('div.description.test')).toBeInTheDocument();
  });
  it('headerTitle is passed to .title', () => {
    const { container } = render(
      <FooterTopHeader headerTitle='test'/>
    );
    expect(container.querySelector('div.title')).toHaveTextContent('test');
  });
  it('description text is children passed to .description', () => {
    const { container } = render(
      <FooterTopHeader>hello</FooterTopHeader>
    );
    expect(container.querySelector('div.description')).toHaveTextContent('hello');
  });
});
