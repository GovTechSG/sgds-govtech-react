import * as React from 'react';
import FormControl from '../Form/FormControl';
import InputGroup from '../InputGroup/InputGroup';
import Overlay from '../Overlay/Overlay';
import Popover from '../Popover/Popover';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import { useState, useRef, useMemo } from 'react';
import { Placement } from '../utils/types';
import DatePickerContext, { CalendarView } from './DatePickerContext';
import { Button } from '../Button';
import MonthView from './MonthView';
import YearView from './YearView';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import warning from 'warning';

export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
export interface RangeSelectionValue {
  start?: Date;
  end?: Date;
}
export interface DatePickerProps {
  initialValue?: Date | RangeSelectionValue;
  required?: boolean;
  className?: string;
  minDate?: string;
  maxDate?: string;
  displayDate?: Date;
  placeholder?: string;
  onChangeDate?: (value: Date | RangeSelectionValue | undefined) => {};
  onClear?: Function;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  disabled?: boolean;
  calendarPlacement?: Placement | undefined;
  dateFormat?: DateFormat;
  id?: string;
  mode?: 'single' | 'range';
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
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  calendarPlacement: PropTypes.oneOf<Placement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
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
};
export interface DatePickerState {
  displayDate: Date;
  selectedDate: Date[];
  value: Date | RangeSelectionValue | undefined;
  focused: boolean;
  inputFocused: boolean;
  invalid: boolean;
}
const SEPARATOR = '/';
const defaultProps: Partial<DatePickerProps> = {
  dateFormat: 'DD/MM/YYYY',
  calendarPlacement: 'bottom',
  mode: 'single',
  displayDate : new Date(),
};

export const DatePicker: BsPrefixRefForwardingComponent<
  'input',
  DatePickerProps
> = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      dateFormat = 'DD/MM/YYYY',
      calendarPlacement = 'bottom',
      mode = 'single',
      displayDate = new Date(),
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
    const overlayRef = useRef(null);
    
    const initialState: DatePickerState = {
      displayDate: displayDate,
      selectedDate: [],
      value:
      props.initialValue ??
        (mode === 'range' ? { start: undefined, end: undefined } : undefined),
      focused: false,
      inputFocused: false,
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
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && state.inputFocused) {
        setState({ ...state, focused: false });
      }
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (state.focused === true) {
        return;
      }
      setState({
        ...state,
        inputFocused: true,
        focused: true,
      });
      if (props.onFocus) {
        props.onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setState({
        ...state,
        inputFocused: false,
      });
      if (props.onBlur) {
        props.onBlur(event);
      }
    };
    const clear = () => {
      setState({
        ...initialState,
        displayDate: new Date(),
        value:
          isRange? { start: undefined, end: undefined } : undefined,
      });
      if (props.onClear) {
        props.onClear();
      }
      if (props.onChangeDate){
        props.onChangeDate(isRange ? { start: undefined, end: undefined } : undefined)
      }
    };

    const handleHide = () => {
      if (state.inputFocused) {
        return;
      }
      setState({
        ...state,
        focused: false,
      });
    };
    //triggered only when clicking dates
    const makeInputValueString = (date?: Date) => {
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

    const onChangeDateSingle = (newSelectedDate: Date) => {
      setState({
        ...state,
        value: newSelectedDate,
        selectedDate: [newSelectedDate],
        displayDate: newSelectedDate,
        focused: false,
      });
      if (props.onChangeDate) {
        props.onChangeDate(newSelectedDate);
      }
    };

    const onChangeDateRange = (newSelectedDate: Date) => {
      let selectedDates = state.selectedDate;
      let conditionalValue = state.value as RangeSelectionValue;
      let focused: boolean = state.focused;
      const { start, end } = conditionalValue;
      if ((!start && !end) || (start && end)) {
        conditionalValue.start =
          selectedDates[0] =
          selectedDates[1] =
            newSelectedDate;
        conditionalValue.end = undefined;
        focused = true;
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
        focused = false;
      }
      setState({
        ...state,
        value: conditionalValue,
        selectedDate: selectedDates,
        displayDate: newSelectedDate,
        focused: focused,
      });

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
          makeInputValueString(start) + separator + makeInputValueString(end)
        );
      }
      return makeInputValueString(state.value as Date);
    };
    const defaultPlaceHolder = isRange
      ? `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`
      : `${dateFormat.toLowerCase()}`;
    const controlProps = {
      onKeyDown: handleKeyDown,
      value: computeValue(),
      required: props.required,
      placeholder: props.placeholder || defaultPlaceHolder,
      ref: inputRef,
      disabled: props.disabled,
      onFocus: handleFocus,
      onBlur: handleBlur,
      readOnly: true,
      className: props.className,
      isInvalid: state.invalid,
    };
    const control = (
      <FormControl type="text" autoFocus={props.autoFocus} {...controlProps} />
    );

    const BodyContent = (): JSX.Element => {
      if (view === 'month')
        return (
          <MonthView
            displayDate={state.displayDate}
            state={state}
            setState={setState}
          />
        );
      if (view === 'year')
        return (
          <YearView
            displayDate={state.displayDate}
            state={state}
            setState={setState}
          />
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
      const displayDateStr = makeInputValueString(displayDate)
      if (isRange) {
        const {start, end} = props.initialValue as RangeSelectionValue
        return makeInputValueString(start) === displayDateStr || makeInputValueString(end) === displayDateStr
      } else {
        const initialValue = props.initialValue as Date
        return makeInputValueString(initialValue) === displayDateStr
      }
    }
    if(props.initialValue){
      warning(
        warningCondition(),
         'When `initialValue` prop is defined, `displayDate` prop must be of same value. For Datepicker in range mode, `displayDate` prop must be of same value as either `start` or `end`'
       );
    }
 // add warning for end date is earlier than start date
    return (
      <DatePickerContext.Provider value={contextValue}>
        <InputGroup variant="has-icon" id={props.id}>
          <div ref={overlayRef}> {control}</div>
          <Button onClick={clear} disabled={props.disabled}>
            <i className="bi bi-x"></i>
          </Button>
          <i className="bi bi-calendar form-control-icon"></i>
          <Overlay
            rootClose={true}
            onHide={handleHide}
            show={state.focused}
            target={formControlRef.current}
            placement={calendarPlacement}
            container={overlayRef}
            transition={true}
          >
            <Popover>
              <Popover.Header>{calendarHeader}</Popover.Header>
              <Popover.Body>{BodyContent()}</Popover.Body>
            </Popover>
          </Overlay>
        </InputGroup>
      </DatePickerContext.Provider>
    );
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = propTypes as any;
DatePicker.defaultProps = defaultProps;
export default DatePicker;
