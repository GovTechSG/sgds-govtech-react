import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MonthView, { MONTH_LABELS } from '../../src/DatePicker/MonthView';

describe('MonthView', () => {
  const mockFn = jest.fn();
  const mockhandleTabPressOnCalendarBody = jest.fn();
  const mockOnChangeMonth = jest.fn();
  const monthRefs = React.createRef<Array<HTMLButtonElement | null>>();
  const selectedDate = new Date();
  const displayDate = new Date();
  it('should have default html structure', () => {
    const { container } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={selectedDate}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );

    expect(container.querySelector('.sgds.monthpicker')).toBeInTheDocument();
    expect(container.querySelectorAll('button.month').length).toEqual(12);
    expect(
      container.querySelectorAll('button.month.text-primary').length
    ).toEqual(1);
    expect(container.querySelector('button.text-primary')?.textContent).toEqual(
      MONTH_LABELS[displayDate.getMonth()]
    );
  });

  it('onClick handler should work', () => {
    const { container } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={selectedDate}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );
    expect(container.querySelectorAll('button').length).toEqual(12);

    const buttonOne = container.querySelectorAll('button')[0];

    fireEvent.click(buttonOne);

    expect(mockFn).toHaveBeenCalled();
  });
});
