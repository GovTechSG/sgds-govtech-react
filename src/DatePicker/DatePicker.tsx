import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  ChangeEvent,
} from 'react';
import dayjs from 'dayjs';
import warning from 'warning';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { createPopper } from '@popperjs/core';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import DatePickerContext, { CalendarView } from './DatePickerContext';
import { Button } from '../Button';
import YearView from './YearView';
import MonthView from './MonthView';
import { FormControl } from '../Form';
import { Dropdown } from '../Dropdown';
import { ButtonVariant } from '../utils/types';
import generateId from '../utils/generateId';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';

dayjs.extend(customParseFormat);

export type CalendarPlacement = 'up' | 'down';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
export interface RangeSelectionValue {
  start: Date | undefined;
  end: Date | undefined;
}
interface DatePickerState {
  displayDate: Date;
  inputDate: string;
  selectedDate: Date | RangeSelectionValue | undefined;
  invalid: boolean;
}
export interface DatePickerProps {
  /** Changes DatePicker to single date selection or range date selection */
  mode?: 'single' | 'range';
  /**Provides the date context for Calendar to present the appropriate view. If `initialValue` is used, `displayDate` should be synced with it */
  displayDate?: Date;
  /** The initial value of DatePicker on first load. When used, ensure that the type is consistent with the `mode` used */
  initialValue?: Date | RangeSelectionValue;
  /**When true, adds required attribute to Form Control input element */
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
  /** The onError handler for DatePicker */
  onError?: Function;
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
  clearBtnVariant?: ButtonVariant;
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
  onError: PropTypes.func,
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
  clearBtnVariant: PropTypes.string,
};

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

export const getMaskedDateFormat = (
  isRange: boolean,
  dateFormat: DateFormat
) => {
  const maskedDateFormat =
    dateFormat === 'YYYY/MM/DD' ? '9999/99/99' : '99/99/9999';
  if (isRange) {
    return `${maskedDateFormat} - ${maskedDateFormat}`;
  }

  return maskedDateFormat;
};

export const isValidDate = (date: string, dateFormat: DateFormat) => {
  return dayjs(date, dateFormat, true).isValid();
};

