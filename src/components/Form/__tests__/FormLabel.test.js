import * as React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';


import { shouldWarn } from '../../../utils/helpers';


describe('<FormLabel>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormLabel
        id="foo"
        htmlFor="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = getByTestId('test-id');
    expect(element.tagName.toLowerCase()).toEqual('label');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('my-control');
    expect(element.id).toEqual('foo');
    expect(element).toHaveAttribute('for', 'bar')
  });

  it('should use controlId for htmlFor', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    expect(element).toHaveAttribute('for', 'foo')
  });

  it('should render as a Col', () => {
    const { getByTestId } = render(
      <FormLabel column sm={4} data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(3);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('col-form-label');
    expect(element.classList).toContain('col-sm-4');
  });

  it('should use controlId for htmlFor when render as Col', () => {
    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel column sm={4} data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(3);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('col-form-label');
    expect(element.classList).toContain('col-sm-4');
    expect(element).toHaveAttribute('for', 'foo');
  });

  it('should respect visuallyHidden', () => {
    const { getByTestId } = render(
      <FormLabel visuallyHidden data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = getByTestId('test-id');
    expect(element.classList.length).toEqual(2);
    expect(element.classList).toContain('visually-hidden')
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    const { getByTestId } = render(
      <FormGroup controlId="foo">
        <FormLabel htmlFor="bar" data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    expect(element).toHaveAttribute('for', 'bar')
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    expect(input.tagName.toLowerCase()).toEqual('label');
  });

  it('should support ref forwarding when rendered as a Col', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              column
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    expect(input.tagName.toLowerCase()).toEqual('label');
  });

  it('accepts as prop', () => {
    const { getByTestId } = render(
      <FormLabel as="legend" data-testid="test-id">
        body
      </FormLabel>,
    );

    expect(getByTestId('test-id').tagName.toLowerCase()).toEqual('legend');
  });

  it('should properly size itself when rendered as a Col', () => {
    const { getByTestId } = render(
      <div>
        <FormLabel column="sm" data-testid="test-1">
          Label
        </FormLabel>
        <FormLabel column data-testid="test-2">
          Label
        </FormLabel>
        <FormLabel column="lg" data-testid="test-3">
          Label
        </FormLabel>
      </div>,
    );

    expect(getByTestId('test-1').classList).toContain('col-form-label-sm')
    expect(getByTestId('test-2').classList).toContain('col-form-label')
    expect(getByTestId('test-3').classList).toContain('col-form-label-lg')
  });
});
