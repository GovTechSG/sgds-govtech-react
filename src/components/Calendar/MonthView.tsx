import classNames from 'classnames';
import * as React from 'react';
import Button from '../Button/Button';
import Col from '../Col';
export interface MonthViewProps extends React.HTMLAttributes<HTMLElement> {
  displayDate: Date;
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
  ({ displayDate, ...props }, ref) => {
    const displayMonth = MONTH_LABELS[displayDate.getMonth()];

    return (
      <div className="container text-center" ref={ref} {...props}>
        <div className="row">
          {MONTH_LABELS.map((m) => (
            <div
              className={classNames(displayMonth === m && 'active', 'col-4')}
              key={m}
            >
              <button>{m}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default MonthView;
