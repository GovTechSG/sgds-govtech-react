

import InputGroup from '../InputGroup';
import { render, screen } from '@testing-library/react';
import * as React  from 'react'

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const { getByTestId } = render(<InputGroup data-testid="test" />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('div');
  });

  it('Should render size correctly', () => {
    const { getByTestId } = render(<InputGroup size="sm" data-testid="test" />);

    expect(getByTestId('test').classList).toContain('input-group-sm')
  });

  it('Should render hasValidation correctly', () => {
    const { getByTestId } = render(
      <InputGroup hasValidation data-testid="test" />,
    );

    expect(getByTestId('test').classList).toContain('has-validation')
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      const { getByRole } = render(<InputGroup.Checkbox name={name} />);

      expect(getByRole('checkbox')).toHaveAttribute('name', 'foobar')
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      const { getByRole } = render(<InputGroup.Radio name={name} />);

      expect(getByRole('radio')).toHaveAttribute('name', 'foobar')
    });
  });
});