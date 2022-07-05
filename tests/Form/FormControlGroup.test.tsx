import { FormControlGroup } from '../../src';
import { render } from '@testing-library/react';
import * as React from 'react';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const { getByTestId } = render(<FormControlGroup data-testid="test" icon={<i className="test"></i>} />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('div');
  });
  it('should have .sgds and .form-control-group selectors by default', () => {
    const { getByTestId } = render(<FormControlGroup data-testid="test" icon={<i className="test"></i>} />);
    expect(getByTestId('test').classList).toContain('sgds');
    expect(getByTestId('test').classList).toContain('form-control-group');

  })
  it('icon element should have form-control-icon selector', () => {
    const { container } = render(<FormControlGroup icon={<i className="test"></i>} />);
    expect(container.querySelector("i")?.classList).toContain('form-control-icon');
    expect(container.querySelector("i")?.classList).toContain('test');

  })
});
