import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CalendarHeader, {
  MONTH_LABELS,
} from '../../src/DatePicker/CalendarHeader';
import DatePickerContext, {
  CalendarView,
} from '../../src/DatePicker/DatePickerContext';

describe('CalendarHeader', () => {
  const mockFn = jest.fn();
  const resetFocusOnHeader = jest.fn();
  const handleTabPressOnPreviousButton = jest.fn();
  const handleTabPressOnHeaderTitle = jest.fn();
  const handleTabPressOnNextButton = jest.fn();
  const displayDate = new Date();
  const displayMonth = MONTH_LABELS[displayDate.getMonth()];
  const displayYear = displayDate.getFullYear();
  const contextValue = {
    view: 'day' as CalendarView,
    setView: jest.fn(),
    focusedDateIndex: 0,
    setFocusedDateIndex: jest.fn(),
    focusedMonthIndex: 0,
    setFocusedMonthIndex: jest.fn(),
    focusedYearIndex: 0,
    setFocusedYearIndex: jest.fn(),
    yearPositionIndex: 0,
    setYearPositionIndex: jest.fn(),
  };

  it('should have default html structure', () => {
    const displayDate = new Date(2022, 2, 20);
    const displayMonth = MONTH_LABELS[displayDate.getMonth()];
    const displayYear = displayDate.getFullYear();
    const { asFragment, container, getByText } = render(
      <CalendarHeader
        onChange={mockFn}
        displayDate={displayDate}
        resetFocusOnHeader={resetFocusOnHeader}
        handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
        handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
        handleTabPressOnNextButton={handleTabPressOnNextButton}
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(
      container.querySelector('div.d-flex.text-center.justify-content-between')
    ).toBeInTheDocument();
    expect(
      container.querySelector('div>button>i.bi.bi-chevron-left')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('button').length).toEqual(3);
    expect(
      container.querySelector('div>button>i.bi.bi-chevron-right')
    ).toBeInTheDocument();

    expect(getByText(`${displayMonth} ${displayYear}`)).toBeInTheDocument();
  });

  it('click calendarHeader should trigger setView call;', async () => {
    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader
          onChange={mockFn}
          displayDate={displayDate}
          resetFocusOnHeader={resetFocusOnHeader}
          handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
          handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
          handleTabPressOnNextButton={handleTabPressOnNextButton}
        />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelectorAll('button')[1];
    expect(headerButton?.textContent).toEqual(`${displayMonth} ${displayYear}`);

    fireEvent.click(headerButton!);

    await waitFor(() => {
      expect(contextValue.setView).toHaveBeenCalled();
    });
  });
  it('given context view month, calendar header shows full year;', async () => {
    const contextValue = {
      view: 'month' as CalendarView,
      setView: jest.fn(),
      focusedDateIndex: 0,
      setFocusedDateIndex: jest.fn(),
      focusedMonthIndex: 0,
      setFocusedMonthIndex: jest.fn(),
      focusedYearIndex: 0,
      setFocusedYearIndex: jest.fn(),
      yearPositionIndex: 0,
      setYearPositionIndex: jest.fn(),
    };

    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader
          onChange={mockFn}
          displayDate={displayDate}
          resetFocusOnHeader={resetFocusOnHeader}
          handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
          handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
          handleTabPressOnNextButton={handleTabPressOnNextButton}
        />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelectorAll('button')[1];
    expect(headerButton?.textContent).not.toEqual(
      `${displayMonth} ${displayYear}`
    );
    expect(headerButton?.textContent).toEqual(`${displayYear}`);

    fireEvent.click(headerButton!);

    await waitFor(() => {
      expect(contextValue.setView).toHaveBeenCalled();
    });
  });
  it('given context view year, calendar header shows full year;', async () => {
    const contextValue = {
      view: 'year' as CalendarView,
      setView: jest.fn(),
      focusedDateIndex: 0,
      setFocusedDateIndex: jest.fn(),
      focusedMonthIndex: 0,
      setFocusedMonthIndex: jest.fn(),
      focusedYearIndex: 0,
      setFocusedYearIndex: jest.fn(),
      yearPositionIndex: 0,
      setYearPositionIndex: jest.fn(),
    };

    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader
          onChange={mockFn}
          displayDate={displayDate}
          resetFocusOnHeader={resetFocusOnHeader}
          handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
          handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
          handleTabPressOnNextButton={handleTabPressOnNextButton}
        />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelectorAll('button')[1];
    expect(headerButton?.textContent).not.toEqual(
      `${displayMonth} ${displayYear}`
    );
    expect(headerButton?.textContent).not.toEqual(`${displayYear}`);
    expect(headerButton?.textContent).toEqual(
      `${displayDate.getFullYear()} - ${displayDate.getFullYear() + 11}`
    );

    fireEvent.click(headerButton!);

    await waitFor(() => {
      expect(contextValue.setView).not.toHaveBeenCalled();
    });
  });

  it('onclick bi-chevron-left should trigger mockFn ', async () => {
    const { container } = render(
      <CalendarHeader
        onChange={mockFn}
        displayDate={displayDate}
        resetFocusOnHeader={resetFocusOnHeader}
        handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
        handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
        handleTabPressOnNextButton={handleTabPressOnNextButton}
      />
    );
    const previousIcon = container.querySelector('i.bi-chevron-left');

    expect(previousIcon).toBeInTheDocument();
    fireEvent.click(previousIcon!);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
    });
  });
  it('onclick bi-chevron-right should trigger mockFn', async () => {
    const { container } = render(
      <CalendarHeader
        onChange={mockFn}
        displayDate={displayDate}
        resetFocusOnHeader={resetFocusOnHeader}
        handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
        handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
        handleTabPressOnNextButton={handleTabPressOnNextButton}
      />
    );
    const nextIcon = container.querySelector('i.bi-chevron-right');

    expect(nextIcon).toBeInTheDocument();
    fireEvent.click(nextIcon!);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
    });
  });
});

