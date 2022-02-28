
import {FormControl, FormGroup, FormLabel} from '../../src';

import { render } from '@testing-library/react';
import * as React from 'react';

describe('<FormGroup>', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <FormGroup data-testid="test-id">
        <span className="child1" />
        <span className="child2" /> 
      </FormGroup>
    );

    const element = getByTestId('test-id');
    expect(element.childElementCount).toEqual(2);

    const child1 = element.children[0];
    expect(child1.tagName.toLowerCase()).toEqual('span');
    expect(child1.classList.length).toEqual(1);
    expect(child1.classList.contains('child1')).not.toBeNull();

    const child2 = element.children[1];
    expect(child2.tagName.toLowerCase()).toEqual('span');
    expect(child2.classList.length).toEqual(1);
    expect(child2.classList.contains('child2')).not.toBeNull();
  });

  it('provided controlId to label and control', () => {
    const { getByTestId } = render(
      <FormGroup controlId="my-control" data-testid="test-id">
        <div>
          <FormLabel>label</FormLabel>
          <FormControl />
        </div>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    const label = element.getElementsByTagName('label');
    expect(label.length).toEqual(1);
    expect(label[0]).toHaveAttribute('for', 'my-control')

    const input = element.getElementsByTagName('input');
    expect(input.length).toEqual(1);
    expect(input[0]).toHaveAttribute('id', 'my-control');
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(<FormGroup data-testid="test-id" />);

    const element = getByTestId('test-id');
    expect(element.tagName.toLowerCase()).toEqual('div');
  });
});
