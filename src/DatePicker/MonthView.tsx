import classNames from 'classnames';
import * as React from 'react';

export interface MonthViewProps extends React.HTMLAttributes<HTMLElement> {
  onClickMonth : Function;
  displayDate: Date;
}

export const MONTH_LABELS = [
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
  ({ displayDate, onClickMonth, ...props }, ref) => {
    const displayMonth = MONTH_LABELS[displayDate.getMonth()];

    return (
      <div className="sgds monthpicker" ref={ref} {...props}>
          {MONTH_LABELS.map((m, idx) => (
            <button className={classNames(displayMonth === m  && 'active', 'month')}
              key={m} onClick={() =>onClickMonth(idx)}>{m}</button>
          ))}
      </div>
    );
  }   
);

export default MonthView;
