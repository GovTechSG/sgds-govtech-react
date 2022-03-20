import classNames from 'classnames';
import * as React from 'react';

export interface YearViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
  onClickYear: Function;
}

export const YearView = React.forwardRef<HTMLDivElement, YearViewProps>(
  ({ displayDate, onClickYear, ...props }, ref) => {
    const displayYear = displayDate.getFullYear();
    const startLimit = displayYear - 5;
    const endLimit = displayYear + 6;
    const yearArray = [];

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
              <button onClick={() => onClickYear(y)}>{y}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default YearView;
