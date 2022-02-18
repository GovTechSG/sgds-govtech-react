import { render } from '@testing-library/react';
import * as React from 'react';

import NavbarToggle from '../NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    const { getByTestId } = render(<NavbarToggle data-testid="test" />);
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('button');
  });
});
