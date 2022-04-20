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
      <div className="sgds yearpicker" ref={ref} {...props}>
        {yearArray.map((y) => (
          <button className={classNames(displayYear === y && 'active', 'year')}
            key={y} onClick={() => onClickYear(y)}>{y}</button>
        ))}
      </div>
    );
  }
);

export default YearView;
