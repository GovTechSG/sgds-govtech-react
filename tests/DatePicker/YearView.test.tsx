import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import YearView from '../../src/DatePicker/YearView';

describe('YearView', () => {
  const mockFn = jest.fn();
  const mockhandleTabPressOnCalendarBody = jest.fn();
  const mockOnChangeMonth = jest.fn();
  const yearRefs = React.createRef<Array<HTMLButtonElement | null>>();
  const selectedDate = new Date();
  const displayDate = new Date();
  it('should have default html structure', () => {
    const { container } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={selectedDate}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );

    expect(container.querySelector('.sgds.yearpicker')).toBeInTheDocument();
    expect(container.querySelectorAll('button.year').length).toEqual(12);
    expect(
      container.querySelectorAll('button.text-primary.year').length
    ).toEqual(1);
    expect(
      container.querySelector('button.text-primary.year')?.textContent
    ).toEqual(`${displayDate.getFullYear()}`);
  });

  it('given current year, it is displayed at the first of the year range', () => {
    const currentYear = displayDate.getFullYear();
    const { getByText, queryByText } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={selectedDate}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );

    expect(getByText(`${currentYear}`)).toBeInTheDocument();
    expect(queryByText(`${currentYear - 1}`)).not.toBeInTheDocument();
    expect(getByText(`${currentYear + 11}`)).toBeInTheDocument();
    expect(queryByText(`${currentYear + 12}`)).not.toBeInTheDocument();
  });

  it('onClick handler should work', () => {
    const { container } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={selectedDate}
        displayDate={displayDate}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );
    expect(container.querySelectorAll('button').length).toEqual(12);

    const buttonOne = container.querySelectorAll('button')[0];

    fireEvent.click(buttonOne);

    expect(mockFn).toHaveBeenCalled();
  });
});
