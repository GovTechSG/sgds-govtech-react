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
import MonthView from './MonthView';
import YearView from './YearView';
import moment from 'moment';
export interface MultiSelectionValue {
  start?: Date;
  end?: Date;
}
export interface DatePickerProps {
  defaultValue: string;
  // value: string;
  required: boolean;
  className: string;
  style: object;
  // minDate?: string;
  // maxDate?: string;
  cellPadding: string;
  autoComplete: string;
  placeholder: string;
  dayLabels: string[];
  monthLabels: string[];
  onChange: (value: string | MultiSelectionValue, formattedValue: string) => {};
  onClear: Function;
  onBlur: Function;
  onFocus: Function;
  autoFocus: boolean;
  disabled: boolean;
  weekStartsOn: number;
  clearButtonElement: string | JSX.Element;
  showClearButton: boolean;
  previousButtonElement: string | JSX.Element;
  nextButtonElement: string | JSX.Element;
  calendarPlacement: Placement | undefined;
  dateFormat: string; // 'MM/DD/YYYY'; 'DD/MM/YYYY'; 'YYYY/MM/DD'; 'DD-MM-YYYY'
  id: string;
  name: string;
  customControl: JSX.Element;
  children: JSX.Element | JSX.Element[];
  onInvalid: Function;
  noValidate: boolean;
  mode?: 'single' | 'range';
}

export interface CalendarState {
  // value: string | MultiSelectionValue;
  displayDate: Date;
  selectedDate: Date[];
  inputValue: Date | MultiSelectionValue | undefined;
  input: string;
  input2: string;
  focused: boolean;
  inputFocused: boolean;
  placeholder: string;
  invalid: boolean;
}
const SEPARATOR = '/';

