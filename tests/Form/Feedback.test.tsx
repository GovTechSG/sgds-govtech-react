import { render } from '@testing-library/react';
import React from 'react';
import Feedback  from '../../src/Form/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', () => {
    const { getByTestId } = render(<Feedback data-testid="test" />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('div');
  });

  it('Should render valid feedback', () => {
    const { getByTestId } = render(
      <Feedback type="valid" data-testid="test" />,
    );

    expect(getByTestId('test').classList).toContain('valid-feedback')
  });

  it('Should render invalid feedback', () => {
    const { getByTestId } = render(
      <Feedback type="invalid" data-testid="test" />,
    );

    expect(getByTestId('test').classList).toContain('invalid-feedback')
  });
});
