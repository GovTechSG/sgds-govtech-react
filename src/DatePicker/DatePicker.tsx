import * as React from 'react';
import InputGroup from '../InputGroup/InputGroup';
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
import FormToggle from './FormControlToggle';
import { Dropdown } from '../Dropdown';
import { DropDirection } from '../Dropdown/DropdownContext';

export type CalendarPlacement = 'up' | 'down';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
export interface RangeSelectionValue {
  start: Date | undefined;
  end: Date | undefined;
}
export interface DatePickerProps {
  initialValue?: Date | RangeSelectionValue;
  required?: boolean;
  className?: string;
  minDate?: string;
  maxDate?: string;
  displayDate?: Date;
  placeholder?: string;
  onChangeDate?: (value: Date | RangeSelectionValue | undefined) => void;
  onClear?: Function;
  disabled?: boolean;
  calendarPlacement?: DropDirection;
  dateFormat?: DateFormat;
  id?: string;
  mode?: 'single' | 'range';
  flip?: boolean;
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
  calendarPlacement: PropTypes.oneOf<DropDirection>(['up', 'down', 'end']),
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
};
interface DatePickerState {
  displayDate: Date;
  selectedDate: Date[];
  value: Date | RangeSelectionValue | undefined;
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
      selectedDate: [],
      value:
        props.initialValue ??
        (mode === 'range' ? { start: undefined, end: undefined } : undefined),
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
        displayDate: new Date(),
        value: isRange ? { start: undefined, end: undefined } : undefined,
      });
      if (props.onClear) {
        props.onClear();
      }
      if (props.onChangeDate) {
        props.onChangeDate(
          isRange ? { start: undefined, end: undefined } : undefined
        );
      }
    };

    //triggered only when clicking dates

    const onChangeDateSingle = (newSelectedDate: Date) => {
      setState({
        ...state,
        value: newSelectedDate,
        selectedDate: [newSelectedDate],
        displayDate: newSelectedDate,
      });
      formControlRef?.current?.click();
      if (props.onChangeDate) {
        props.onChangeDate(newSelectedDate);
      }
    };

    const onChangeDateRange = (newSelectedDate: Date) => {
      let selectedDates = state.selectedDate;
      let conditionalValue = state.value as RangeSelectionValue;
      const { start, end } = conditionalValue;
      if ((!start && !end) || (start && end)) {
        conditionalValue.start =
          selectedDates[0] =
          selectedDates[1] =
            newSelectedDate;
        conditionalValue.end = undefined;
      }
      if (start && !end) {
        // if selected end date is before selected start date --> swap
        if (new Date(start).getTime() > newSelectedDate.getTime()) {
          conditionalValue.end = start;
          conditionalValue.start = newSelectedDate;
        } else {
          conditionalValue.end = newSelectedDate;
        }
        selectedDates[1] = newSelectedDate;
      }
      setState({
        ...state,
        value: conditionalValue,
        selectedDate: selectedDates,
        displayDate: newSelectedDate,
      });
      if ((state.value as RangeSelectionValue).end) {
        formControlRef?.current?.click();
      }
      if (props.onChangeDate) {
        props.onChangeDate(conditionalValue);
      }
    };

    const calendarHeader = (
      <CalendarHeader
        displayDate={state.displayDate as Date}
        onChange={onChangeMonth}
      />
    );

    const computeValue = () => {
      if (isRange) {
        const { start, end } = state.value as RangeSelectionValue;
        const separator = start ? ' - ' : '';
        return (
          makeInputValueString(start, dateFormat) +
          separator +
          makeInputValueString(end, dateFormat)
        );
      }
      return makeInputValueString(state.value as Date, dateFormat);
    };
    const defaultPlaceHolder = isRange
      ? `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`
      : `${dateFormat.toLowerCase()}`;
    const controlProps = {
      value: computeValue(),
      required: props.required,
      placeholder: props.placeholder || defaultPlaceHolder,
      ref: inputRef,
      disabled: props.disabled,
      readOnly: true,
      className: props.className,
      isInvalid: state.invalid,
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
      const computeSelectedDate = () => {
        let selectedDate: Date[] = [];
        if (isRange) {
          const { start, end } = state.value as RangeSelectionValue;
          if (start) selectedDate.push(start);
          if (end) selectedDate.push(end);

          return selectedDate;
        } else {
          if (state.value) selectedDate.push(state.value as Date);

          return selectedDate;
        }
      };
      return (
        <Calendar
          selectedDate={computeSelectedDate()}
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
    return (
      <DatePickerContext.Provider value={contextValue}>
        <Dropdown drop={calendarPlacement}>
          <InputGroup variant="has-icon" id={props.id}>
            <FormToggle
              {...controlProps}
              ref={formControlRef}
            />
            <Button onClick={clear} disabled={props.disabled}>
              <i className="bi bi-x"></i>
            </Button>
            <i className="bi bi-calendar form-control-icon"></i>
          </InputGroup>
          <Dropdown.Menu className="sgds datepicker">
            <Dropdown.Header className="datepicker-header">
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
