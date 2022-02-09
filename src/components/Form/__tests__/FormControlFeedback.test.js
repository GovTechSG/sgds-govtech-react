//React-testing-library
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import FormControl from '../FormControl';
import FormGroup from '../FormGroup';

describe('<Feedback>', () => {
  it('should render default success', () => {
   const {asFragment} = render(
        <FormGroup>
          Test
          <FormControl isValid />
          <FormControl.Feedback type="valid" />
        </FormGroup>
      )
      expect(asFragment()).toMatchSnapshot()
      expect(screen.getByText('Test').children.length).toEqual(2)
      expect(screen.getByText('Test').children[1].classList).toContain('valid-feedback')

      expect(screen.getByText('Test').querySelector('.valid-feedback')).not.toBeNull()
  });

  it('should render default error', () => {
    render(<FormGroup>
    <FormControl isInvalid />
    <FormControl.Feedback type="invalid">Text</FormControl.Feedback>
  </FormGroup>);

  expect(screen.getByText('Text').classList).toContain('invalid-feedback');
  });

  it('should render custom component', () => {
    function MyComponent() {
      return <div>Error</div>;
    }

    render(<FormControl.Feedback as={MyComponent} />)
    expect(screen.getByText('Error')).toBeDefined()
  });
});