export const DatePicker: React.FC<DatePickerProps> = ({
  // value = new Date().toISOString(),
  dateFormat = 'DD/MM/YYYY',
  calendarPlacement = 'bottom',
  mode = 'single',
  ...props
}) => {
  const isRange = mode === 'range';
  const formControlRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef(null);
  const initialState: CalendarState = {
    // value: mode === 'range' ? { start: '', end: '' } : value,
    displayDate: new Date(),
    selectedDate: [],
    inputValue:
      mode === 'range' ? { start: undefined, end: undefined } : undefined,
    focused: false,
    inputFocused: false,
    placeholder: dateFormat,
    input: '',
    input2: '',
    invalid: false,
    // separator: '/',
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

      // if (props.onBlur) {
      //   const event = document.createEvent('CustomEvent');
      //   event.initEvent('Change Date', true, false);
      //   ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
      //   this.props.onBlur(event);
      // }
    }
  };
  const handleFocus = () => {
    if (state.focused === true) {
      return;
    }
    setState({
      ...state,
      // selectedDate: [],
      inputFocused: true,
      focused: true,
    });
    // if (props.onFocus) {
    //   const event = document.createEvent('CustomEvent');
    //   event.initEvent('Change Date', true, false);
    //   ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
    //   props.onFocus(event);
    // }
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
      props.onChange('', '');
    }
  };
  const handleBadInput = (originalValue: string) => {
    const parts = originalValue
      .replace(new RegExp(`[^0-9${SEPARATOR}]`), '')
      .split(SEPARATOR);
    console.log({ parts });
    if (dateFormat.match(/MM.DD.YYYY/) || dateFormat.match(/DD.MM.YYYY/)) {
      if (parts[0] && parts[0].length > 2) {
        parts[1] = parts[0].slice(2) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 2);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0, 4);
      }
    } else {
      if (parts[0] && parts[0].length > 4) {
        parts[1] = parts[0].slice(4) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 4);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0, 2);
      }
    }
    return parts.join(SEPARATOR);
  };
  const handleInputChange = () => {
    const originalValue = formControlRef.current?.value;

    if (isRange && (state.inputValue as MultiSelectionValue).start) {
      const input = originalValue!
        .replace(/(-|\/\/)/g, SEPARATOR)
        .slice(13, 23);
      processInput(input, 'input2');
    } else {
      const input = originalValue!.replace(/(-|\/\/)/g, SEPARATOR).slice(0, 10);
      processInput(input, 'input');
     
    }
  };
  const processInput = (input: string, stateName: string) => {
    if (!input) {
      clear();
      return;
    }

    let month: string = '';
    let day: string = '';
    let year: string = '';
    if (dateFormat.match(/DD.MM.YYYY/)) {
      if (!input.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        const fixedInput = handleBadInput(input);
        setState({
          ...state,
          [stateName]: fixedInput as string,
        });
      }

      day = input.slice(0, 2).replace(/[^0-9]/g, '');
      month = input.slice(3, 5).replace(/[^0-9]/g, '');
      year = input.slice(6, 10).replace(/[^0-9]/g, '');
    }
    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      const fixedInput = handleBadInput(input);
      setState({
        ...state,
        [stateName]: fixedInput as string,
        invalid: true,
      });
    }

    if (
      !isNaN(monthInteger) &&
      !isNaN(dayInteger) &&
      !isNaN(yearInteger) &&
      monthInteger <= 12 &&
      dayInteger <= 31 &&
      yearInteger > 999
    ) {
      const momentDate = moment([
        yearInteger,
        monthInteger - 1,
        dayInteger,
        12,
        0,
        0,
        0,
      ]);

      if (momentDate.isValid()) {
        const selectedDate = momentDate.toDate();
        const inputValue =
          stateName === 'input'
            ? { start: selectedDate, end: undefined }
            : { ...state.inputValue, end: selectedDate };

        setState({
          ...state,
          inputValue: isRange ? inputValue : selectedDate,
          [stateName]: input,
          selectedDate: [...state.selectedDate, selectedDate],
          displayDate: selectedDate,
          invalid: !momentDate.isValid()
        });
        if (props.onChange) {
          props.onChange(selectedDate.toISOString(), input);
        }
      } else {
        setState({
          ...state,
          [stateName]: input,
          invalid: true ,
        });
      }
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
    // if (props.onBlur) {
    //   const event = document.createEvent('CustomEvent');
    //   event.initEvent('Change Date', true, false);
    //   ReactDOM?.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
    //   this.props.onBlur(event);
    // }
  };
  //triggered only when clicking dates
  const makeInputValueString = (date: Date) => {
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
      inputValue: newSelectedDate,
      input: makeInputValueString(newSelectedDate),
      selectedDate: [newSelectedDate],
      displayDate: newSelectedDate,
      focused: false,
    });
  };

  const onChangeDateRange = (newSelectedDate: Date) => {
    let selectedDates = state.selectedDate;
    let conditionalValue = state.inputValue as MultiSelectionValue;
    let focused: boolean = state.focused;
    let inputStart: string = state.input;
    let inputEnd: string = state.input2;
    const { start, end } = conditionalValue;
    if ((!start && !end) || (start && end)) {
      conditionalValue.start =
        selectedDates[0] =
        selectedDates[1] =
          newSelectedDate;
      conditionalValue.end = undefined;
      inputStart = makeInputValueString(newSelectedDate);
      inputEnd = ''
      focused = true;
    }
    if (start && !end) {
      // if selected end date is before selected start date --> swap
      if (new Date(start).getTime() > newSelectedDate.getTime()) {
        conditionalValue.end = start;
        conditionalValue.start = newSelectedDate;
        inputEnd = state.input;
        inputStart = makeInputValueString(newSelectedDate);
      } else {
        conditionalValue.end = newSelectedDate;
        inputEnd = makeInputValueString(newSelectedDate);
      }
      selectedDates[1] = newSelectedDate;
      focused = false;
    }
    setState({
      ...state,
      inputValue: conditionalValue,
      input: inputStart,
      input2: inputEnd,
      selectedDate: selectedDates,
      displayDate: newSelectedDate,
      focused: focused,
    });
    // if (props.onBlur) {
    //   const event = document.createEvent('CustomEvent');
    //   event.initEvent('Change Date', true, false);
    //   ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
    //   props.onBlur(event);
    // }

    // if (props.onChange) {
    //   props.onChange(newSelectedDate.toISOString(), inputValue);
    // }
  };

  const calendarHeader = (
    <CalendarHeader
      //@ts-ignore
      previousButtonElement={props.previousButtonElement}
      nextButtonElement={props.nextButtonElement}
      displayDate={state.displayDate as Date}
      // minDate={props.minDate}
      // maxDate={props.maxDate}
      onChange={onChangeMonth}
      monthLabels={props.monthLabels}
    />
  );

  const computeValue = () => {
    if (isRange) {
      const {start } = state.inputValue as MultiSelectionValue
      const separator = start
        ? ' - '
        : '';
        // const startInputMoment = start && moment(state.input, 'DD/MM/YYYY')
        // const endInputMoment = end && moment(state.input2, 'DD/MM/YYYY')
        // return startInputMoment?.isBefore(endInputMoment) ? state.input + separator + state.input2 : state.input2 + separator + state.input
      return state.input + separator + state.input2;
    }
    return state.input;
  };
  const controlProps = {
    onKeyDown: handleKeyDown,
    value: computeValue() /* computeInputValue() */,
    required: props.required,
    placeholder: '' /* state.focused ? dateFormat : state.placeholder */,
    ref: formControlRef,
    disabled: props.disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleInputChange,
    className: props.className,
    style: props.style,
    autoComplete: props.autoComplete,
    isInvalid: state.invalid,
  };
  const control = props.customControl ? (
    React.cloneElement(props.customControl, {
      ...controlProps,
      onInvalid: props.onInvalid,
      noValidate: props.noValidate,
    })
  ) : (
    <FormControl
      //@ts-ignore
      // ref="input"
      type="text"
      autoFocus={props.autoFocus}
      {...controlProps}
      // onInvalid={props.onInvalid}
      // noValidate={props.noValidate}
    />
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
    return (
      <Calendar
        cellPadding={props.cellPadding}
        selectedDate={state.selectedDate}
        displayDate={state.displayDate}
        changeDate={isRange ? onChangeDateRange : onChangeDateSingle}
        weekStartsOn={props.weekStartsOn}
        // minDate={props.minDate}
        // maxDate={props.maxDate}
        mode={mode}
      />
    );
  };
  return (
    <DatePickerContext.Provider value={contextValue}>
      <InputGroup
        variant="has-icon"
        //@ts-ignore
        // ref="inputGroup"
        //   bsClass={this.props.showClearButton ? this.props.bsClass : ''}
        //   bsSize={this.props.bsSize}
        id={props.id ? `${props.id}_group` : undefined}
      >
        <div ref={overlayRef}> {control} </div>
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

        {props.children}
      </InputGroup>
    </DatePickerContext.Provider>
  );
};
DatePicker.displayName = 'DatePicker';
export default DatePicker;
