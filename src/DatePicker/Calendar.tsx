import * as React from 'react';
interface CalendarProps extends React.HTMLAttributes<HTMLTableElement> {
  selectedDate: Date[];
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  changeDate: (date: Date) => void;
  dayLabels?: string[];
  mode: 'single' | 'range';
}
const CELL_PADDING = '5px';
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const setTimeToNoon = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(12);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};
const generateIncrementDays = (start: Date, end: Date) => {
  let arr = [];
  for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
export const Calendar = React.forwardRef<HTMLTableElement, CalendarProps>(
  ({ dayLabels = DAY_LABELS, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      const day = e.currentTarget.getAttribute('data-day')!;
      const displayDateClone = new Date(props.displayDate);
      const newSelectedDate = setTimeToNoon(displayDateClone);
      newSelectedDate.setDate(parseInt(day));
      props.changeDate(newSelectedDate);
    };
    const currentDate = setTimeToNoon(new Date());
    const selectedDates = props.selectedDate.map((d) => setTimeToNoon(d));
    const rangeSelectedDates = generateIncrementDays(
      new Date(selectedDates[0]),
      new Date(selectedDates[1])
    );
    const minimumDate = props.minDate
      ? setTimeToNoon(new Date(props.minDate))
      : null;
    const maximumDate = props.maxDate
      ? setTimeToNoon(new Date(props.maxDate))
      : null;
    const year = props.displayDate.getFullYear();
    const month = props.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
    let monthLength = daysInMonth[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        monthLength = 29;
      }
    }

    const weeks = [];
    let day = 1;
    for (let i = 0; i < 9; i++) {
      const week = [];
      for (let j = 0; j <= 6; j++) {
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          let className = undefined;
          const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
          const beforeMinDate =
            minimumDate &&
            Date.parse(date) < Date.parse(minimumDate.toISOString());
          const afterMinDate =
            maximumDate &&
            Date.parse(date) > Date.parse(maximumDate.toISOString());

          let clickHandler: React.MouseEventHandler | undefined = handleClick;
          const style = {
            cursor: 'pointer',
            padding: CELL_PADDING,
            borderRadius: 50,
          };

          if (beforeMinDate || afterMinDate) {
            className = 'text-muted';
            clickHandler = undefined;
            style.cursor = 'default';
          }

          if (Date.parse(date) === Date.parse(currentDate.toISOString())) {
            //if selected Date is not current Date
            className = 'text-primary';
          }
          if (selectedDates.length > 0) {
            rangeSelectedDates.forEach((d) => {
              if (Date.parse(date) === Date.parse(d.toISOString())) {
                className = 'bg-primary';
              }
            });
            if (
              Date.parse(date) === Date.parse(selectedDates[0]!.toISOString())
            ) {
              className = 'bg-primary';
            }
          }

          week.push(
            <td
              key={j}
              data-day={day}
              onClick={clickHandler}
              style={style}
              className={className}
            >
              {day}
            </td>
          );
          day++;
        } else {
          week.push(<td key={j} />);
        }
      }

      weeks.push(<tr key={i}>{week}</tr>);
      if (day > monthLength) {
        break;
      }
    }

    return (
      <table className="text-center" ref={ref}>
        <thead>
          <tr>
            {dayLabels.map((label: string, index: number) => {
              return (
                <td
                  key={index}
                  className="text-muted"
                  style={{ padding: CELL_PADDING }}
                >
                  <small>{label}</small>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    );
  }
);

export default Calendar;