describe('CalendarHeaderComponent day view in usage', () => {
  const CalendarHeaderComponent = () => {
    const [date, setDate] = React.useState(new Date(2022, 2, 20));
    const onChangeMonth = (newDisplayDate: Date) => {
      setDate(newDisplayDate);
    };
    const resetFocusOnHeader = jest.fn();
    const handleTabPressOnPreviousButton = jest.fn();
    const handleTabPressOnHeaderTitle = jest.fn();
    const handleTabPressOnNextButton = jest.fn();

    return (
      <CalendarHeader
        displayDate={date}
        onChange={onChangeMonth}
        resetFocusOnHeader={resetFocusOnHeader}
        handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
        handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
        handleTabPressOnNextButton={handleTabPressOnNextButton}
      />
    );
  };

  it('should change month when click previous', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-left')).toBeInTheDocument();
    expect(getByText('March 2022')).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);

    await waitFor(() => expect(getByText('February 2022')).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => expect(getByText('January 2022')).toBeInTheDocument());

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => expect(getByText('December 2021')).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() => expect(getByText('January 2022')).toBeInTheDocument());
  });
  it('should change month when click next', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-right')).toBeInTheDocument();
    expect(getByText('March 2022')).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-right')!);

    await waitFor(() => expect(getByText('April 2022')).toBeInTheDocument());
  });
});
describe('CalendarHeaderComponent month view in usage', () => {
  const CalendarHeaderComponent = () => {
    const [date, setDate] = React.useState(new Date(2022, 2, 20));
    const onChangeMonth = (newDisplayDate: Date) => {
      setDate(newDisplayDate);
    };
    const resetFocusOnHeader = jest.fn();
    const handleTabPressOnPreviousButton = jest.fn();
    const handleTabPressOnHeaderTitle = jest.fn();
    const handleTabPressOnNextButton = jest.fn();
    const contextValue = {
      view: 'month' as CalendarView,
      setView: jest.fn(),
      focusedDateIndex: 0,
      setFocusedDateIndex: jest.fn(),
      focusedMonthIndex: 0,
      setFocusedMonthIndex: jest.fn(),
      focusedYearIndex: 0,
      setFocusedYearIndex: jest.fn(),
      yearPositionIndex: 0,
      setYearPositionIndex: jest.fn(),
    };
    return (
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader
          displayDate={date}
          onChange={onChangeMonth}
          resetFocusOnHeader={resetFocusOnHeader}
          handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
          handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
          handleTabPressOnNextButton={handleTabPressOnNextButton}
        />
        ;
      </DatePickerContext.Provider>
    );
  };

  it('should change month when click previous', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-left')).toBeInTheDocument();
    expect(getByText('2022')).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);

    await waitFor(() => expect(getByText('2021')).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => expect(getByText('2020')).toBeInTheDocument());

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => expect(getByText('2019')).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() => expect(getByText('2020')).toBeInTheDocument());
  });
  it('should change month when click next', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-right')).toBeInTheDocument();
    expect(getByText('2022')).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-right')!);

    await waitFor(() => expect(getByText('2023')).toBeInTheDocument());
  });
});
describe('CalendarHeaderComponent year view in usage', () => {
  const displayDate = new Date();
  const CalendarHeaderComponent = () => {
    const [date, setDate] = React.useState(displayDate);
    const onChangeMonth = (newDisplayDate: Date) => {
      setDate(newDisplayDate);
    };
    const resetFocusOnHeader = jest.fn();
    const handleTabPressOnPreviousButton = jest.fn();
    const handleTabPressOnHeaderTitle = jest.fn();
    const handleTabPressOnNextButton = jest.fn();
    const contextValue = {
      view: 'year' as CalendarView,
      setView: jest.fn(),
      focusedDateIndex: 0,
      setFocusedDateIndex: jest.fn(),
      focusedMonthIndex: 0,
      setFocusedMonthIndex: jest.fn(),
      focusedYearIndex: 0,
      setFocusedYearIndex: jest.fn(),
      yearPositionIndex: 0,
      setYearPositionIndex: jest.fn(),
    };
    return (
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader
          displayDate={date}
          onChange={onChangeMonth}
          resetFocusOnHeader={resetFocusOnHeader}
          handleTabPressOnPreviousButton={handleTabPressOnPreviousButton}
          handleTabPressOnHeaderTitle={handleTabPressOnHeaderTitle}
          handleTabPressOnNextButton={handleTabPressOnNextButton}
        />
        ;
      </DatePickerContext.Provider>
    );
  };

  it('should change century years when click previous', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-left')).toBeInTheDocument();
    expect(
      getByText(
        `${displayDate.getFullYear()} - ${displayDate.getFullYear() + 11}`
      )
    ).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newLowerYear = displayDate.getFullYear() - 12;
    await waitFor(() =>
      expect(
        getByText(`${newLowerYear} - ${newLowerYear + 11}`)
      ).toBeInTheDocument()
    );
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newerLowerYear = newLowerYear - 12;
    await waitFor(() =>
      expect(
        getByText(`${newerLowerYear} - ${newerLowerYear + 11}`)
      ).toBeInTheDocument()
    );

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newestLowerYear = newerLowerYear - 12;

    await waitFor(() =>
      expect(
        getByText(`${newestLowerYear} - ${newestLowerYear + 11}`)
      ).toBeInTheDocument()
    );
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() =>
      expect(
        getByText(`${newerLowerYear} - ${newerLowerYear + 11}`)
      ).toBeInTheDocument()
    );
  });
  it('should change century years when click next', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-right')).toBeInTheDocument();
    expect(
      getByText(
        `${displayDate.getFullYear()} - ${displayDate.getFullYear() + 11}`
      )
    ).toBeInTheDocument();
    const newUpperYear = displayDate.getFullYear() + 12;
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);

    await waitFor(() =>
      expect(
        getByText(`${newUpperYear} - ${newUpperYear + 11}`)
      ).toBeInTheDocument()
    );
  });
});
