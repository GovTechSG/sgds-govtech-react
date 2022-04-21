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
  const displayDate = new Date(2022, 2, 20);

  const displayMonth = MONTH_LABELS[displayDate.getMonth()];
  const displayYear = displayDate.getFullYear();
  it('should have default html structure', () => {
    const { asFragment, container, getByText } = render(
      <CalendarHeader onChange={mockFn} displayDate={displayDate} />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(
      container.querySelector('div.d-flex.text-center.justify-content-between')
    ).toBeInTheDocument();
    expect(
      container.querySelector('div>i.bi.bi-chevron-left')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('button').length).toEqual(1);
    expect(
      container.querySelector('div>i.bi.bi-chevron-right')
    ).toBeInTheDocument();

    expect(getByText(`${displayMonth} ${displayYear}`)).toBeInTheDocument();
  });

  it('click calendarHeader should trigger setView call;', async () => {
    const contextValue = {
      view: 'day' as CalendarView,
      setView: jest.fn(),
    };
    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader onChange={mockFn} displayDate={displayDate} />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelector('button');
    expect(headerButton?.textContent).toEqual(`${displayMonth} ${displayYear}`);
    expect(container.querySelector('button')).not.toHaveAttribute('disabled');

    fireEvent.click(container.querySelector('button')!);

    await waitFor(() => {
      expect(contextValue.setView).toHaveBeenCalled();
    });
  });
  it('given context view month, calendar header shows full year;', async () => {
    const contextValue = {
      view: 'month' as CalendarView,
      setView: jest.fn(),
    };
    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader onChange={mockFn} displayDate={displayDate} />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelector('button');
    expect(headerButton?.textContent).not.toEqual(
      `${displayMonth} ${displayYear}`
    );
    expect(headerButton?.textContent).toEqual(`${displayYear}`);
    expect(container.querySelector('button')).not.toHaveAttribute('disabled');

    fireEvent.click(container.querySelector('button')!);

    await waitFor(() => {
      expect(contextValue.setView).toHaveBeenCalled();
    });
  });
  it('given context view year, calendar header shows full year;', async () => {
    const contextValue = {
      view: 'year' as CalendarView,
      setView: jest.fn(),
    };
    const { container } = render(
      <DatePickerContext.Provider value={contextValue}>
        <CalendarHeader onChange={mockFn} displayDate={displayDate} />
      </DatePickerContext.Provider>
    );
    const headerButton = container.querySelector('button');
    expect(headerButton?.textContent).not.toEqual(
      `${displayMonth} ${displayYear}`
    );
    expect(headerButton?.textContent).not.toEqual(`${displayYear}`);
    expect(headerButton?.textContent).toEqual(
      `${displayDate.getFullYear() - 5} - ${displayDate.getFullYear() + 6}`
    );
    expect(container.querySelector('button')).toHaveAttribute('disabled');

    fireEvent.click(container.querySelector('button')!);

    await waitFor(() => {
      expect(contextValue.setView).not.toHaveBeenCalled();
    });
  });

  it('onclick bi-chevron-left should trigger mockFn ', async () => {
    const { container } = render(
      <CalendarHeader onChange={mockFn} displayDate={displayDate} />
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
      <CalendarHeader onChange={mockFn} displayDate={displayDate} />
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
    return <CalendarHeader displayDate={date} onChange={onChangeMonth} />;
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
    const contextValue = {
        view: 'month' as CalendarView,
        setView: jest.fn(),
      };
    return (
        <DatePickerContext.Provider value={contextValue}>
    <CalendarHeader displayDate={date} onChange={onChangeMonth} />;
        </DatePickerContext.Provider>
    )
    
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
  const CalendarHeaderComponent = () => {
    const [date, setDate] = React.useState(new Date(2022, 2, 20));
    const onChangeMonth = (newDisplayDate: Date) => {
      setDate(newDisplayDate);
    };
    const contextValue = {
        view: 'year' as CalendarView,
        setView: jest.fn(),
      };
    return (
        <DatePickerContext.Provider value={contextValue}>
    <CalendarHeader displayDate={date} onChange={onChangeMonth} />;
        </DatePickerContext.Provider>
    )
  };

  it('should change century years when click previous', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-left')).toBeInTheDocument();
    expect(getByText(`${2022 -5} - ${2022 + 6}`)).toBeInTheDocument();

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newLowerYear = 2022 - 10
    await waitFor(() => expect(getByText(`${newLowerYear -5} - ${newLowerYear + 6}`)).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newerLowerYear = newLowerYear - 10 
    await waitFor(() => expect(getByText(`${newerLowerYear -5} - ${newerLowerYear + 6}`)).toBeInTheDocument());

    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    const newestLowerYear = newerLowerYear - 10 

    await waitFor(() => expect(getByText(`${newestLowerYear -5} - ${newestLowerYear + 6}`)).toBeInTheDocument());
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() => expect(getByText(`${newerLowerYear -5} - ${newerLowerYear + 6}`)).toBeInTheDocument());
  });
  it('should change century years when click next', async () => {
    const { getByText, container } = render(<CalendarHeaderComponent />);

    expect(container.querySelector('i.bi-chevron-right')).toBeInTheDocument();
    expect(getByText(`${2022 -5} - ${2022 + 6}`)).toBeInTheDocument();
    const newUpperYear = 2022 + 10
    fireEvent.click(container.querySelector('i.bi-chevron-right')!);

    await waitFor(() => expect(getByText(`${newUpperYear -5} - ${newUpperYear + 6}`)).toBeInTheDocument()); 
  });
});
