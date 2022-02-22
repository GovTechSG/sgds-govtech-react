import React from 'react';
import FormControl from '../Form/FormControl';
import InputGroup from '../InputGroup/InputGroup';
import Overlay from '../Overlay/Overlay';
import Popover from '../Popover/Popover';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import { useState, useRef, useMemo } from 'react';
import { Placement } from '../types';
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
const SEPARATOR = '/'
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
  const escapeRegex = (str: string) => {
    return String(str).replace(new RegExp(`[^0-9${SEPARATOR}]`), '');
  };
  const handleBadInput = (originalValue: string) => {
    const parts = originalValue.replace(new RegExp(`[^0-9${escapeRegex(SEPARATOR)}]`), '')
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
    placeholder:  "" /* state.focused ? dateFormat : state.placeholder */,
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
    if (view === 'month') return <MonthView displayDate={state.displayDate}  state={state} setState={setState}/>;
    if (view === 'year') return <YearView displayDate={state.displayDate}  state={state} setState={setState} />
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

        <div ref={overlayRef} >{control} </div>
        <i className="bi bi-calendar form-control-icon"></i>
        <Overlay
          rootClose={true}
          onHide={handleHide}
          show={state.focused}
          target={formControlRef.current}
          placement={calendarPlacement}
          container={overlayRef}
          transition={false}
        >
          <Popover id={`date-picker-popover`}>
            <Popover.Header>{calendarHeader}</Popover.Header>
            <Popover.Body>
              {BodyContent()}
            </Popover.Body>
          </Popover>
        </Overlay>
        {props.children}
      </InputGroup>
    </DatePickerContext.Provider>
  );
};
export default DatePicker;
// export default createReactClass({
//   displayName: 'DatePicker',

//   propTypes: {
//     defaultValue: PropTypes.string,
//     value: PropTypes.string,
//     required: PropTypes.bool,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     minDate: PropTypes.string,
//     maxDate: PropTypes.string,
//     cellPadding: PropTypes.string,
//     autoComplete: PropTypes.string,
//     placeholder: PropTypes.string,
//     dayLabels: PropTypes.array,
//     monthLabels: PropTypes.array,
//     onChange: PropTypes.func,
//     onClear: PropTypes.func,
//     onBlur: PropTypes.func,
//     onFocus: PropTypes.func,
//     autoFocus: PropTypes.bool,
//     disabled: PropTypes.bool,
//     //@ts-ignore
//     weekStartsOnMonday: (props, propName, componentName) => {
//       if (props[propName]) {
//         return new Error(
//           `Prop '${propName}' supplied to '${componentName}' is obsolete. Use 'weekStartsOn' instead.`
//         );
//       }
//       return;
//     },
//     weekStartsOn: PropTypes.number,
//     clearButtonElement: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     showClearButton: PropTypes.bool,
//     previousButtonElement: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     nextButtonElement: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     calendarPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//     dateFormat: PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
//     calendarContainer: PropTypes.object,
//     id: PropTypes.string,
//     name: PropTypes.string,
//     showTodayButton: PropTypes.bool,
//     todayButtonLabel: PropTypes.string,
//     instanceCount: PropTypes.number,
//     customControl: PropTypes.object,
//     roundedCorners: PropTypes.bool,
//     showWeeks: PropTypes.bool,
//     children: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node,
//     ]),
//     onInvalid: PropTypes.func,
//     noValidate: PropTypes.bool,
//   },

//   getDefaultProps() {
//     const language =
//       typeof window !== 'undefined' && window.navigator
//         ? //@ts-ignore
//           (
//             navigator['userLanguage'] ||
//             window.navigator.language ||
//             ''
//           ).toLowerCase()
//         : '';
//     const dateFormat =
//       !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
//     return {
//       cellPadding: '5px',
//       dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       monthLabels: [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December',
//       ],
//       clearButtonElement: '×',
//       previousButtonElement: '<',
//       nextButtonElement: '>',
//       calendarPlacement: 'bottom',
//       dateFormat: dateFormat,
//       showClearButton: true,
//       autoFocus: false,
//       disabled: false,
//       showTodayButton: false,
//       todayButtonLabel: 'Today',
//       autoComplete: 'on',
//       showWeeks: false,
//       instanceCount: instanceCount++,
//       style: {
//         width: '100%',
//       },
//       roundedCorners: false,
//       noValidate: false,
//     };
//   },

