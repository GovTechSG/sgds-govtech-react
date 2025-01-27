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

describe('YearView a11y', () => {
  const mockFn = jest.fn();
  const mockhandleTabPressOnCalendarBody = jest.fn();
  const mockOnChangeMonth = jest.fn();
  const yearRefs = React.createRef<Array<HTMLButtonElement | null>>();
  it('selected year should have aria-selected=true, mode=single', () => {
    const { getByText } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={new Date(2020, 3, 1)}
        displayDate={new Date(2020, 3, 1)}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );
    expect(getByText('2020').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('2021').getAttribute('aria-selected')).toEqual('false');
    expect(getByText('2019').getAttribute('aria-selected')).toEqual('false');
  });
  it('selected year should have aria-selected=true, mode=range', () => {
    const { getByText } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={{
          start: new Date(2020, 3, 1),
          end: new Date(2022, 3, 1),
        }}
        displayDate={new Date(2020, 3, 1)}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );
    for (let i = 2020; i < 2023; i++) {
      expect(getByText(`${i}`).getAttribute('aria-selected')).toEqual('true');
    }
    expect(getByText('2019').getAttribute('aria-selected')).toEqual('false');
  });

  it('current year should be indicated in aria-label', () => {
    const { getByText } = render(
      <YearView
        onClickYear={mockFn}
        selectedDate={undefined}
        displayDate={new Date()}
        show={true}
        onChangeMonth={mockOnChangeMonth}
        handleTabPressOnCalendarBody={mockhandleTabPressOnCalendarBody}
        yearRefs={yearRefs}
      />
    );
    const currentYear = new Date().getFullYear()
    expect(getByText(`${currentYear}`).getAttribute('aria-label')).toContain(
      "Current year"
    );
  });

});
