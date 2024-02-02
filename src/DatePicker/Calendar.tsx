import * as React from 'react';
import DatePickerContext from './DatePickerContext';
import { RangeSelectionValue, getTotalDaysInMonth } from './DatePicker';

interface CalendarProps extends React.HTMLAttributes<HTMLTableElement> {
  selectedDate: Date | RangeSelectionValue | undefined;
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  changeDate: (date: Date) => void;
  mode: 'single' | 'range';
  show: boolean;
  dayRefs: React.MutableRefObject<(HTMLTableCellElement | null)[]>;
  onChangeMonth: (date: Date) => void;
  handleTabPressCalendarBody: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export const DAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
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
    const {
      focusedDateIndex,
      setFocusedDateIndex,
      focusedYearIndex,
      setYearPositionIndex,
    } = React.useContext(DatePickerContext);

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
    const getProcessedSelectedDate = ():
      | Date
      | RangeSelectionValue
      | undefined => {
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
    };

    /**
     * Checks if a given date is selected.
     * @param date The given date.
     * @param selectedDate The selected date or date range.
     * @returns true if the given date is selected, false if otherwise.
     */
    const isSelectedDate = (
      date: Date,
      selectedDate: Date | RangeSelectionValue
    ) => {
      if (selectedDate instanceof Date) {
        return (
          Date.parse(date.toISOString()) ===
          Date.parse(selectedDate.toISOString())
        );
      }

      let { start, end } = selectedDate;

      if (start && end) {
        // if selected end date is before selected start date --> swap
        if (new Date(start).getTime() > new Date(end).getTime()) {
          const temp = start;
          start = end;
          end = temp;
        }

        return (
          Date.parse(date.toISOString()) >= Date.parse(start.toISOString()) &&
          Date.parse(date.toISOString()) <= Date.parse(end.toISOString())
        );
      } else if (start) {
        return (
          Date.parse(date.toISOString()) === Date.parse(start.toISOString())
        );
      } else if (end) {
        Date.parse(date.toISOString()) === Date.parse(end.toISOString());
      } else {
        return false;
      }

      return false;
    };

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
          const dayIndex = day;
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
          if (
            Date.parse(dateString) === Date.parse(currentDate.toISOString())
          ) {
            // if date is the current Date
            className = 'text-primary';
          }
          if (beforeMinDate || afterMinDate) {
            className = 'text-muted';
            clickHandler = undefined;
            style.cursor = 'default';
          }
          if (
            processedSelectedDate &&
            isSelectedDate(date, processedSelectedDate)
          ) {
            if (processedSelectedDate instanceof Date) {
              className = 'bg-primary-600 text-white';
            } else {
              const { start, end } = processedSelectedDate;
              className = 'bg-primary-100';

              if (
                start &&
                start.getDate() === day &&
                start.getMonth() === month &&
                start.getFullYear() === year
              ) {
                className = 'bg-primary-600 text-white';
              }

              if (
                end &&
                end.getDate() === day &&
                end.getMonth() === month &&
                end.getFullYear() === year
              ) {
                className = 'bg-primary-600 text-white';
              }
            }
          }

          week.push(
            <td
              key={j}
              data-day={day}
              onClick={clickHandler}
              style={style}
              className={className}
              tabIndex={-1}
              ref={(el) => (props.dayRefs.current[dayIndex] = el)}
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      const handleDateIncrement = (incrementedDay: number) => {
        const totalDaysInMonth = getTotalDaysInMonth(props.displayDate);
        setFocusedDateIndex((prevState) => {
          // switch calendar view to next month
          if (prevState + incrementedDay > totalDaysInMonth) {
            const newDisplayDate = new Date(props.displayDate);
            newDisplayDate.setDate(1);
            newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
            props.onChangeMonth(newDisplayDate);
          }

          // get next month date
          const focusedDate = new Date(
            props.displayDate.getFullYear(),
            props.displayDate.getMonth(),
            prevState
          );
          focusedDate.setDate(focusedDate.getDate() + incrementedDay);
          return focusedDate.getDate();
        });
      };

      const handleDateDecrement = (decrementedDay: number) => {
        setFocusedDateIndex((prevState) => {
          // switch calendar view to previous month
          if (prevState - decrementedDay <= 0) {
            const newDisplayDate = new Date(props.displayDate);
            newDisplayDate.setDate(1);
            newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
            props.onChangeMonth(newDisplayDate);
          }

          // get previous month date
          const focusedDate = new Date(
            props.displayDate.getFullYear(),
            props.displayDate.getMonth(),
            prevState
          );
          focusedDate.setDate(focusedDate.getDate() - decrementedDay);
          return focusedDate.getDate();
        });
      };

      switch (event.key) {
        case 'ArrowUp':
          handleDateDecrement(7); // minus 7 days
          break;
        case 'ArrowDown':
          handleDateIncrement(7); // add 7 days
          break;
        case 'ArrowLeft':
          handleDateDecrement(1); // minus 1 day
          break;
        case 'ArrowRight':
          handleDateIncrement(1); // add 1 day
          break;
        case 'Tab':
          props.handleTabPressCalendarBody(event);
          break;
        case 'Enter':
        case ' ':
          const day = focusedDateIndex.toString();
          const displayDateClone = new Date(props.displayDate);
          const newSelectedDate = setTimeToNoon(displayDateClone);
          newSelectedDate.setDate(parseInt(day));
          props.changeDate(newSelectedDate); // update the new selected date
          setYearPositionIndex(focusedYearIndex);
          break;
        default:
          break;
      }
    };

    React.useEffect(() => {
      if (props.show) {
        const focusedElement = props.dayRefs.current[focusedDateIndex];

        if (focusedElement) {
          focusedElement.focus();
          focusedElement.tabIndex = 0;

          // Remove tabIndex from other elements
          props.dayRefs.current.forEach((el, index) => {
            if (el && index !== focusedDateIndex) {
              el.tabIndex = -1;
            }
          });
        }
      }
    }, [props.show, focusedDateIndex]);

    return (
      <table
        className="text-center"
        role="grid"
        ref={ref}
        aria-labelledby="id-grid-label"
        onKeyDown={handleKeyDown} // Attach the keydown event listener to the table
      >
        <thead>
          <tr>
            {DAY_LABELS.map((label: string, index: number) => {
              return (
                <th key={index} abbr={label} scope="col">
                  <small>{label.slice(0, 3)}</small>
                </th>
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