export const arrangeDateRange = (
  date1: Date,
  date2: Date,
  dateFormat: DateFormat
) => {
  if (date1.getTime() > date2.getTime()) {
    return {
      start: date2,
      end: date1,
      inputDate: `${makeInputValueString(
        date2,
        dateFormat
      )} - ${makeInputValueString(date1, dateFormat)}`,
    };
  }

  return {
    start: date1,
    end: date2,
    inputDate: `${makeInputValueString(
      date1,
      dateFormat
    )} - ${makeInputValueString(date2, dateFormat)}`,
  };
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
      clearBtnVariant = 'primary',
      ...props
    },
    ref
  ) => {
    const isRange = mode === 'range';
    const maskedDateFormat = getMaskedDateFormat(isRange, dateFormat);
    const formControlRef = useRef<HTMLInputElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const dropdownToggleRef = useRef<HTMLButtonElement>(null);

    const inputRef = useMergedRefs(
      ref as React.MutableRefObject<HTMLInputElement>,
      formControlRef
    );

    const getinitialInputDate = () => {
      if (!props.initialValue) {
        if (isRange) {
          return `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`;
        }
        return dateFormat.toLowerCase();
      }

      if (isRange) {
        const { start, end } = props.initialValue as RangeSelectionValue;
        if (start && end) {
          return `${makeInputValueString(
            start,
            dateFormat
          )} - ${makeInputValueString(end, dateFormat)}`;
        }
        return dateFormat.toLowerCase();
      }

      if (!isRange && props.initialValue instanceof Date) {
        return dayjs(props.initialValue).format(dateFormat);
      }

      return dateFormat.toLowerCase();
    };

    const initialState: DatePickerState = {
      displayDate: displayDate,
      inputDate: getinitialInputDate(),
      selectedDate:
        props.initialValue &&
        ((isRange && !(props.initialValue instanceof Date)) ||
          (!isRange && props.initialValue instanceof Date))
          ? props.initialValue
          : isRange
          ? { start: undefined, end: undefined }
          : undefined,
      invalid: false,
    };
    // Generation of unique id soley on client side
    const [datepickerMenuId, setDatepickerMenuId] = useState('');
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
      setState((prevState) => ({ ...prevState, displayDate: newDisplayDate }));
    };

    const clear = () => {
      setState({
        ...initialState,
        selectedDate: isRange
          ? { start: undefined, end: undefined }
          : undefined,
        displayDate: new Date(),
      });
      props.onClear?.();
      props.onChangeDate?.(undefined);
    };

    //triggered only when clicking dates

    const onChangeDateSingle = (newSelectedDate: Date) => {
      setState((prevState) => ({
        ...prevState,
        inputDate: dayjs(newSelectedDate).format(dateFormat),
        selectedDate: newSelectedDate,
        displayDate: newSelectedDate,
      }));
      dropdownToggleRef?.current?.click();
      props.onChangeDate?.(newSelectedDate);
    };

    const onChangeDateRange = (newSelectedDate: Date) => {
      const { start, end } = state.selectedDate as RangeSelectionValue;

      const dateRangeHandler = () => {
        if ((!start && !end) || (start && end)) {
          // Selecting start date
          return {
            start: newSelectedDate,
            end: undefined,
          };
        }

        if (start && !end) {
          // Selecting end date
          // if selected end date is before selected start date --> swap
          const { start: dateStart, end: dateEnd } = arrangeDateRange(
            new Date(start),
            newSelectedDate,
            dateFormat
          );
          return {
            start: dateStart,
            end: dateEnd,
          };
        }

        return { start, end };
      };

      const newSelectedDates = dateRangeHandler();
      setState((prevState) => ({
        ...prevState,
        inputDate: `${makeInputValueString(
          newSelectedDates.start,
          dateFormat
        )} - ${makeInputValueString(newSelectedDates.end, dateFormat)}`,
        selectedDate: newSelectedDates,
        displayDate: newSelectedDate,
      }));
      if (newSelectedDates.end) {
        dropdownToggleRef?.current?.click();
      }
      props.onChangeDate?.(newSelectedDates);
    };

    const calendarHeader = (
      <CalendarHeader
        displayDate={state.displayDate as Date}
        onChange={onChangeMonth}
      />
    );

    const defaultPlaceHolder = isRange
      ? `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`
      : `${dateFormat.toLowerCase()}`;

    const controlProps = {
      value: state.inputDate,
      required: props.required,
      placeholder: props.placeholder || defaultPlaceHolder,
      disabled: props.disabled,
      className: props.className,
      isInvalid: state.invalid,
      id: props.id,
    };

    const BodyContent = (): JSX.Element => {
      const onClickMonth = (month: number) => {
        const newDisplayDate = new Date(state.displayDate);
        newDisplayDate.setMonth(month);
        setView('day');
        setState((prevState) => ({
          ...prevState,
          displayDate: newDisplayDate,
        }));
      };
      const onClickYear = (year: number) => {
        const newDisplayDate = new Date(state.displayDate);
        newDisplayDate.setFullYear(year);
        setView('month');
        setState((prevState) => ({
          ...prevState,
          displayDate: newDisplayDate,
        }));
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

    const enterDateSingle = (event: ChangeEvent<HTMLInputElement>) => {
      const enteredDate = event.target.value;
      const parsedDate = dayjs(enteredDate, dateFormat).toDate();
      if (isValidDate(enteredDate, dateFormat)) {
        setState((prevState) => ({
          ...prevState,
          inputDate: enteredDate,
          displayDate: parsedDate,
          selectedDate: parsedDate,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        inputDate: enteredDate,
      }));
    };

    const enterDateRange = (event: ChangeEvent<HTMLInputElement>) => {
      const enteredDate = event.target.value;
      const [start, end] = enteredDate.split(' - ');

      if (isValidDate(start, dateFormat) && isValidDate(end, dateFormat)) {
        const {
          start: dateStart,
          end: dateEnd,
          inputDate,
        } = arrangeDateRange(
          dayjs(start, dateFormat).toDate(),
          dayjs(end, dateFormat).toDate(),
          dateFormat
        );
        setState((prevState) => ({
          ...prevState,
          inputDate: inputDate,
          selectedDate: {
            start: dateStart,
            end: dateEnd,
          },
          displayDate: dayjs(end, dateFormat).toDate(),
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        inputDate: enteredDate,
      }));
    };

    useEffect(() => {
      const formControlElement = formControlRef.current;
      const dropdownMenuElement = dropdownMenuRef.current;

      if (formControlElement && dropdownMenuElement) {
        // Set Popper.js to position the Dropdown.Menu under the InputMask
        const popperInstance = createPopper(
          formControlElement,
          dropdownMenuElement,
          {
            placement: 'bottom-start', // Adjust placement as needed
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 10], // Adjust the offset as needed (x, y)
                },
              },
              // Add any other modifiers if required
            ],
          }
        );

        // Cleanup Popper.js instance on unmount or when no longer needed
        return () => {
          popperInstance.destroy();
        };
      }

      return () => {};
    }, []);

    useEffect(() => {
      setDatepickerMenuId(generateId('datepicker', 'ul'));
    }, []);

    useEffect(() => {
      const dateRangeValidityHandler = () => {
        const [start, end] = state.inputDate.split(' - ');
        if (
          start &&
          start !== dateFormat.toLowerCase() &&
          !isValidDate(start, dateFormat)
        ) {
          setState((prevState) => ({ ...prevState, invalid: true }));
          props.onError?.();
          return;
        }
        if (
          end &&
          end !== dateFormat.toLowerCase() &&
          !isValidDate(end, dateFormat)
        ) {
          setState((prevState) => ({ ...prevState, invalid: true }));
          props.onError?.();
          return;
        }

        setState((prevState) => ({ ...prevState, invalid: false }));
      };

      const singleDateValidityHandler = () => {
        if (
          state.inputDate !== dateFormat.toLowerCase() &&
          !isValidDate(state.inputDate, dateFormat)
        ) {
          setState((prevState) => ({ ...prevState, invalid: true }));
          props.onError?.();
          return;
        }

        setState((prevState) => ({ ...prevState, invalid: false }));
      };

      const timeout = setTimeout(() => {
        if (isRange) {
          dateRangeValidityHandler();
        } else {
          singleDateValidityHandler();
        }
      }, 500);

      return () => clearTimeout(timeout);
    }, [state.inputDate, isRange]);

    return (
      <DatePickerContext.Provider value={contextValue}>
        <Dropdown drop={calendarPlacement} className="input-group">
          <InputMask
            {...controlProps}
            mask={maskedDateFormat}
            alwaysShowMask={true}
            maskPlaceholder={defaultPlaceHolder}
            aria-label="Enter Date"
            onChange={isRange ? enterDateRange : enterDateSingle}
          >
            <FormControl ref={inputRef} />
          </InputMask>
          <Dropdown.Toggle
            aria-label="Open Datepicker"
            variant="outline-dark"
            className="rounded-0 border"
            ref={dropdownToggleRef}
          >
            <i className="bi bi-calendar"></i>
          </Dropdown.Toggle>
          <Button
            onClick={clear}
            disabled={props.disabled}
            variant={clearBtnVariant}
            aria-label="Clear Selection"
          >
            <i className="bi bi-x"></i>
            <span className="visually-hidden">clear</span>
          </Button>
          <Dropdown.Menu
            id={datepickerMenuId}
            className="sgds datepicker"
            as="div"
            role="dialog"
            aria-modal="true"
            aria-label="Choose Date"
            ref={dropdownMenuRef}
            renderOnMount={true}
          >
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
