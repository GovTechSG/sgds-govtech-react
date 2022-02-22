import classNames from 'classnames';
import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '../Button/Button';
import Col from '../Col';
import DatePickerContext from './DatePickerContext'
import { CalendarState } from './DatePicker';

export interface YearViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
  state: CalendarState;
  setState: React.Dispatch<React.SetStateAction<CalendarState>>
}



export const YearView = React.forwardRef<HTMLDivElement, YearViewProps>(
  ({ displayDate,state, setState, ...props }, ref) => {
    const {setView}  = useContext(DatePickerContext)
      console.log(displayDate.getFullYear())
      const displayYear = displayDate.getFullYear()
      const startLimit = displayYear - 5
      const endLimit = displayYear + 6
      const yearArray = []

      const handleClickYear = (year: number) => {
        setView('month')
        setState({
          ...state,
          displayDate: new Date(state.displayDate.setFullYear(year))
        })
      }
      for(let i = startLimit; i<endLimit + 1; i++){
          yearArray.push(i)
      }
    // const [year, setYear] = useState(displayDate.getFullYear())
    // const [startLimit, setStartLimit]  = useState(displayDate.getFullYear() - 5)
    // const [endLimit, setEndLimit] = useState(displayDate.getFullYear() + 6)
    return (
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {yearArray.map((y) => (
            <div
              className={classNames(displayYear === y && 'active', 'col-4')}
              key={y}
            >
              <button onClick={() =>handleClickYear(y)}>{y}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default YearView;
