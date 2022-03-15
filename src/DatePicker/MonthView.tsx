import classNames from 'classnames';
import * as React from 'react';
import DatePickerContext from './DatePickerContext'
import { useContext } from 'react';
import { CalendarState } from './DatePicker';
export interface MonthViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
  state: CalendarState;
  setState: React.Dispatch<React.SetStateAction<CalendarState>>
  minDate?: string; 
  maxDate?: string;
}


const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthView = React.forwardRef<HTMLDivElement, MonthViewProps>(
  ({ displayDate, state, setState, ...props }, ref) => {
    const displayMonth = MONTH_LABELS[displayDate.getMonth()];
    const {setView}  = useContext(DatePickerContext)

    const handleClickMonth = (month: number) => {
      const newDisplayDate = new Date(state.displayDate)
      newDisplayDate.setMonth(month)
      setView('day')
      setState({
        ...state,
        displayDate: newDisplayDate
      })
    }
    const displayMinMonth = props.minDate ? new Date(props.minDate).getMonth() : 0
    const displayMaxMonth = props.maxDate ? new Date(props.maxDate).getMonth() : 11

    const activeMonths = Array.apply(null, {length: displayMaxMonth + 1 - displayMinMonth}).map(function(_, idx) {
      return idx + displayMinMonth;
  });

    return (
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {MONTH_LABELS.map((m, idx) => (
            <div
              className={classNames(displayMonth === m  && 'active', !activeMonths.includes(idx) && 'disabled', 'col-4')}
              key={m}
            >
              <button onClick={() =>handleClickMonth(idx)}>{m}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }   
);

export default MonthView;
