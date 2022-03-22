import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DatePicker } from '../../src/DatePicker';
import { MONTH_LABELS } from '../../src/DatePicker/CalendarHeader';
describe('DatePicker', () => {
  it('has the default html structure', async () => {
    const { container, asFragment, getByText } = render(<DatePicker />);

    expect(asFragment()).toMatchSnapshot();
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(container.querySelector('.input-group')).toHaveAttribute(
      'variant',
      'has-icon'
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('i.bi-x')).toBeInTheDocument();
    expect(
      container.querySelector('i.form-control-icon.bi-calendar')
    ).toBeInTheDocument();
    expect(container.querySelector('.popover')).not.toBeInTheDocument();

    fireEvent.focus(container.querySelector('input')!);
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument();
      //use snapshot to check for html and classnames
      expect(asFragment()).toMatchSnapshot();
      const today = new Date();
      expect(
        getByText(`${MONTH_LABELS[today.getMonth()]} ${today.getFullYear()}`)
      ).toBeInTheDocument();
    });
  });
});
