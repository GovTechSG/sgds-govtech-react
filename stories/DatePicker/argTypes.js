
export const argTypes = {
    value: {
        description:  'The current value of DatePicker',
        table: {
            type: {
                summary: 'Date | RangeSelectionValue => {start: Date, end: Date}'
            }
        }
    },
    mode: {
        description: 'Changes DatePicker to single date selection or range date selection',
        table: {
            type: {
                summary: 'single | range'
            },
            defaultValue: 'single',
        }
    }
    // required?: boolean;
    // className?: string;
    // style?: object;
    // minDate?: string;
    // maxDate?: string;
    // displayDate?: Date;
    // placeholder?: string;
    // dayLabels?: string[];
    // monthLabels?: string[];
    // onChange?: (value: Date | RangeSelectionValue) => {};
    // onClear?: Function;
    // onBlur?: Function;
    // onFocus?: Function;
    // autoFocus?: boolean;
    // disabled?: boolean;
    // calendarPlacement?: Placement | undefined;
    // dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
    // id?: string;
    // mode?: 'single' | 'range';  
}