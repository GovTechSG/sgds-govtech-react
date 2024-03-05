import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  DatePicker,
  getTotalDaysInMonth,
  makeInputValueString,
} from '../../src/DatePicker/DatePicker';
import { MONTH_LABELS } from '../../src/DatePicker/CalendarHeader';

describe('makeInputValueString', () => {
  it('takes in undefined value, returns empty string', () => {
    const arrange = makeInputValueString(undefined, 'DD/MM/YYYY');
    expect(arrange).toEqual('');
  });
  it('takes in Date value, returns string Date in the given format', () => {
    const arrange = makeInputValueString(new Date('2020-01-01'), 'DD/MM/YYYY');
    expect(arrange).toEqual('01/01/2020');
    const arrange1 = makeInputValueString(new Date('2020-01-01'), 'YYYY/MM/DD');
    expect(arrange1).toEqual('2020/01/01');
    const arrange2 = makeInputValueString(new Date('2020-09-23'), 'MM/DD/YYYY');
    expect(arrange2).toEqual('09/23/2020');
  });
});
describe('DatePicker', () => {
  it('has the default html structure', async () => {
    const { container, getByText } = render(<DatePicker />);
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(
      container.querySelector('div.input-group.dropdown')
    ).toBeInTheDocument();
    expect(container.querySelector('button.btn-primary')).toBeInTheDocument();
    expect(container.querySelector('i.bi-x')).toBeInTheDocument();
    expect(
      container.querySelector('.btn >span.visually-hidden')
    ).toBeInTheDocument();
    expect(
      container.querySelector('button.dropdown-toggle i.bi-calendar')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.dropdown-menu.show')
    ).not.toBeInTheDocument();

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.datepicker.sgds.show')
      ).toBeInTheDocument();
      const today = new Date();
      expect(
        getByText(`${MONTH_LABELS[today.getMonth()]} ${today.getFullYear()}`)
      ).toBeInTheDocument();
    });
  });
  it('clearBtnVariant prop changes the Button variant', () => {
    const { container } = render(<DatePicker clearBtnVariant="secondary" />);
    expect(container.querySelector('button.btn-secondary')).toBeDefined();
  });
  it('initialValue passed in, should reflect on input and calendar', async () => {
    const initialValue = new Date();
    const day = initialValue.getDate();
    const initialValueStr = makeInputValueString(initialValue, 'DD/MM/YYYY');
    const { container, getByText } = render(
      <DatePicker initialValue={initialValue} />
    );
    expect(container.querySelector('input')?.value).toEqual(initialValueStr);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(getByText(day).classList).toContain('bg-primary-600')
    );

    //click on 1st in calendar
    fireEvent.click(getByText('1'));
    const newDate = new Date(initialValue.setDate(1));
    await waitFor(() => {
      expect(getByText(1).classList).toContain('bg-primary-600');
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

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);

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
  it('when placeholder pass, should forward the placeholder attr to input', () => {
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

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });

    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
    const newDate = new Date();
    newDate.setDate(1);
    const expectedDate = makeInputValueString(newDate, 'MM/DD/YYYY');
    expect(container.querySelector('input')?.value).toEqual(expectedDate);

    rerender(<DatePicker dateFormat="YYYY/MM/DD" />);
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });

    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
    const newExpectedDate = makeInputValueString(newDate, 'YYYY/MM/DD');
    expect(container.querySelector('input')?.value).toEqual(newExpectedDate);
  });

  it('when disabled prop passed, should forward disabled attribute to button and input', () => {
    const { container } = render(<DatePicker disabled />);

    expect(container.querySelector('input')).toHaveAttribute('disabled');
    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('onChangeDate fn fires when dates clicked', async () => {
    const mockFn = jest.fn();
    const { getByText, container } = render(
      <DatePicker onChangeDate={mockFn} />
    );
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );
    fireEvent.click(getByText('1'));
    await waitFor(() => expect(mockFn).toHaveBeenCalled());
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

    fireEvent.click(
      container.querySelector('button[aria-label="Clear Selection"]')!
    );

    await waitFor(() => {
      expect(onChangeDate).toHaveBeenCalledTimes(1);
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(container.querySelector('input')?.value).toEqual('dd/mm/yyyy');
    });
  });
  it('calendarPlacement forwards its value to the data-popper-placement attr', async () => {
    const { container, rerender } = render(<DatePicker />);
    //default should be bottom
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );
    expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument();
    // expect(container.querySelector('.dropdown-menu.show')?.classList).toContain(
    //   'bs-popover-bottom'
    // );
    await waitFor(() => {
      expect(container.querySelector('.dropdown-menu.show')).toHaveAttribute(
        'data-popper-placement',
        'bottom-start'
      );
    });

    rerender(<DatePicker autoFocus calendarPlacement="up" />);
    await waitFor(() => {
      // expect(container.querySelector('.dropdown-menu.show')?.classList).toContain(
      //   'bs-popover-top'
      // );
      expect(container.querySelector('.dropdown-menu.show')).toHaveAttribute(
        'data-popper-placement',
        'top-start'
      );
    });
  });

  it('presses ArrowDown key to go to the next 7 days', async () => {
    const displayDate = new Date();
    const { container, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(container.querySelector('td.text-primary')!, {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
    });
    await waitFor(() => {
      const nextWeekDate = new Date(displayDate);
      nextWeekDate.setDate(nextWeekDate.getDate() + 7);
      expect(getByText(nextWeekDate.getDate())).toHaveFocus();
    });
  });

  it('presses ArrowUp key to go to the previous 7 days', async () => {
    const displayDate = new Date();
    const { container, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(container.querySelector('td.text-primary')!, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
    });
    await waitFor(() => {
      const previousWeekDate = new Date(displayDate);
      previousWeekDate.setDate(previousWeekDate.getDate() - 7);
      expect(getByText(previousWeekDate.getDate())).toHaveFocus();
    });
  });

  it('presses ArrowLeft key to go to the previous day', async () => {
    const displayDate = new Date();
    const { container, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(container.querySelector('td.text-primary')!, {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      keyCode: 37,
    });
    await waitFor(() => {
      const previousDayDate = new Date(displayDate);
      previousDayDate.setDate(previousDayDate.getDate() - 1);
      expect(getByText(previousDayDate.getDate())).toHaveFocus();
    });
  });

  it('presses ArrowRight key to go to the next day', async () => {
    const displayDate = new Date();
    const { container, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(container.querySelector('td.text-primary')!, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      const nextDayDate = new Date(displayDate);
      nextDayDate.setDate(nextDayDate.getDate() + 1);
      expect(getByText(nextDayDate.getDate())).toHaveFocus();
    });
  });

  it('presses ArrowLeft key on the first day of the month to go to the last day of the previous month', async () => {
    const displayDate = new Date('2024-01-01');
    const newDate = new Date('2024-01-31');
    newDate.setMonth(newDate.getMonth() - 1);
    const newDisplayMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newDisplayYear = newDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      keyCode: 37,
    });
    await waitFor(() => {
      const previousDayDate = new Date(displayDate);
      previousDayDate.setDate(previousDayDate.getDate() - 1);
      expect(getByText(previousDayDate.getDate())).toHaveFocus();
      expect(
        getByText(`${newDisplayMonth} ${newDisplayYear}`)
      ).toBeInTheDocument();
    });
  });

  it('presses ArrowRight key on the last day of the month to go to the first day of the next month', async () => {
    const displayDate = new Date('2024-01-31');
    const newDate = new Date('2024-01-31');
    newDate.setDate(newDate.getDate() + 1);
    const newDisplayMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newDisplayYear = newDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      const nextDayDate = new Date(displayDate);
      nextDayDate.setDate(nextDayDate.getDate() + 1);
      expect(getByText(nextDayDate.getDate())).toHaveFocus();
      expect(
        getByText(`${newDisplayMonth} ${newDisplayYear}`)
      ).toBeInTheDocument();
    });
  });

  it('presses Enter key to select the current date', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('01/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
  });

  it('presses Space key to select the current date', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: ' ',
      code: 'Space',
      keyCode: 32,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('01/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
  });

  it('presses Enter key to select the current date, then reselect the next day with ArrowRight and Enter key', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('01/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      const nextDayDate = new Date(displayDate);
      nextDayDate.setDate(nextDayDate.getDate() + 1);
      expect(getByText(nextDayDate.getDate())).toHaveFocus();
    });

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('02/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
  });

  it('presses Space key to select the current date, then reselect the next day with ArrowRight and Space key', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: ' ',
      code: 'Space',
      keyCode: 32,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('01/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      const nextDayDate = new Date(displayDate);
      nextDayDate.setDate(nextDayDate.getDate() + 1);
      expect(getByText(nextDayDate.getDate())).toHaveFocus();
    });

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: ' ',
      code: 'Space',
      keyCode: 32,
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('02/01/2024');
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });
  });

  it('presses Tab key to set focus element from display calendar date to previous calendar view button', async () => {
    const displayDate = new Date();
    const { container, getByLabelText, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('previous day')).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from previous calendar view button to centre header button', async () => {
    const displayDate = new Date('2024-01-01');
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayMonth} ${displayYear}`)).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from previous centre header button to next calendar view button', async () => {
    const displayDate = new Date('2024-01-01');
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('next day')).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from next calendar view button to display calendar date', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(displayDate.getDate())).toHaveFocus();
    });
  });

  it('presses Shift + Tab key to set focus element from display calendar date to next calendar view button', async () => {
    const displayDate = new Date();
    const { container, getByLabelText, getByText } = render(<DatePicker />);

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByLabelText('next day')).toHaveFocus();
    });
  });

  it('presses Shift + Tab key to set focus element from next calendar view button to centre header button', async () => {
    const displayDate = new Date('2024-01-01');
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByText(`${displayMonth} ${displayYear}`)).toHaveFocus();
    });
  });

  it('presses Shift + Tab key to set focus element from previous centre header button to previous calendar view button', async () => {
    const displayDate = new Date('2024-01-01');
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByLabelText('previous day')).toHaveFocus();
    });
  });

  it('presses Shift + Tab key to set focus element from previous calendar view button to display calendar date', async () => {
    const displayDate = new Date('2024-01-01');
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByText(displayDate.getDate())).toHaveFocus();
    });
  });

  it('presses Enter key on previous calendar view button to view previous month calendar', async () => {
    const displayDate = new Date('2024-01-01');
    const newDate = new Date('2024-01-01');
    newDate.setMonth(newDate.getMonth() - 1);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newYear = newDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('previous day')).toHaveFocus();
    });

    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
    });
  });

  it('display calendar date should focus on the same day after switching to previous calendar view', async () => {
    const displayDate = new Date('2024-01-01');
    const newDate = new Date('2024-01-01');
    newDate.setMonth(newDate.getMonth() - 1);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newYear = newDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('previous day')).toHaveFocus();
    });

    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
    });

    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    fireEvent.keyDown(getByText(`${newMonth} ${newYear}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(newDate.getDate())).toHaveFocus();
    });
  });

  it('presses Enter key on next calendar view button to view next month calendar', async () => {
    const displayDate = new Date('2024-01-01');
    const newDate = new Date('2024-01-01');
    newDate.setMonth(newDate.getMonth() + 1);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newYear = newDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByLabelText('next day')).toHaveFocus();
    });

    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
    });
  });

  it('display calendar date should focus on the same day after switching to next calendar view', async () => {
    const displayDate = new Date('2024-01-31');
    const newDate = new Date('2024-01-01');
    newDate.setMonth(newDate.getMonth() + 1);
    const totalDaysInMonth = getTotalDaysInMonth(newDate);
    newDate.setDate(totalDaysInMonth);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newYear = newDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });
    await waitFor(() => {
      expect(getByLabelText('next day')).toHaveFocus();
    });

    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
    });

    fireEvent.keyDown(getByLabelText('next day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(newDate.getDate())).toHaveFocus();
    });
  });

  it('changes from calendar view to month view when press Enter key on centre header button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayMonth} ${displayYear}`)).toHaveFocus();
    });

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });
  });

  it('presses ArrowDown key to set focus to next 3 month', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
    });
    await waitFor(() => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() + 3);
      const newMonthShort = newDate.toLocaleString('default', {
        month: 'short',
      });
      const newYear = newDate.getFullYear();
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });
  });

  it('presses ArrowUp key to set focus to next 3 month', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
    });
    await waitFor(() => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() - 3);
      const newMonthShort = newDate.toLocaleString('default', {
        month: 'short',
      });
      const newYear = newDate.getFullYear();
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });
  });

  it('presses ArrowLeft key to set focus to previous month', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      keyCode: 37,
    });
    await waitFor(() => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() - 1);
      const newMonthShort = newDate.toLocaleString('default', {
        month: 'short',
      });
      const newYear = newDate.getFullYear();
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });
  });

  it('presses ArrowRight key to set focus to next month', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() + 1);
      const newMonthShort = newDate.toLocaleString('default', {
        month: 'short',
      });
      const newYear = newDate.getFullYear();
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from display month to previous month range view button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('previous month')).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from previous month range view button to centre header button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByLabelText('previous month'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayYear}`)).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from centre header button to next month range view button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('next month')).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from next month range view button to display month', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByLabelText('next month'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
    });
  });

  it('selects the next month with ArrowRight and Enter keys on month range view', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newMonthShort = newDate.toLocaleString('default', {
      month: 'short',
    });
    const newYear = newDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });

    fireEvent.keyDown(getByText(`${newMonthShort}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
      expect(getByText(newDate.getDate())).toHaveFocus();
    });
  });

  it('resets to focus on current month when navigate to another month in month view without selecting the month and close the calendar', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const newMonthShort = newDate.toLocaleString('default', {
      month: 'short',
    });
    const newYear = newDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    await waitFor(() => {
      expect(getByText(`${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newMonthShort}`)).toHaveFocus();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
    });
  });

  it('resets to focus on current date when navigate to and selected another month in month view and close the calendar', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    const newMonth = newDate.toLocaleString('default', {
      month: 'long',
    });
    const newMonthShort = newDate.toLocaleString('default', {
      month: 'short',
    });
    const newYear = newDate.getFullYear();
    const { container, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    });
    fireEvent.keyDown(getByText(`${newMonthShort}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(getByText(`${newMonth} ${newYear}`)).toBeInTheDocument();
      expect(getByText(`${newDate.getDate()}`)).toHaveFocus();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayMonth} ${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayDate.getDate()}`)).toHaveFocus();
    });
  });

  it('changes from month view to year view when press Enter key on centre header button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayMonthShort = displayDate.toLocaleString('default', {
      month: 'short',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(displayDate.getDate()), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    fireEvent.keyDown(getByLabelText('previous day'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayMonth} ${displayYear}`)).toHaveFocus();
    });

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toBeInTheDocument();
      expect(getByText(`${displayMonthShort}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayMonthShort}`);
    });

    fireEvent.keyDown(getByText(`${displayMonthShort}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    fireEvent.keyDown(getByLabelText('previous month'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayYear}`)).toHaveFocus();
    });

    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(
        getByText(`${displayYear} - ${displayYear + 11}`)
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayYear}`);
    });
  });

  it('presses Tab key to set focus element from display year to previous year range button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(
        getByText(`${displayYear} - ${displayYear + 11}`)
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayYear}`);
    });

    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('previous year')).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from previous year range button to centre header button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(
        getByText(`${displayYear} - ${displayYear + 11}`)
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayYear}`);
    });

    fireEvent.keyDown(getByLabelText('previous year'), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByText(`${displayYear} - ${displayYear + 11}`)).toHaveFocus();
    });
  });

  it('presses Tab key to set focus element from centre header button to next year range button', async () => {
    const displayDate = new Date();
    const displayMonth = displayDate.toLocaleString('default', {
      month: 'long',
    });
    const displayYear = displayDate.getFullYear();
    const { container, getByLabelText, getByText } = render(
      <DatePicker displayDate={displayDate} />
    );

    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );

    fireEvent.keyDown(getByText(`${displayMonth} ${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    fireEvent.keyDown(getByText(`${displayYear}`), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(
        getByText(`${displayYear} - ${displayYear + 11}`)
      ).toBeInTheDocument();
      expect(getByText(`${displayYear}`)).toHaveFocus();
      expect(
        container.querySelector('button.text-primary')?.textContent
      ).toEqual(`${displayYear}`);
    });

    fireEvent.keyDown(getByText(`${displayYear} - ${displayYear + 11}`), {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });
    await waitFor(() => {
      expect(getByLabelText('next year')).toHaveFocus();
    });
  });

  it('invalid feedback is shown when entered invalid date', async () => {
    const { container, getByText } = render(<DatePicker />);

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '01132024' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText('Please enter a valid date')).toBeInTheDocument();
    });
  });

  it('invalid feedback is shown when entered date before year 1900', async () => {
    const { container, getByText } = render(<DatePicker />);

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '31121989' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText('Please enter a valid date')).toBeInTheDocument();
    });
  });

  it('invalid feedback with customisable message is shown when entered invalid date', async () => {
    const { container, getByText } = render(
      <DatePicker errorMessage="You have entered an invalid date" />
    );

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '01132024' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText('You have entered an invalid date')).toBeInTheDocument();
    });
  });

  it('invalid feedback is shown when entered date before minDate', async () => {
    const { container, getByText } = render(
      <DatePicker minDate={new Date(2024, 1, 1).toISOString()} />
    );

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '31122023' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText('Please enter a valid date')).toBeInTheDocument();
    });
  });

  it('invalid feedback is shown when entered date after maxDate', async () => {
    const { container, getByText } = render(
      <DatePicker maxDate={new Date(2024, 1, 31).toISOString()} />
    );

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '01022024' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText('Please enter a valid date')).toBeInTheDocument();
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
      <DatePicker mode="range" displayDate={displayDate} />
    );
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );
    expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument();
    fireEvent.click(getByText('1'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText('1').classList).toContain('bg-primary-600');
    });

    fireEvent.click(getByText('20'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
      expect(container.querySelector('input')?.value).toEqual(
        `01/01/2020 - 20/01/2020`
      );
    });
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    const oneToTwenty = Array.from({ length: 20 }, (_, i) => i + 1);
    await waitFor(() => {
      oneToTwenty.forEach((day) => {
        if (day === 1 || day === 20) {
          expect(getByText(day).classList).toContain('bg-primary-600');
        } else {
          expect(getByText(day).classList).toContain('bg-primary-100');
        }
      });
      expect(getByText('21').classList).not.toContain('bg-primary-600');
    });
  });

  it('allows selection date, click of next icon , selection of second date', async () => {
    const displayDate = new Date('2020-01-01');
    const { getByText, container } = render(
      <DatePicker mode="range" displayDate={displayDate} />
    );
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );
    fireEvent.click(getByText('28'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      expect(getByText('28').classList).toContain('bg-primary-600');
    });

    fireEvent.click(container.querySelector('i.bi-chevron-right')!);
    await waitFor(() => {
      expect(getByText('February 2020')).toBeInTheDocument();
    });
    fireEvent.click(getByText('2'));
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).not.toBeInTheDocument();
      expect(container.querySelector('input')?.value).toEqual(
        `28/01/2020 - 02/02/2020`
      );
    });
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(getByText('1').classList).toContain('bg-primary-100');
      expect(getByText('2').classList).toContain('bg-primary-600');
      expect(getByText('3').classList).not.toContain('bg-primary-600');
    });
    fireEvent.click(container.querySelector('i.bi-chevron-left')!);
    await waitFor(() => {
      expect(getByText('January 2020')).toBeInTheDocument();
      [28, 29, 30, 31].forEach((day) => {
        if (day === 28) {
          expect(getByText(day).classList).toContain('bg-primary-600');
        } else {
          expect(getByText(day).classList).toContain('bg-primary-100');
        }
      });
      expect(getByText('27').classList).not.toContain('bg-primary-100');
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

  it('allows selection of second date that is ealrier than first selected date, input should fix accordingly', async () => {
    const { getByText, container } = render(
      <DatePicker mode="range" displayDate={new Date('2020-01-01')} />
    );
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-menu.show')).toBeInTheDocument()
    );
    fireEvent.click(getByText('20'));

    await waitFor(() => {
      expect(getByText('20').classList).toContain('bg-primary-600');
      expect(container.querySelector('input')?.value).toEqual(
        `20/01/2020 - dd/mm/yyyy`
      );
    });
    fireEvent.click(getByText('15'));
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual(
        `15/01/2020 - 20/01/2020`
      );
    });
    //new selection
    fireEvent.click(container.querySelector('button.dropdown-toggle')!);
    await waitFor(() => {
      expect(
        container.querySelector('.dropdown-menu.show')
      ).toBeInTheDocument();
      const selecteDates = [15, 16, 17, 18, 19, 20];
      selecteDates.forEach((day) => {
        if (day === 15 || day === 20) {
          expect(getByText(day).classList).toContain('bg-primary-600');
        } else {
          expect(getByText(day).classList).toContain('bg-primary-100');
        }
      });
    });

    fireEvent.click(getByText('1'));
    await waitFor(() =>
      expect(container.querySelector('input')?.value).toEqual(
        '01/01/2020 - dd/mm/yyyy'
      )
    );
    fireEvent.click(getByText('20'));
    await waitFor(() =>
      expect(container.querySelector('input')?.value).toEqual(
        '01/01/2020 - 20/01/2020'
      )
    );
  });
});
