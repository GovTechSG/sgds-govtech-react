import { render } from '@testing-library/react';
import * as React from 'react';
import FormSelect from '../../src/components/Form/FormSelect';
import FormGroup from '../../src/components/Form/FormGroup';

describe('<FormSelect>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormSelect data-testid="test-id" name="bar" className="my-control" />,
    );

    const element = getByTestId('test-id');
    expect(element.tagName.toLowerCase()).toEqual('select');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('my-control')
    expect(element.classList).toContain('form-select')
    expect(element.getAttribute('name', 'bar'))
  });

  it('should render size correctly', () => {
    const { getByTestId } = render(
      <FormSelect size="lg" data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('form-select-lg')
  });

  it('should render htmlSize correctly', () => {
    const { getByTestId } = render(
      <FormSelect htmlSize={3} data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element).toHaveAttribute('size', '3')
  });

  it('should render isValid correctly', () => {
    const { getByTestId } = render(
      <FormSelect isValid data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('is-valid')
  });

  it('should render isInvalid correctly', () => {
    const { getByTestId } = render(
      <FormSelect isInvalid data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('is-invalid')
  });

  it('should render controlId correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormSelect data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    expect(element).toHaveAttribute('id', 'controll-id')
  });

  it('should override controlId correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormSelect id="overridden-id" data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    expect(element).toHaveAttribute('id', 'overridden-id') 
  });
});
