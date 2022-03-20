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
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {MONTH_LABELS.map((m, idx) => (
            <div
              className={classNames(displayMonth === m  && 'active', 'col-4')}
              key={m}
            >
              <button onClick={() =>onClickMonth(idx)}>{m}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }   
);

export default MonthView;
