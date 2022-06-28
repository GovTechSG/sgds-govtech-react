import { render } from '@testing-library/react';
import * as React from 'react'
import Container from '../../src/Container/Container';

describe('<Container>', () => {
  it('should render props correctly', () => {
    const { getByText } = render(
      <Container className="whatever">Container</Container>,
    );
    expect(getByText('Container').classList).toContain('whatever')
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    const { getByText } = render(<Container fluid>Container</Container>);
    expect(getByText('Container').classList).toContain('container-fluid');
  });

  it('Should include size breakpoint class when fluid is set to sm, md, lg or xl', () => {
    const { getByText } = render(<Container fluid="sm">Container</Container>);
    expect(getByText('Container').classList).toContain('container-sm')
  });

  it('allows custom elements instead of "div"', () => {
    const { getByText } = render(<Container as="section">Container</Container>);
    expect(getByText('Container').classList).toContain('container')
    expect(getByText('Container').tagName.toLowerCase()).toEqual('section');
  });

  it('Should have div as default component', () => {
    const { getByText } = render(<Container>Container</Container>);
    expect(getByText('Container').tagName.toLowerCase()).toEqual('div');
  });
});
