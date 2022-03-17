import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';

import DatePickerContext from './DatePickerContext';
import { CalendarState } from './DatePicker';

export interface YearViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
  state: CalendarState;
  setState: React.Dispatch<React.SetStateAction<CalendarState>>;
}

export const YearView = React.forwardRef<HTMLDivElement, YearViewProps>(
  ({ displayDate, state, setState, ...props }, ref) => {
    const { setView } = useContext(DatePickerContext);
    const displayYear = displayDate.getFullYear();
    const startLimit = displayYear - 5;
    const endLimit = displayYear + 6;
    const yearArray = [];

    const handleClickYear = (year: number) => {
      const newDisplayDate = new Date(state.displayDate);
      newDisplayDate.setFullYear(year);
      setView('month');
      setState({
        ...state,
        displayDate: newDisplayDate,
      });
    };
  for (let i = startLimit; i < endLimit + 1; i++) {
      yearArray.push(i);
    } 

    return (
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {yearArray.map((y) => (
            <div
              className={classNames(displayYear === y && 'active', 'col-4')}
              key={y}
            >
              <button onClick={() => handleClickYear(y)}>{y}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default YearView;
