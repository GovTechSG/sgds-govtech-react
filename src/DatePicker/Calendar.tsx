import * as React from 'react';
import { RangeSelectionValue } from './DatePicker';
interface CalendarProps extends React.HTMLAttributes<HTMLTableElement> {
  selectedDate: Date | RangeSelectionValue | undefined;
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  changeDate: (date: Date) => void;
  mode: 'single' | 'range';
}

export const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const setTimeToNoon = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(12);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const Calendar = React.forwardRef<HTMLTableElement, CalendarProps>(
  (props, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      const day = e.currentTarget.getAttribute('data-day')!;
      const displayDateClone = new Date(props.displayDate);
      const newSelectedDate = setTimeToNoon(displayDateClone);
      newSelectedDate.setDate(parseInt(day));
      props.changeDate(newSelectedDate);
    };

    /**
     * Change the time of all dates in selectedDate to noon.
     * @returns The processed selectedDate.
     */
    const getProcessedSelectedDate = (): Date | RangeSelectionValue | undefined => {
      if (props.selectedDate instanceof Date) {
        return setTimeToNoon(props.selectedDate);
      } else if (props.selectedDate) {
        // selectedDate is of type RangeSelectionValue
        const { start, end } = props.selectedDate as RangeSelectionValue;
        const processedStart = start ? setTimeToNoon(start) : undefined;
        const processedEnd = end ? setTimeToNoon(end) : undefined;
        return { start: processedStart, end: processedEnd };
      } else {
        return undefined;
      }
    }

    /**
     * Checks if a given date is selected.
     * @param date The given date.
     * @param selectedDate The selected date or date range.
     * @returns true if the given date is selected, false if otherwise.
     */
    const isSelectedDate = (date: Date, selectedDate: Date | RangeSelectionValue) => {
      if (selectedDate instanceof Date) {
        return Date.parse(date.toISOString()) === Date.parse(selectedDate.toISOString());
      }

      let { start, end } = selectedDate;

      if (start && end) {
        // if selected end date is before selected start date --> swap
        if (new Date(start).getTime() > new Date(end).getTime()) {
          const temp = start;
          start = end;
          end = temp;
        }

        return Date.parse(date.toISOString()) >= Date.parse(start.toISOString()) 
          && Date.parse(date.toISOString()) <= Date.parse(end.toISOString());
      } else if (start) {
        return Date.parse(date.toISOString()) === Date.parse(start.toISOString());
      } else if (end) {
        Date.parse(date.toISOString()) === Date.parse(end.toISOString());
      } else {
        return false;
      }
      
      return false;
    }

    const currentDate = setTimeToNoon(new Date());
    const processedSelectedDate = getProcessedSelectedDate();
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
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
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
          const date = new Date(year, month, day, 12, 0, 0, 0);
          const dateString = date.toISOString();
          const beforeMinDate =
            minimumDate &&
            Date.parse(dateString) < Date.parse(minimumDate.toISOString());
          const afterMinDate =
            maximumDate &&
            Date.parse(dateString) > Date.parse(maximumDate.toISOString());

          let clickHandler: React.MouseEventHandler | undefined = handleClick;
          const style = {
            cursor: 'pointer',
            borderRadius: 0,
          };
          if (Date.parse(dateString) === Date.parse(currentDate.toISOString())) {
            // if date is the current Date
            className = 'text-primary';
          }
          if (beforeMinDate || afterMinDate) {
            className = 'text-muted';
            clickHandler = undefined;
            style.cursor = 'default';
          }
          if (processedSelectedDate && isSelectedDate(date, processedSelectedDate)) {
            className = 'bg-primary-100';
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
            {DAY_LABELS.map((label: string, index: number) => {
              return (
                <td
                  key={index}
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