//   getInitialState() {
//     if (this.props.value && this.props.defaultValue) {
//       throw new Error(
//         "Conflicting DatePicker properties 'value' and 'defaultValue'"
//       );
//     }
//     const state = this.makeDateValues(
//       this.props.value || this.props.defaultValue
//     );
//     if (this.props.weekStartsOn > 1) {
//       state.dayLabels = this.props.dayLabels
//         .slice(this.props.weekStartsOn)
//         .concat(this.props.dayLabels.slice(0, this.props.weekStartsOn));
//     } else if (this.props.weekStartsOn === 1) {
//       state.dayLabels = this.props.dayLabels
//         .slice(1)
//         .concat(this.props.dayLabels.slice(0, 1));
//     } else {
//       state.dayLabels = this.props.dayLabels;
//     }
//     state.focused = false;
//     state.inputFocused = false;
//     state.placeholder = this.props.placeholder || this.props.dateFormat;
//     SEPARATOR = this.props.dateFormat.match(/[^A-Z]/)[0];
//     return state;
//   },

//   makeDateValues(isoString: string) {
//     let displayDate;
//     const selectedDate = isoString
//       ? new Date(`${isoString.slice(0, 10)}T12:00:00.000Z`)
//       : null;
//     const minDate = this.props.minDate
//       ? new Date(`${this.props.minDate.slice(0, 10)}T12:00:00.000Z`)
//       : null;
//     const maxDate = this.props.maxDate
//       ? new Date(`${this.props.maxDate.slice(0, 10)}T12:00:00.000Z`)
//       : null;

//     const inputValue = isoString
//       ? this.makeInputValueString(selectedDate)
//       : null;
//     if (selectedDate) {
//       displayDate = new Date(selectedDate);
//     } else {
//       const today = new Date(
//         `${new Date().toISOString().slice(0, 10)}T12:00:00.000Z`
//       );
//       if (
//         minDate &&
//         Date.parse(minDate.toString()) >= Date.parse(today.toString())
//       ) {
//         displayDate = minDate;
//       } else if (
//         maxDate &&
//         Date.parse(maxDate.toString()) <= Date.parse(today.toString())
//       ) {
//         displayDate = maxDate;
//       } else {
//         displayDate = today;
//       }
//     }

//     return {
//       value: selectedDate ? selectedDate.toISOString() : null,
//       displayDate: displayDate,
//       selectedDate: selectedDate,
//       inputValue: inputValue,
//     };
//   },

//   clear() {
//     if (this.props.onClear) {
//       this.props.onClear();
//     } else {
//       this.setState(this.makeDateValues(null));
//     }

//     if (this.props.onChange) {
//       this.props.onChange(null, null);
//     }
//   },

//   handleHide() {
//     if (this.state.inputFocused) {
//       return;
//     }
//     this.setState({
//       focused: false,
//     });
//     if (this.props.onBlur) {
//       const event = document.createEvent('CustomEvent');
//       event.initEvent('Change Date', true, false);
//       ReactDOM?.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
//       this.props.onBlur(event);
//     }
//   },

//   handleKeyDown(e: KeyboardEvent) {
//     if (e.which === 9 && this.state.inputFocused) {
//       this.setState({
//         focused: false,
//       });

//       if (this.props.onBlur) {
//         const event = document.createEvent('CustomEvent');
//         event.initEvent('Change Date', true, false);
//         ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
//         this.props.onBlur(event);
//       }
//     }
//   },

//   handleFocus() {
//     if (this.state.focused === true) {
//       return;
//     }

//     const placement = this.getCalendarPlacement();

//     this.setState({
//       inputFocused: true,
//       focused: true,
//       calendarPlacement: placement,
//     });

//     if (this.props.onFocus) {
//       const event = document.createEvent('CustomEvent');
//       event.initEvent('Change Date', true, false);
//       ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
//       this.props.onFocus(event);
//     }
//   },

//   handleBlur() {
//     this.setState({
//       inputFocused: false,
//     });
//   },

//   shouldComponentUpdate: function (nextProps, nextState) {
//     return !(
//       //@ts-ignore
//       (this.state.inputFocused === true && nextState.inputFocused === false)
//     );
//   },

//   getValue() {
//     return this.state.selectedDate
//       ? this.state.selectedDate.toISOString()
//       : null;
//   },

//   getFormattedValue() {
//     return this.state.displayDate ? this.state.inputValue : null;
//   },

//   getCalendarPlacement() {
//     const tag = Object.prototype.toString.call(this.props.calendarPlacement);
//     const isFunction =
//       tag === '[object AsyncFunction]' ||
//       tag === '[object Function]' ||
//       tag === '[object GeneratorFunction]' ||
//       tag === '[object Proxy]';
//     if (isFunction) {
//       return this.props.calendarPlacement();
//     } else {
//       return this.props.calendarPlacement;
//     }
//   },

//   makeInputValueString(date: Date) {
//     const month = date.getMonth() + 1;
//     const day = date.getDate();

