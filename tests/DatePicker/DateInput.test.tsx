import { render } from '@testing-library/react';
import * as React from 'react';
import DateInput from '../../src/DatePicker/DateInput';

describe('<DateInput/>', () => {
  it('should have the default html', () => {
    const { container } = render(<DateInput />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });

});
