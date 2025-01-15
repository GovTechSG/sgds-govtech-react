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
      MONTH_LABELS[displayDate.getMonth()].slice(0, 3)
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

describe('MonthView a11y', () => {
  const mockFn = jest.fn();
  const mockhandleTabPressOnCalendarBody = jest.fn();
  const mockOnChangeMonth = jest.fn();
  const monthRefs = React.createRef<Array<HTMLButtonElement | null>>();
  const selectedDate = new Date();
  const displayDate = new Date();
  it('should have aria-label in format of Month Year', () => {
    const { getByText } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={new Date(2024, 3, 11)}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );
    expect(getByText('Jan').getAttribute('aria-label')).toEqual(
      `Current month, January ${selectedDate.getFullYear()}`
    );
  });
  it('selected month should have aria-selected=true, mode=single', () => {
    const { getByText } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={new Date(2020, 3, 1)}
        displayDate={new Date(2020, 3, 1)}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );
    expect(getByText('Apr').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Jun').getAttribute('aria-selected')).toEqual('false');
  });
  it('selected month should have aria-selected=true, mode=range', () => {
    const { getByText } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={{
          start: new Date(2020, 3, 1),
          end: new Date(2020, 11, 1),
        }}
        displayDate={new Date(2020, 3, 1)}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );
    const monthAbbr = (i: number) => MONTH_LABELS[i].slice(0, 3);
    for (let i = 3; i < 12; i++) {
      expect(getByText(monthAbbr(i)).getAttribute('aria-selected')).toEqual(
        'true'
      );
    }
    for (let i = 0; i < 3; i++) {
      expect(getByText(monthAbbr(i)).getAttribute('aria-selected')).toEqual(
        'false'
      );
    }
  });
  it("current month should be indicated in aria-label" , () => {
    const { getByText } = render(
      <MonthView
        onClickMonth={mockFn}
        selectedDate={undefined}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        monthRefs={monthRefs}
      />
    );
    const currentMonth = new Date().getMonth()
    const currentMonthName = MONTH_LABELS[currentMonth].slice(0,3)
    expect(getByText(currentMonthName).getAttribute('aria-label')).toContain(
      "Current month"
    );
  })
});