//     //this method is executed during intialState setup... handle a missing state properly
//     const separator = this.state
//       ? this.SEPARATOR
//       : this.props.dateFormat.match(/[^A-Z]/)[0];
//     if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
//       return (
//         (month > 9 ? month : `0${month}`) +
//         separator +
//         (day > 9 ? day : `0${day}`) +
//         separator +
//         date.getFullYear()
//       );
//     } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
//       return (
//         (day > 9 ? day : `0${day}`) +
//         separator +
//         (month > 9 ? month : `0${month}`) +
//         separator +
//         date.getFullYear()
//       );
//     } else {
//       return (
//         date.getFullYear() +
//         separator +
//         (month > 9 ? month : `0${month}`) +
//         separator +
//         (day > 9 ? day : `0${day}`)
//       );
//     }
//   },

//   handleBadInput(originalValue: string) {
//     const parts = originalValue
//       .replace(new RegExp(`[^0-9${this.SEPARATOR}]`), '')
//       .split(this.SEPARATOR);
//     if (
//       this.props.dateFormat.match(/MM.DD.YYYY/) ||
//       this.props.dateFormat.match(/DD.MM.YYYY/)
//     ) {
//       if (parts[0] && parts[0].length > 2) {
//         parts[1] = parts[0].slice(2) + (parts[1] || '');
//         parts[0] = parts[0].slice(0, 2);
//       }
//       if (parts[1] && parts[1].length > 2) {
//         parts[2] = parts[1].slice(2) + (parts[2] || '');
//         parts[1] = parts[1].slice(0, 2);
//       }
//       if (parts[2]) {
//         parts[2] = parts[2].slice(0, 4);
//       }
//     } else {
//       if (parts[0] && parts[0].length > 4) {
//         parts[1] = parts[0].slice(4) + (parts[1] || '');
//         parts[0] = parts[0].slice(0, 4);
//       }
//       if (parts[1] && parts[1].length > 2) {
//         parts[2] = parts[1].slice(2) + (parts[2] || '');
//         parts[1] = parts[1].slice(0, 2);
//       }
//       if (parts[2]) {
//         parts[2] = parts[2].slice(0, 2);
//       }
//     }
//     this.setState({
//       inputValue: parts.join(this.SEPARATOR),
//     });
//   },

//   handleInputChange() {
//     //@ts-ignore
//     const originalValue = ReactDOM.findDOMNode(this.refs.input)?.value;
//     const inputValue = originalValue
//       .replace(/(-|\/\/)/g, this.SEPARATOR)
//       .slice(0, 10);

//     if (!inputValue) {
//       this.clear();
//       return;
//     }

//     let month, day, year;
//     if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
//       if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
//         return this.handleBadInput(originalValue);
//       }

//       month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
//       day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
//       year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
//     } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
//       if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
//         return this.handleBadInput(originalValue);
//       }

//       day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
//       month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
//       year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
//     } else {
//       if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
//         return this.handleBadInput(originalValue);
//       }

//       year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
//       month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
//       day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
//     }

//     const monthInteger = parseInt(month, 10);
//     const dayInteger = parseInt(day, 10);
//     const yearInteger = parseInt(year, 10);
//     if (monthInteger > 12 || dayInteger > 31) {
//       return this.handleBadInput(originalValue);
//     }

//     if (
//       !isNaN(monthInteger) &&
//       !isNaN(dayInteger) &&
//       !isNaN(yearInteger) &&
//       monthInteger <= 12 &&
//       dayInteger <= 31 &&
//       yearInteger > 999
//     ) {
//       const selectedDate = new Date(
//         yearInteger,
//         monthInteger - 1,
//         dayInteger,
//         12,
//         0,
//         0,
//         0
//       );
//       this.setState({
//         selectedDate: selectedDate,
//         displayDate: selectedDate,
//         value: selectedDate.toISOString(),
//       });

//       if (this.props.onChange) {
//         this.props.onChange(selectedDate.toISOString(), inputValue);
//       }
//     }

//     this.setState({
//       inputValue: inputValue,
//     });
//   },

//   onChangeMonth(newDisplayDate: Date) {
//     this.setState({
//       displayDate: newDisplayDate,
//     });
//   },

//   onChangeDate(newSelectedDate: Date) {
//     const inputValue = this.makeInputValueString(newSelectedDate);
//     this.setState({
//       inputValue: inputValue,
//       selectedDate: newSelectedDate,
//       displayDate: newSelectedDate,
//       value: newSelectedDate.toISOString(),
//       focused: false,
//     });

//     if (this.props.onBlur) {
//       const event = document.createEvent('CustomEvent');
//       event.initEvent('Change Date', true, false);
//       ReactDOM.findDOMNode(this.refs.hiddenInput)?.dispatchEvent(event);
//       this.props.onBlur(event);
//     }

