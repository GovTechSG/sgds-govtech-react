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
import {isExists, isAfter, isBefore, isEqual} from 'date-fns'
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
  input1: string;
  input2: string;
  focused: boolean;
  inputFocused: boolean;
  placeholder: string;
  invalid: boolean;
}
const SEPARATOR = '/';

const arrangeInputValue = (inputValue: MultiSelectionValue) => {
  const { start, end } = inputValue;
  if (!end) return inputValue
  if (isBefore(start!, end)) return inputValue 
    else return {start: end, end: start}
};

const handleBadInput = (originalValue: string, dateFormat: string) => {
  const parts = originalValue
    .replace(new RegExp(`[^0-9${SEPARATOR}]`), '')
    .split(SEPARATOR);
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

const validateSelectedDate = (
  inputType: string,
  selectedDate: Date,
  minDate? : string, 
  maxDate?: string
) => {
  if (minDate && maxDate) {
    if (inputType === 'input1') {
      return isEqual(new Date(minDate), selectedDate) || isBefore(new Date(minDate), selectedDate)
      // return moment(minDate).isSameOrBefore(selectedDate);
    }
    if (inputType === 'input2') {
      return isEqual(new Date(maxDate), selectedDate) || isAfter(new Date(maxDate), selectedDate)

      // return moment(maxDate).isSameOrAfter(selectedDate);
    }
  }
  if (minDate && !maxDate) {
    return  isEqual(new Date(minDate), selectedDate) || isBefore(new Date(minDate), selectedDate)
      // return moment(minDate).isSameOrBefore(selectedDate);
    
  }
  if (!minDate && maxDate) {
    return isEqual(new Date(maxDate), selectedDate) || isAfter(new Date(maxDate), selectedDate)

      // return moment(maxDate).isSameOrAfter(selectedDate);
  }
  return true;
};


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
    placeholder: dateFormat,
    input1: '',
    input2: '',
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

  // const handleInputChange = (e:React.ChangeEventHandler<HTMLInputElement>) => {
  //   const originalValue = formControlRef.current?.value;
  //   if (isRange &&  (state.value as MultiSelectionValue).start) {
  //     const input = originalValue!
  //       .replace(/(-|\/\/)/g, SEPARATOR)
  //       .slice(13, 23);
  //     processInput(input, 'input2');
  //   } else {
  //     const input = originalValue!.replace(/(-|\/\/)/g, SEPARATOR).slice(0, 10);
  //     processInput(input, 'input1');
  //   }
  // };
  const processInput = (input: string, stateName: string) => {
    // console.log(input)
    // if (!input) {
      
    //   console.log('here')
    //   clear();
    //   return;
    // }

    let month: string = '';
    let day: string = '';
    let year: string = '';
    if (dateFormat.match(/MM.DD.YYYY/)) {
      if (!input.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        const fixedInput = handleBadInput(input, dateFormat);
        setState({
          ...state,
          [stateName]: fixedInput as string,
        });
      }

      month = input.slice(0, 2).replace(/[^0-9]/g, '');
      day = input.slice(3, 5).replace(/[^0-9]/g, '');
      year = input.slice(6, 10).replace(/[^0-9]/g, '');
    } else if (dateFormat.match(/DD.MM.YYYY/)) {
      if (!input.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        const fixedInput = handleBadInput(input, dateFormat);
        setState({
          ...state,
          [stateName]: fixedInput as string,
        });
      }

      day = input.slice(0, 2).replace(/[^0-9]/g, '');
      month = input.slice(3, 5).replace(/[^0-9]/g, '');
      year = input.slice(6, 10).replace(/[^0-9]/g, '');
    } else {
      if (!input.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        const fixedInput = handleBadInput(input, dateFormat);
        setState({
          ...state,
          [stateName]: fixedInput as string,
        });
      }

      year = input.slice(0, 4).replace(/[^0-9]/g, '');
      month = input.slice(5, 7).replace(/[^0-9]/g, '');
      day = input.slice(8, 10).replace(/[^0-9]/g, '');
    }

    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      const fixedInput = handleBadInput(input, dateFormat);
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
      const isValidDate = isExists(yearInteger, monthInteger -1, dayInteger)
      const selectedDate = new Date(
        yearInteger,
        monthInteger - 1,
        dayInteger,
        12,
        0,
        0,
        0,
      );

      if (isValidDate && validateSelectedDate(stateName, selectedDate, props.minDate, props.maxDate)) {
    
        const inputValue =
          stateName === 'input1'
            ? { start: selectedDate, end: undefined }
            : { ...state.value, end: selectedDate };

        setState({
          ...state,
          value: isRange ? arrangeInputValue(inputValue) : selectedDate,
          [stateName]: input,
          selectedDate: [...state.selectedDate, selectedDate],
          displayDate: selectedDate,
          invalid: !isValidDate,
        });
        if (props.onChange) {
          props.onChange(
            isRange ? arrangeInputValue(inputValue) : selectedDate
          );
        }
      } else {
        setState({
          ...state,
          [stateName]: input,
          invalid: true,
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
      value: newSelectedDate,
      input1: makeInputValueString(newSelectedDate),
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
    let inputStart: string = state.input1;
    let inputEnd: string = state.input2;
    const { start, end } = conditionalValue;
    if ((!start && !end) || (start && end)) {
      conditionalValue.start =
        selectedDates[0] =
        selectedDates[1] =
          newSelectedDate;
      conditionalValue.end = undefined;
      inputStart = makeInputValueString(newSelectedDate);
      inputEnd = '';
      focused = true;
    }
    if (start && !end) {
      // if selected end date is before selected start date --> swap
      if (new Date(start).getTime() > newSelectedDate.getTime()) {
        conditionalValue.end = start;
        conditionalValue.start = newSelectedDate;
        inputEnd = state.input1;
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
      value: conditionalValue,
      input1: inputStart,
      input2: inputEnd,
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
      const { start } = state.value as MultiSelectionValue;
      const separator = start ? ' - ' : '';
      return state.input1 + separator + state.input2;
    }
    return state.input1;
  };
  const controlProps = {
    onKeyDown: handleKeyDown,
    value: computeValue(),
    required: props.required,
    placeholder: '',
    ref: formControlRef,
    disabled: props.disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    // onChange: handleInputChange,
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
        let selectedDate: Date[] =[]
        if (isRange) {
          const {start, end}  = state.value as MultiSelectionValue
          if (start) selectedDate.push(start)
          if (end) selectedDate.push(end)

          return selectedDate
        } else {
          if (state.value) selectedDate.push(state.value as Date)
          
          return selectedDate
        }
      }
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
