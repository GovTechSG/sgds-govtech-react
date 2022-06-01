import { render } from '@testing-library/react';
import * as React from 'react';

import { Navbar } from '../../src/Nav';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    const { getByTestId } = render(<Navbar.Toggle data-testid="test" />);
    expect(getByTestId('test').tagName.toLowerCase()).toEqual('button');
  });
});
