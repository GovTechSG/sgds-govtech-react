import { render } from '@testing-library/react';
import * as React from 'react';
import FormText from '../../src/components/Form/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <FormText data-testid="foo" className="my-form-text">
        Help content
      </FormText>,
    );

    const formText = getByTestId('foo');
    expect(formText.classList.length).toEqual(2);
    expect(formText.classList).toContain('form-text')
    expect(formText.classList).toContain('my-form-text')
    expect(getByText('Help content')).toBeDefined()
  });

  it('Should have small as default component', () => {
    const { getByTestId } = render(<FormText data-testid="foo" />);

    const formText = getByTestId('foo');
    expect(formText.tagName.toLowerCase()).toEqual('small');
  });

  it('Should have "form-text" & "text-muted" class', () => {
    const { getByTestId } = render(<FormText data-testid="foo" muted />);

    const formText = getByTestId('foo');
    expect(formText.classList.length).toEqual(2);
    expect(formText.classList).toContain('form-text')
    expect(formText.classList).toContain('text-muted')
  });
});
