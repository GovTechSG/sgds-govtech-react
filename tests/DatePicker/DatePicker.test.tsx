import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  DatePicker,
  makeInputValueString,
} from '../../src/DatePicker/DatePicker';
import { MONTH_LABELS } from '../../src/DatePicker/CalendarHeader';

describe('makeInputValueString', () => {
  it('takes in undefined value, returns empty string', () => {
    const arrange = makeInputValueString(undefined, 'DD/MM/YYYY')
    expect(arrange).toEqual('')
  })
  it('takes in Date value, returns string Date in the given format', () => {
    const arrange = makeInputValueString(new Date("2020-01-01"), 'DD/MM/YYYY')
    expect(arrange).toEqual('01/01/2020')
    const arrange1 = makeInputValueString(new Date("2020-01-01"), 'YYYY/MM/DD')
    expect(arrange1).toEqual('2020/01/01')
    const arrange2 = makeInputValueString(new Date("2020-09-23"), 'MM/DD/YYYY')
    expect(arrange2).toEqual('09/23/2020')
  })
})
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
      const today = new Date();
      expect(
        getByText(`${MONTH_LABELS[today.getMonth()]} ${today.getFullYear()}`)
      ).toBeInTheDocument();
    });
  });

  it('initialValue passed in, should reflect on input and calendar', async () => {
    const initialValue = new Date();
    const day = initialValue.getDate();
    const initialValueStr = makeInputValueString(initialValue, 'DD/MM/YYYY');
    const { container, getByText } = render(
      <DatePicker initialValue={initialValue} />
    );
    expect(container.querySelector('input')?.value).toEqual(initialValueStr);

    fireEvent.focus(container.querySelector('input')!);
    await waitFor(() =>
      expect(getByText(day).classList).toContain('bg-primary')
    );

    //click on 1st in calendar
    fireEvent.click(getByText('1'));
    const newDate = new Date(initialValue.setDate(1));
    await waitFor(() => {
      expect(getByText(1).classList).toContain('bg-primary');
      expect(container.querySelector('input')?.value).toEqual(
        makeInputValueString(newDate, 'DD/MM/YYYY')
      );
      expect(getByText(day).classList).not.toContain('bg-primary');
    });
  });
  it('initialValue passed in a same date from new Date, should not throw a warning', () => {
    const initialValue = new Date();
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<DatePicker initialValue={initialValue} />);

    expect(consoleSpy).not.toHaveBeenCalled();
    jest.clearAllMocks();
  });
  it('initialValue passed in a different date from new Date, should throw a warning', () => {
    const initialValue = new Date('2020-01-01');
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<DatePicker initialValue={initialValue} />);

    expect(consoleSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });
  it('initialValue passed with same value as displayDate prop, should not throw a warning', () => {
    const initialValue = new Date('2020-01-01');
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <DatePicker initialValue={initialValue} displayDate={initialValue} />
    );

    expect(consoleSpy).not.toHaveBeenCalled();
    jest.clearAllMocks();
  });
  it('when displayDate prop passed, Calendar should reflect correct month', async () => {
    const { getByText, container } = render(
      <DatePicker displayDate={new Date('2020-01-01')} />
    );

    fireEvent.focus(container.querySelector('input')!);

    await waitFor(() => expect(getByText('January 2020')).toBeInTheDocument());
  });

  it('when required pass, should forward the required attr to input', () => {
    const { container, rerender } = render(<DatePicker />);

    expect(container.querySelector('input')).not.toHaveAttribute('required');
    rerender(<DatePicker required />);
    expect(container.querySelector('input')).toHaveAttribute('required');
  });
  it('when className pass, should forward the className  to input', () => {
    const { container, rerender } = render(<DatePicker />);

    expect(container.querySelector('input')?.classList).not.toContain('foo');
    rerender(<DatePicker className="foo" />);
    expect(container.querySelector('input')?.classList).toContain('foo');
  });
  it('when placeholder pass, should forward the placeholder attr  to input', () => {
    const { container, rerender } = render(<DatePicker />);

    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'dd/mm/yyyy'
    );
    rerender(<DatePicker placeholder="foo" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'foo'
    );
  });
  it('when dateFormat changes, placeholder updates accordingly', () => {
    const { container, rerender } = render(
      <DatePicker dateFormat="MM/DD/YYYY" />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'mm/dd/yyyy'
    );

    rerender(<DatePicker dateFormat="YYYY/MM/DD" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'yyyy/mm/dd'
    );
  });
  it('when dateFormat changes, value clicked should reflect accordingly', async () => {
    const { container, rerender, getByText } = render(
      <DatePicker dateFormat="MM/DD/YYYY" />
    );

    fireEvent.focus(container.querySelector('input')!);
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });

    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).not.toBeInTheDocument();
    });
    const newDate = new Date();
    newDate.setDate(1);
    const expectedDate = makeInputValueString(newDate, 'MM/DD/YYYY');
    expect(container.querySelector('input')?.value).toEqual(expectedDate);

    rerender(<DatePicker dateFormat="YYYY/MM/DD" />);
    fireEvent.focus(container.querySelector('input')!);
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });

    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).not.toBeInTheDocument();
    });
    const newExpectedDate = makeInputValueString(newDate, 'YYYY/MM/DD');
    expect(container.querySelector('input')?.value).toEqual(newExpectedDate);
  });

  it('when disabled prop passed, should forward disabled attribute to button and input', () => {
    const { container } = render(<DatePicker disabled />);

    expect(container.querySelector('input')).toHaveAttribute('disabled');
    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('autoFocus loads DatePicker with Popover shown', () => {
    const { container } = render(<DatePicker autoFocus />);

    expect(container.querySelector('.popover')).toBeInTheDocument();
  });
  it('onChangeDate fn fires when dates clicked', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <DatePicker autoFocus onChangeDate={mockFn} />
    );
    fireEvent.click(getByText('1'));

    expect(mockFn).toHaveBeenCalled();
  });
  it('onFocus and onBlur fn fires when input focus and not focus', () => {
    const focusFn = jest.fn();
    const blurFn = jest.fn();
    const { container } = render(
      <DatePicker onFocus={focusFn} onBlur={blurFn} />
    );
    fireEvent.focus(container.querySelector('input')!);

    expect(focusFn).toHaveBeenCalled();

    fireEvent.blur(container.querySelector('input')!);
    expect(blurFn).toHaveBeenCalled();
    expect(focusFn).toHaveBeenCalledTimes(1);
    expect(blurFn).toHaveBeenCalledTimes(1);
  });
  it('onChange and onClear fn fires when click on Clear button', async () => {
    const onChangeDate = jest.fn();
    const onClear = jest.fn();
    const { container } = render(
      <DatePicker
        onChangeDate={onChangeDate}
        onClear={onClear}
        initialValue={new Date()}
      />
    );
    expect(container.querySelector('input')?.value).toEqual(
      makeInputValueString(new Date(), 'DD/MM/YYYY')
    );

    fireEvent.click(container.querySelector('button')!);

    await waitFor(() => {
      expect(onChangeDate).toHaveBeenCalledTimes(1);
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(container.querySelector('input')?.value).toEqual('');
    });
  });
  it('calendarPlacement forwards its value to the data-popper-placement attr', async () => {
    const { container, rerender } = render(<DatePicker autoFocus />);
    //default should be bottom
    expect(container.querySelector('.popover')).toBeInTheDocument();
    expect(container.querySelector('.popover')?.classList).toContain(
      'bs-popover-bottom'
    );
    await waitFor(() => {
      expect(container.querySelector('.popover')).toHaveAttribute(
        'data-popper-placement',
        'bottom'
      );
    });

    rerender(<DatePicker autoFocus calendarPlacement="top" />);
    await waitFor(() => {
      expect(container.querySelector('.popover')?.classList).toContain(
        'bs-popover-top'
      );
      expect(container.querySelector('.popover')).toHaveAttribute(
        'data-popper-placement',
        'top'
      );
    });
  });
});

