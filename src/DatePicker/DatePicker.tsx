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

export interface DatePickerProps {
  defaultValue: string;
  value: string;
  required: boolean;
  className: string;
  style: object;
  minDate?: string;
  maxDate?: string;
  cellPadding: string;
  autoComplete: string;
  placeholder: string;
  dayLabels: string[];
  monthLabels: string[];
  onChange: (value: string, formattedValue: string) => {};
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
  calendarContainer: JSX.Element;
  id: string;
  name: string;
  showTodayButton: boolean;
  todayButtonLabel: string;
  instanceCount: number;
  customControl: JSX.Element;
  roundedCorners: boolean;
  showWeeks: boolean;
  children: JSX.Element | JSX.Element[];
  onInvalid: Function;
  noValidate: boolean;
  multiSelection?: boolean;
}

export interface CalendarState {
  value: string;
  displayDate: Date;
  selectedDate: Date;
  inputValue: string;
  focused: boolean;
  inputFocused: boolean;
  placeholder: string;
  // separator: string;
}
const SEPARATOR = '/';

export const DatePicker: React.FC<DatePickerProps> = ({
  value = new Date().toISOString(),
  dateFormat = 'DD/MM/YYYY',
  calendarPlacement = 'bottom',
  multiSelection = false,
  ...props
}) => {
  const formControlRef = useRef(null);
  const overlayRef = useRef(null);
  const initialState: CalendarState = {
    value: value,
    displayDate: new Date(),
    selectedDate: new Date(),
    inputValue: '',
    focused: false,
    inputFocused: false,
    placeholder: dateFormat,
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
    setState({
      ...state,
      inputValue: parts.join(SEPARATOR),
    });
  };

  const handleInputChange = () => {
    //@ts-ignore
    const originalValue = formControlRef.current.value;
    const inputValue = originalValue
      .replace(/(-|\/\/)/g, SEPARATOR)
      .slice(0, 10);
    if (!inputValue) {
      clear();
      return;
    }

    let month, day, year;
    if (dateFormat.match(/MM.DD.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        return handleBadInput(originalValue);
      }

      month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else if (dateFormat.match(/DD.MM.YYYY/)) {
      if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        return handleBadInput(originalValue);
      }

      day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
      month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
    } else {
      if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        return handleBadInput(originalValue);
      }

      year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
      month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
      day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
    }

    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      return handleBadInput(originalValue);
    }

    if (
      !isNaN(monthInteger) &&
      !isNaN(dayInteger) &&
      !isNaN(yearInteger) &&
      monthInteger <= 12 &&
      dayInteger <= 31 &&
      yearInteger > 999
    ) {
      const selectedDate = new Date(
        yearInteger,
        monthInteger - 1,
        dayInteger,
        12,
        0,
        0,
        0
      );
      setState({
        ...state,
        inputValue: inputValue,
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString(),
      });

      if (props.onChange) {
        props.onChange(selectedDate.toISOString(), inputValue);
      }
    }

    // setState({
    //   ...state,
    //   inputValue: inputValue,
    // });
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
  const onChangeDate = (newSelectedDate: Date) => {
    const inputValue = makeInputValueString(newSelectedDate);
    setState({
      ...state,
      inputValue: inputValue,
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString(),
      focused: false,
    });
    // if (props.onBlur) {
    //   const event = document.createEvent('CustomEvent');
    //   event.initEvent('Change Date', true, false);
    //   ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
    //   props.onBlur(event);
    // }

    if (props.onChange) {
      props.onChange(newSelectedDate.toISOString(), inputValue);
    }
  };
  //which value should it track. prop.value or state.value
  // useEffect(() => {
  //   setState({
  //     ...state,
  //     ...makeDateValues(value),
  //   });
  // }, [value]);

  // const makeDateValues = (isoString: string) => {
  //   let displayDate;
  //   const selectedDate = isoString ? new Date(`${isoString.slice(0, 10)}T12:00:00.000Z`) : null;
  //   const minDate =
  //     props.minDate && new Date(`${props.minDate.slice(0, 10)}T12:00:00.000Z`);

  //   const maxDate =
  //     props.maxDate && new Date(`${props.maxDate.slice(0, 10)}T12:00:00.000Z`);

  //   const inputValue = isoString ? makeInputValueString(selectedDate!) : '';
  //   if (selectedDate) {
  //     displayDate = new Date(selectedDate);
  //   } else {
  //     const today = new Date(
  //       `${new Date().toISOString().slice(0, 10)}T12:00:00.000Z`
  //     );
  //     if (
  //       minDate &&
  //       Date.parse(minDate.toString()) >= Date.parse(today.toString())
  //     ) {
  //       displayDate = minDate;
  //     } else if (
  //       maxDate &&
  //       Date.parse(maxDate.toString()) <= Date.parse(today.toString())
  //     ) {
  //       displayDate = maxDate;
  //     } else {
  //       displayDate = today;
  //     }
  //   }

  //   return {
  //     value: selectedDate ? selectedDate.toISOString() : '',
  //     displayDate: displayDate,
  //     ...(selectedDate && {selectedDate}),
  //     inputValue: inputValue,
  //   };
  // };

  const calendarHeader = (
    <CalendarHeader
      //@ts-ignore
      previousButtonElement={props.previousButtonElement}
      nextButtonElement={props.nextButtonElement}
      displayDate={state.displayDate as Date}
      minDate={props.minDate}
      maxDate={props.maxDate}
      onChange={onChangeMonth}
      monthLabels={props.monthLabels}
    />
  );

  const controlProps = {
    onKeyDown: handleKeyDown,
    value: state.inputValue,
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
        changeDate={onChangeDate}
        weekStartsOn={props.weekStartsOn}
        showTodayButton={props.showTodayButton}
        todayButtonLabel={props.todayButtonLabel}
        minDate={props.minDate}
        maxDate={props.maxDate}
        roundedCorners={props.roundedCorners}
        showWeeks={props.showWeeks}
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
DatePicker.displayName = 'DatePicker'
export default DatePicker;
