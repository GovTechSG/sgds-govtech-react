//React-testing-library 
import { render }  from '@testing-library/react';
import React from 'react';

import Form from '../../src/components/Form/Form';
import FormGroup from '../../src/components/Form/FormGroup';

describe('<Form>', () => {
  it('should support custom `as`', () => {
    const { getByTestId } = render(
      <Form as="fieldset" className="my-form" data-testid="test">
        <FormGroup />
      </Form>,
    );

    const form = getByTestId('test');
    expect(form.tagName.toLowerCase()).toEqual('fieldset');
    expect(form.classList.length).toEqual(1);
    expect(form.classList).toContain('my-form')
    expect(form.childElementCount).toEqual(1);
    expect(form.firstElementChild?.classList.length).toEqual(0);
  });

  it('Should have form as default component', () => {
    const { getByTestId } = render(<Form data-testid="test" />);

    const form = getByTestId('test');
    expect(form.tagName.toLowerCase()).toEqual('form');
  });

  it('should have form class `was-validated` if validated', () => {
    const { getByTestId } = render(<Form validated data-testid="test" />);

    const form = getByTestId('test');
    expect(form.classList.length).toEqual(1);
    expect(form.classList.contains('was-validated')).toBe.true;
  });
});
