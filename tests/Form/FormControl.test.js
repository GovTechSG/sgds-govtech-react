import * as React from 'react';
import { render } from '@testing-library/react';

import FormControl from '../FormControl';
import FormGroup from '../FormGroup';

import { shouldWarn } from '../utils/helpers';

describe('<FormControl>', () => { 
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormControl
        type="text"
        id="foo"
        name="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');
    expect(element.tagName.toLowerCase()).toEqual('input');
    expect(element.id).toEqual('foo');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('form-control')
    expect(element.classList).toContain('my-control')
    expect(element).toHaveAttribute('name', 'bar')
    expect(element).toHaveAttribute('type', 'text')
  });

  it('should support textarea', () => {
    const { getByTestId } = render(
      <FormControl as="textarea" data-testid="test-id" />,
    );

    expect(getByTestId('test-id').tagName.toLowerCase()).toEqual('textarea');
  });

  it('should support plaintext inputs', () => {
    const { getByTestId } = render(
      <FormControl plaintext data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(1);
    expect(element.classList).toContain('form-control-plaintext')
  });

  it('should support type=color', () => {
    const { getByTestId } = render(
      <FormControl type="color" data-testid="test-id" />,
    );

    expect(getByTestId('test-id')).toHaveAttribute('type', 'color')
  });

  it('should use controlId for id', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" data-testid="test-id" />
      </FormGroup>,
    );

    expect(getByTestId('test-id')).toHaveAttribute('id', 'foo')
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored'); 

    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" data-testid="test-id" />
      </FormGroup>,
    );

    expect(getByTestId('test-id')).toHaveAttribute('id','bar');
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormControl
              type="text"
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    expect(input.tagName.toLowerCase()).toEqual('input');
  });

  it('should properly display size of FormControl', () => {
    const { getByTestId } = render(
      <FormControl type="text" size="lg" data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('form-control-lg')
  });

  it('should properly display html size of FormControl', () => {
    const { getByTestId } = render(
      <FormControl type="text" htmlSize={42} data-testid="test-id" />,
    );
    
    expect(getByTestId('test-id')).toHaveAttribute('size', '42')
  });

  it('Should have input as default component', () => {
    const { getByTestId } = render(<FormControl data-testid="test-id" />);

    expect(getByTestId('test-id').tagName.toLowerCase()).toEqual('input');
  });

  it('should support numbers as values', () => {
    const { getByTestId } = render(
      <FormControl
        value={10}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    expect(getByTestId('test-id')).toHaveAttribute('value', '10')
  });

  it('should support an array of strings as values', () => {
    const { getByTestId } = render(
      <FormControl
        value={['hello', 'world']}
        onChange={() => undefined}
        data-testid="test-id"
      />,
    );

    expect(getByTestId('test-id')).toHaveAttribute('value', 'hello,world')
  });
});
