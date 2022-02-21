import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import Col from '../Col';
export interface YearViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
}



export const YearView = React.forwardRef<HTMLDivElement, YearViewProps>(
  ({ displayDate, ...props }, ref) => {
      console.log(displayDate.getFullYear())
      const displayYear = displayDate.getFullYear()
      const startLimit = displayYear - 5
      const endLimit = displayYear + 6
      const yearArray = []

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
              <button>{y}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default YearView;
