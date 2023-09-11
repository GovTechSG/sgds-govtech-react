import * as React from 'react';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import { useState, useRef, useMemo } from 'react';
import DatePickerContext, { CalendarView } from './DatePickerContext';
import { Button } from '../Button';
import MonthView from './MonthView';
import YearView from './YearView';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import warning from 'warning';
import FormControlToggle from '../Form/FormControlToggle';
import { Dropdown } from '../Dropdown';
import { ButtonVariant } from '../utils/types';
import generateId from '../utils/generateId';

export type CalendarPlacement = 'up' | 'down';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
export interface RangeSelectionValue {
  start: Date | undefined;
  end: Date | undefined;
}
export interface DatePickerProps {
  /** Changes DatePicker to single date selection or range date selection */
  mode?: 'single' | 'range';
  /**Provides the date context for Calendar to present the appropriate view. If `initialValue` is used, `displayDate` should be synced with it */
  displayDate?: Date;
  /** The initial value of DatePicker on first load. When used, ensure that the type is consistent with the `mode` used */
  initialValue?: Date | RangeSelectionValue;
  /**When true, adds  required attribute to Form Control input element */
  required?: boolean;
  /** Class name passed to the FormControl input element */
  className?: string;
  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  minDate?: string;
  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  maxDate?: string;
  /** Placeholder text on input control. Default differs depending on mode */
  placeholder?: string;
  /** The onChange handler for DatePicker */
  onChangeDate?: (value: Date | RangeSelectionValue | undefined) => void;
  /** Clear callback function */
  onClear?: Function;
  /** Disables the Form Control and Button of Datepicker */
  disabled?: boolean;
  /** Overlay placement for the popover calendar */
  calendarPlacement?: 'up' | 'down';
  /** Date format reflected on input */
  dateFormat?: DateFormat;
  /** Forwards the id to InputGroup of DatePicker */
  id?: string;
  /** When true, flips Calendar Overlay when placement does not fit */
  flip?: boolean;
  /** Customize clear button variant colour */
  clearBtnVariant?: ButtonVariant
}

const propTypes = {
  initialValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
  ]),
  required: PropTypes.bool,
  className: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  displayDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChangeDate: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  calendarPlacement: PropTypes.oneOf(['up', 'down']),
  /**
   * dateFormat variants
   *
   * @type {('MM/DD/YYYY'|'DD/MM/YYYY'|'YYYY/MM/DD')}
   */
  dateFormat: PropTypes.string,
  id: PropTypes.string,
  /**
   * mode variants
   *
   * @type {('single'|'range')}
   */
  mode: PropTypes.string,
  flip: PropTypes.bool,
  clearBtnVariant: PropTypes.string
};
interface DatePickerState {
  displayDate: Date;
  selectedDate: Date | RangeSelectionValue | undefined;
  invalid: boolean;
}
const SEPARATOR = '/';
export const makeInputValueString = (
  date: Date | undefined,
  dateFormat: DateFormat
) => {
  if (date === undefined) return '';
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //this method is executed during intialState setup... handle a missing state properly
  const separator = SEPARATOR;
  if (dateFormat.match(/MM.DD.YYYY/)) {
    return (
      (month > 9 ? month : `0${month}`) +
      separator +
      (day > 9 ? day : `0${day}`) +
      separator +
      date.getFullYear()
    );
  } else if (dateFormat.match(/DD.MM.YYYY/)) {
    return (
      (day > 9 ? day : `0${day}`) +
      separator +
      (month > 9 ? month : `0${month}`) +
      separator +
      date.getFullYear()
    );
  } else {
    return (
      date.getFullYear() +
      separator +
      (month > 9 ? month : `0${month}`) +
      separator +
      (day > 9 ? day : `0${day}`)
    );
  }
};

const defaultProps: Partial<DatePickerProps> = {
  dateFormat: 'DD/MM/YYYY',
  calendarPlacement: 'down',
  mode: 'single',
  displayDate: new Date(),
  flip: true,
};

export const DatePicker: BsPrefixRefForwardingComponent<
  'input',
  DatePickerProps
> = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      dateFormat = 'DD/MM/YYYY',
      calendarPlacement = 'down',
      mode = 'single',
      displayDate = new Date(),
      flip = true,
      clearBtnVariant = "primary", 
      ...props
    },
    ref
  ) => {
    const isRange = mode === 'range';
    const formControlRef = useRef<HTMLInputElement>(null);

    const inputRef = useMergedRefs(
      ref as React.MutableRefObject<HTMLInputElement>,
      formControlRef
    );

    const initialState: DatePickerState = {
      displayDate: displayDate,
      selectedDate: 
        props.initialValue && ((isRange && !(props.initialValue instanceof Date)) 
            || (!isRange && props.initialValue instanceof Date))
          ? props.initialValue
          : (isRange ? { start: undefined, end: undefined } : undefined),
      invalid: false,
    };
    const [state, setState] = useState(initialState);
    const [view, setView] = useState<CalendarView>('day');
    const contextValue = useMemo(
      () => ({
        view,
        setView,
      }),
      [view]
    );
    const onChangeMonth = (newDisplayDate: Date) => {
      setState({ ...state, displayDate: newDisplayDate });
    };

    const clear = () => {
      setState({
        ...initialState,
        selectedDate: isRange ? { start: undefined, end: undefined } : undefined,
        displayDate: new Date(),
      });
      props.onClear?.();
      props.onChangeDate?.(undefined);
    };

    //triggered only when clicking dates

    const onChangeDateSingle = (newSelectedDate: Date) => {
      setState({
        ...state,
        selectedDate: newSelectedDate,
        displayDate: newSelectedDate,
      });
      formControlRef?.current?.click();
      props.onChangeDate?.(newSelectedDate);
    };

    const onChangeDateRange = (newSelectedDate: Date) => {
      let { start, end } = state.selectedDate as RangeSelectionValue;
      
      if ((!start && !end) || (start && end)) {
        // Selecting start date
        start = newSelectedDate;
        end = undefined;
      } else if (start && !end) {
        // Selecting end date

        // if selected end date is before selected start date --> swap
        if (new Date(start).getTime() > newSelectedDate.getTime()) {
          end = start;
          start = newSelectedDate;
        } else {
          end = newSelectedDate;
        }
      }

      const newSelectedDates = { start: start, end: end }
      setState({
        ...state,
        selectedDate: newSelectedDates,
        displayDate: newSelectedDate,
      });
      if (newSelectedDates.end) {

        formControlRef?.current?.click();
      }
      props.onChangeDate?.(newSelectedDates);
    };

    const calendarHeader = (
      <CalendarHeader
        displayDate={state.displayDate as Date}
        onChange={onChangeMonth}
      />
    );

    const computeInputValue = () => {
      if (isRange && state.selectedDate) {
        const { start, end } = state.selectedDate as RangeSelectionValue;
        const separator = start ? ' - ' : '';
        return (
          makeInputValueString(start, dateFormat) +
          separator +
          makeInputValueString(end, dateFormat)
        );
      }
      return makeInputValueString(state.selectedDate as Date, dateFormat);
    };
    const defaultPlaceHolder = isRange
      ? `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`
      : `${dateFormat.toLowerCase()}`;
    const controlProps = {
      value: computeInputValue(),
      required: props.required,
      placeholder: props.placeholder || defaultPlaceHolder,
      ref: inputRef,
      disabled: props.disabled,
      readOnly: true,
      className: props.className,
      isInvalid: state.invalid,
      id: props.id,
    };

    const BodyContent = (): JSX.Element => {
      const onClickMonth = (month: number) => {
        const newDisplayDate = new Date(state.displayDate);
        newDisplayDate.setMonth(month);
        setView('day');
        setState({
          ...state,
          displayDate: newDisplayDate,
        });
      };
      const onClickYear = (year: number) => {
        const newDisplayDate = new Date(state.displayDate);
        newDisplayDate.setFullYear(year);
        setView('month');
        setState({
          ...state,
          displayDate: newDisplayDate,
        });
      };
      if (view === 'month')
        return (
          <MonthView
            onClickMonth={onClickMonth}
            displayDate={state.displayDate}
          />
        );
      if (view === 'year')
        return (
          <YearView displayDate={state.displayDate} onClickYear={onClickYear} />
        );
      // const computeSelectedDate = () => {
      //   let selectedDate: Date[] = [];
      //   if (isRange) {
      //     const { start, end } = state.selectedDate as RangeSelectionValue;
      //     if (start) selectedDate.push(start);
      //     if (end) selectedDate.push(end);

      //     return selectedDate;
      //   } else {
      //     if (state.value) selectedDate.push(state.value as Date);

      //     return selectedDate;
      //   }
      // };
      return (
        <Calendar
          selectedDate={state.selectedDate}
          displayDate={state.displayDate}
          changeDate={isRange ? onChangeDateRange : onChangeDateSingle}
          minDate={props.minDate}
          maxDate={props.maxDate}
          mode={mode}
        />
      );
    };

    const warningCondition = () => {
      const displayDateStr = makeInputValueString(displayDate, dateFormat);
      if (isRange) {
        const { start, end } = props.initialValue as RangeSelectionValue;
        return (
          makeInputValueString(start, dateFormat) === displayDateStr ||
          makeInputValueString(end, dateFormat) === displayDateStr
        );
      } else {
        const initialValue = props.initialValue as Date;
        return (
          makeInputValueString(initialValue, dateFormat) === displayDateStr
        );
      }
    };
    if (props.initialValue) {
      warning(
        warningCondition(),
        'In DatePicker `single` mode, `initialValue` is `Date` type and `displayDate` prop must be of same value. In range mode, `initialValue` should be of object {start: Date, end: Date} and `displayDate` prop must be of same value as either `start` or `end`'
      );
      if (isRange) {
        const { start, end } = props.initialValue as RangeSelectionValue;
        start &&
          end &&
          warning(
            start.getTime() <= end.getTime(),
            '`end` Date cannot be earlier than `start` Date'
          );
      }
    }
    const dropdownMenuId = generateId('combobox', 'ul');
    return (
      <DatePickerContext.Provider value={contextValue}>
        <Dropdown drop={calendarPlacement} className="form-control-group input-group">
            <FormControlToggle {...controlProps} ref={formControlRef} role="combobox" aria-haspopup="dialog" aria-controls={dropdownMenuId} aria-label="Choose Date" />
            <Button onClick={clear} disabled={props.disabled} variant={clearBtnVariant} aria-label="Clear Selection">
              <i className="bi bi-x"></i>
              <span className="visually-hidden">clear</span>
            </Button>
            <i className="bi bi-calendar form-control-icon"></i>

          <Dropdown.Menu id={dropdownMenuId} className="sgds datepicker" as='div' role="dialog" aria-modal="true" aria-label="Choose Date">
            <Dropdown.Header className="datepicker-header" role="none">
              {calendarHeader}
            </Dropdown.Header>
            <div className="datepicker-body">{BodyContent()}</div>
          </Dropdown.Menu>
        </Dropdown>
      </DatePickerContext.Provider>
    );
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = propTypes as any;
DatePicker.defaultProps = defaultProps;
export default DatePicker;