describe('Datepicker Range mode', () => {
  afterEach(() => jest.clearAllMocks());
  it('placeholder should show range by default', () => {
    const { container } = render(<DatePicker mode="range" />);
    expect(container.querySelector('input')?.placeholder).toEqual(
      'dd/mm/yyyy - dd/mm/yyyy'
    );
  });
  it('placeholder should reflect dateFormat correctly by default', () => {
    const { container, rerender } = render(
      <DatePicker mode="range" dateFormat="MM/DD/YYYY" />
    );
    expect(container.querySelector('input')?.placeholder).toEqual(
      'mm/dd/yyyy - mm/dd/yyyy'
    );
    rerender(<DatePicker mode="range" dateFormat="YYYY/MM/DD" />);
    expect(container.querySelector('input')?.placeholder).toEqual(
      'yyyy/mm/dd - yyyy/mm/dd'
    );
  });
  it('allows selection dates', async () => {
    const displayDate = new Date('2020-01-01');
    const { getByText, container } = render(
      <DatePicker mode="range" autoFocus displayDate={displayDate} />
    );
    expect(container.querySelector('.popover')).toBeInTheDocument();
    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument();
      expect(getByText('1').classList).toContain('bg-primary');
    });

    fireEvent.click(getByText('20'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).not.toBeInTheDocument();
      expect(container.querySelector('input')?.value).toEqual(
        `01/01/2020 - 20/01/2020`
      );
    });
    fireEvent.focus(container.querySelector('input')!);
    const oneToTwenty = Array.from({ length: 20 }, (_, i) => i + 1);
    await waitFor(() => {
      oneToTwenty.forEach((day) => {
        expect(getByText(day).classList).toContain('bg-primary');
      });
      expect(getByText('21').classList).not.toContain('bg-primary');
    });
  });

  it('allows selection date, click of next icon , selection of second date', async () => {
    const displayDate = new Date('2020-01-01');
    const { getByText, container } = render(
      <DatePicker mode="range" autoFocus displayDate={displayDate} />
    );
    fireEvent.click(getByText('28'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument();
      expect(getByText('28').classList).toContain('bg-primary');
    });

    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() => {
      expect(getByText('February 2020')).toBeInTheDocument();
    });
    fireEvent.click(getByText('2'));
    await waitFor(() => {
      expect(container.querySelector('.popover')).not.toBeInTheDocument();
      expect(container.querySelector('input')?.value).toEqual(
        `28/01/2020 - 02/02/2020`
      );
    });
    fireEvent.focus(container.querySelector('input')!);
    await waitFor(() => {
      [1, 2].forEach((day) => {
        expect(getByText(day).classList).toContain('bg-primary');
      });
      expect(getByText('3').classList).not.toContain('bg-primary');
    });
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => {
      expect(getByText('January 2020')).toBeInTheDocument();
      [28, 29, 30, 31].forEach((day) => {
        expect(getByText(day).classList).toContain('bg-primary');
      });
      expect(getByText('27').classList).not.toContain('bg-primary');
    });
  });

  it('when initialValue passed in, either start or end should have same value as displayDate, else a console.error should appear', async () => {
    const initialValue = { start: new Date('2020-01-01'), end: new Date() };
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { rerender } = render(
      <DatePicker mode="range" initialValue={initialValue} />
    );
    expect(consoleSpy).not.toHaveBeenCalled();

    const newInitialValue = {
      start: new Date('2022-12-12'),
      end: new Date('2022-12-14'),
    };
    rerender(
      <DatePicker
        mode="range"
        initialValue={newInitialValue}
        displayDate={new Date('2022-12-12')}
      />
    );

    expect(consoleSpy).not.toHaveBeenCalled();

    rerender(
      <DatePicker
        mode="range"
        initialValue={newInitialValue}
        displayDate={new Date('2022-12-20')}
      />
    );
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('when range mode, initialValue should be RangeSelectionValue type , else console error', () => {
    const initialValue = new Date();
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { rerender } = render(
      <DatePicker
        mode="range"
        initialValue={initialValue}
        displayDate={initialValue}
      />
    );
    expect(consoleSpy).toHaveBeenCalled();
    jest.clearAllMocks();
    const newValue = { start: new Date(), end: new Date() };
    rerender(
      <DatePicker
        mode="range"
        initialValue={newValue}
        displayDate={new Date()}
      />
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });
  it('in range mode, start date must be ealrier than end date , else throw warning', () => {
    const initialValue = {
      start: new Date('2020-01-25'),
      end: new Date('2020-01-23'),
    };
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { rerender } = render(
      <DatePicker
        mode="range"
        initialValue={initialValue}
        displayDate={new Date('2020-01-25')}
      />
    );
    expect(consoleSpy).toHaveBeenCalled();
    jest.clearAllMocks();

    rerender(
      <DatePicker
        mode="range"
        initialValue={{
          start: new Date('2020-01-23'),
          end: new Date('2020-01-25'),
        }}
        displayDate={new Date('2020-01-25')}
      />
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('allows selection of second date that is ealrier than first selected date, input should fix accordingly', async() => {
    const { getByText, container } = render(
      <DatePicker
        mode="range"
        autoFocus
        displayDate={new Date("2020-01-01")}
      />
    );
    fireEvent.click(getByText('20'))

    await waitFor(() => {
      expect(getByText('20').classList).toContain('bg-primary')
      expect(container.querySelector('input')?.value).toEqual(`20/01/2020 - ` )
    })
    fireEvent.click(getByText('15'))
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual(`15/01/2020 - 20/01/2020` )
    })
    //new selection
    fireEvent.focus(container.querySelector('input')!)
    await waitFor(() => {
      expect(container.querySelector('.popover')).toBeInTheDocument()
      const selecteDates = [15,16,17,18,19,20]
      selecteDates.forEach(day => expect(getByText(day).classList).toContain('bg-primary'))
    })

    fireEvent.click(getByText('1'))
    await waitFor(() => expect(container.querySelector('input')?.value).toEqual('01/01/2020 - '))
    fireEvent.click(getByText('20'))
    await waitFor(() => expect(container.querySelector('input')?.value).toEqual('01/01/2020 - 20/01/2020'))

  })
});
