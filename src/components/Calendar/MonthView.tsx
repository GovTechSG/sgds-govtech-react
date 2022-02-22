import classNames from 'classnames';
import * as React from 'react';
import Button from '../Button/Button';
import Col from '../Col';
import DatePickerContext from './DatePickerContext'
import { useState, useContext } from 'react';
import { CalendarState } from './DatePicker';
export interface MonthViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
  state: CalendarState;
  setState: React.Dispatch<React.SetStateAction<CalendarState>>
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
      setView('day')
      setState({
        ...state,
        displayDate: new Date(state.displayDate.setMonth(month))
      })
    }
    return (
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {MONTH_LABELS.map((m, idx) => (
            <div
              className={classNames(displayMonth === m && 'active', 'col-4')}
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
