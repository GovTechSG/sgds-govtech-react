
export const argTypes = {
    initialValue: {
        description:  'The initial value of DatePicker on first load. When used, ensure that `displayDate` has the same value',
        table: {
            type: {
                summary: 'Date | RangeSelectionValue => {start: Date, end: Date}'
            }
        }
    },
    mode: {
        description: 'Changes DatePicker to single date selection or range date selection',
    },
    dateFormat: {
        description: 'Date format reflected on input'
    },
    calendarPlacement: {
        description: 'Overlay placement for the popover calendar'
    },
    disabled: {
        description: 'Disables the Form Control and Button of Datepicker'
    }, 
    autoFocus: {
        description: 'When true, DatePicker is focused on first load'
    }, 
    onFocus: {
        description: 'Focus callback function'
    },
    onBlur: {
        description: 'Blur callback function'
    },
    onClear: {
        description: 'Clear callback function'
    }, 
    placeholder: {
        description: 'Placeholder text on input control. Default differs depending on mode',
        table: {
            defaultValue: { summary: 'dd/mm/yyyy | dd/mm/yyyy - dd/mm/yyyy' },        }
    },
    displayDate: {
        description: 'Provides the date context for Calendar to present the appropriate view. If `initialValue` is used, `displayDate` should be synced with it'
    },
    maxDate: {
        description: 'ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z"'
    },
    minDate: {
        description: 'ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z"'
    },
    required: {
        description: 'Whent true, adds  required attribute to Form Control input element'
    },
    className: {
        description: 'Class name passed to the FormControl input element'
    }
}