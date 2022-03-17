import React from 'react';
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
export interface MultiSelectionValue {
  start?: Date;
  end?: Date;
}
export interface DatePickerProps {
  defaultValue: string;
  value: Date | MultiSelectionValue;
  required: boolean;
  className: string;
  style: object;
  minDate?: string;
  maxDate?: string;
  displayDate?: Date;
  placeholder: string;
  dayLabels: string[];
  monthLabels: string[];
  onChange: (value: Date | MultiSelectionValue) => {};
  onClear: Function;
  onBlur: Function;
  onFocus: Function;
  autoFocus: boolean;
  disabled: boolean;
  calendarPlacement: Placement | undefined;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
  id: string;
  name: string;
  noValidate: boolean;
  mode?: 'single' | 'range';
}

export interface CalendarState {
  displayDate: Date;
  selectedDate: Date[];
  value: Date | MultiSelectionValue | undefined;
  focused: boolean;
  inputFocused: boolean;
  placeholder: string;
  invalid: boolean;
}
const SEPARATOR = '/';

export const DatePicker: React.FC<DatePickerProps> = ({
  dateFormat = 'DD/MM/YYYY',
  calendarPlacement = 'bottom',
  mode = 'single',
  ...props
}) => {
  const isRange = mode === 'range';
  const formControlRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef(null);
  const initialState: CalendarState = {
    displayDate: props.displayDate ?? new Date(),
    selectedDate: [],
    value: mode === 'range' ? { start: undefined, end: undefined } : undefined,
    focused: false,
    inputFocused: false,
    placeholder: props.placeholder,
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
  const handleFocus = () => {
    if (state.focused === true) {
      return;
    }
    setState({
      ...state,
      inputFocused: true,
      focused: true,
    });
  };

  const handleBlur = () => {
    setState({
      ...state,
      inputFocused: false,
    });
  };
  const clear = () => {
    if (props.onClear) {
      props.onClear();
    } else {
      setState(initialState);
    }

    if (props.onChange) {
      props.onChange({});
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
    if (date === undefined) return ''
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
    if (props.onChange) {
      props.onChange(newSelectedDate);
    }
  };

  const onChangeDateRange = (newSelectedDate: Date) => {
    let selectedDates = state.selectedDate;
    let conditionalValue = state.value as MultiSelectionValue;
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

    if (props.onChange) {
      props.onChange(conditionalValue);
    }
  };

  const calendarHeader = (
    <CalendarHeader
      displayDate={state.displayDate as Date}
      onChange={onChangeMonth}
      monthLabels={props.monthLabels}
    />
  );

  const computeValue = () => {
    if (isRange) {
      const { start, end } = state.value as MultiSelectionValue;
      const separator = start ? ' - ' : '';
      return makeInputValueString(start) + separator + makeInputValueString(end);
    }
    return makeInputValueString(state.value as Date);
  };
  const controlProps = {
    onKeyDown: handleKeyDown,
    value: computeValue(),
    required: props.required,
    placeholder: props.placeholder,
    ref: formControlRef,
    disabled: props.disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    readOnly: true,
    className: props.className,
    style: props.style,
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
        const { start, end } = state.value as MultiSelectionValue;
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
  return (
    <DatePickerContext.Provider value={contextValue}>
      <InputGroup
        variant="has-icon"
        id={props.id ? `${props.id}_group` : undefined}
      >
        <div ref={overlayRef}> {control}</div>
        <Button onClick={clear}>
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
          <Popover id={`date-picker-popover`}>
            <Popover.Header>{calendarHeader}</Popover.Header>
            <Popover.Body>{BodyContent()}</Popover.Body>
          </Popover>
        </Overlay>
      </InputGroup>
    </DatePickerContext.Provider>
  );
};
DatePicker.displayName = 'DatePicker';
export default DatePicker;