//     if (this.props.onChange) {
//       this.props.onChange(newSelectedDate.toISOString(), inputValue);
//     }
//   },

//   componentWillReceiveProps(newProps) {
//     //@ts-ignore
//     const value = newProps.value;
//     if (this.getValue() !== value) {
//       this.setState(this.makeDateValues(value));
//     }
//   },

//   render() {
//     const calendarHeader = (
//       <CalendarHeader
//         //@ts-ignore
//         previousButtonElement={this.props.previousButtonElement}
//         nextButtonElement={this.props.nextButtonElement}
//         displayDate={this.state.displayDate}
//         minDate={this.props.minDate}
//         maxDate={this.props.maxDate}
//         onChange={this.onChangeMonth}
//         monthLabels={this.props.monthLabels}
//         dateFormat={this.props.dateFormat}
//       />
//     );

//     const control = this.props.customControl ? (
//       React.cloneElement(this.props.customControl, {
//         onKeyDown: this.handleKeyDown,
//         value: this.state.inputValue || '',
//         required: this.props.required,
//         placeholder: this.state.focused
//           ? this.props.dateFormat
//           : this.state.placeholder,
//         ref: 'input',
//         disabled: this.props.disabled,
//         onFocus: this.handleFocus,
//         onBlur: this.handleBlur,
//         onChange: this.handleInputChange,
//         className: this.props.className,
//         style: this.props.style,
//         autoComplete: this.props.autoComplete,
//         onInvalid: this.props.onInvalid,
//         noValidate: this.props.noValidate,
//       })
//     ) : (
//       <FormControl
//         onKeyDown={this.handleKeyDown}
//         value={this.state.inputValue || ''}
//         required={this.props.required}
//         //@ts-ignore
//         // ref="input"
//         type="text"
//         className={this.props.className}
//         style={this.props.style}
//         autoFocus={this.props.autoFocus}
//         disabled={this.props.disabled}
//         placeholder={
//           this.state.focused ? this.props.dateFormat : this.state.placeholder
//         }
//         onFocus={this.handleFocus}
//         onBlur={this.handleBlur}
//         onChange={this.handleInputChange}
//         autoComplete={this.props.autoComplete}
//         onInvalid={this.props.onInvalid}
//         noValidate={this.props.noValidate}
//       />
//     );

//     return (
//       <InputGroup
//         //@ts-ignore
//         // ref="inputGroup"
//         //   bsClass={this.props.showClearButton ? this.props.bsClass : ''}
//         //   bsSize={this.props.bsSize}
//         id={this.props.id ? `${this.props.id}_group` : undefined}
//       >
//         {control}
//         <Overlay
//           rootClose={true}
//           onHide={this.handleHide}
//           show={this.state.focused}
//           container={() =>
//             this.props.calendarContainer ||
//             ReactDOM.findDOMNode(this.refs.overlayContainer)
//           }
//           //@ts-ignore
//           target={() => ReactDOM.findDOMNode(this.refs.input)}
//           placement={this.state.calendarPlacement}
//         >
//           <Popover
//             id={`date-picker-popover-${this.props.instanceCount}`}
//             className="date-picker-popover"
//           >
//             <Popover.Header>{calendarHeader}</Popover.Header>

//             <Calendar
//               //@ts-ignore
//               cellPadding={this.props.cellPadding}
//               selectedDate={this.state.selectedDate}
//               displayDate={this.state.displayDate}
//               onChange={this.onChangeDate}
//               dayLabels={this.state.dayLabels}
//               weekStartsOn={this.props.weekStartsOn}
//               showTodayButton={this.props.showTodayButton}
//               todayButtonLabel={this.props.todayButtonLabel}
//               minDate={this.props.minDate}
//               maxDate={this.props.maxDate}
//               roundedCorners={this.props.roundedCorners}
//               showWeeks={this.props.showWeeks}
//             />
//           </Popover>
//         </Overlay>
//         <div ref="overlayContainer" style={{ position: 'relative' }} />
//         <input
//           ref="hiddenInput"
//           type="hidden"
//           id={this.props.id}
//           name={this.props.name}
//           value={this.state.value || ''}
//           data-formattedvalue={this.state.value ? this.state.inputValue : ''}
//         />
//         {this.props.showClearButton && !this.props.customControl && (
//           <Button>
//             <div
//               style={{
//                 opacity:
//                   this.state.inputValue && !this.props.disabled ? 1 : 0.5,
//               }}
//             >
//               {this.props.clearButtonElement}
//             </div>
//           </Button>
//         )}
//         {this.props.children}
//       </InputGroup>
//     );
//   },
// });
