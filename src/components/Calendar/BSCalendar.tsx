import * as React from 'react';
import Button from '../Button/Button';
interface CalendarProps {
  selectedDate: Date ;
  displayDate: Date ;
  minDate?: string;
  maxDate?: string;
  onChange: (date: Date) => void;
  dayLabels?: string[];
  cellPadding: string;
  weekStartsOn: number;
  showTodayButton: boolean;
  todayButtonLabel: string;
  roundedCorners: boolean;
  showWeeks: boolean;
}
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const defaultProps = {
  dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  cellPadding: '5px',
};
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const setTimeToNoon = (date: Date) => {
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
const getWeekNumber = (date: Date) => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};

export const Calendar: React.FC<CalendarProps> = ({
  dayLabels = DAY_LABELS,
  cellPadding = '5px',
  showWeeks = false,
  todayButtonLabel = 'Today',
  roundedCorners = false,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    // assuming day is never null
    const day = e.currentTarget.getAttribute('data-day')!;
    const newSelectedDate = setTimeToNoon(props.displayDate!);
    newSelectedDate.setDate(parseInt(day));
    props.onChange(newSelectedDate);
  };
  const handleClickToday = () => {
    const newSelectedDate = setTimeToNoon(new Date());
    props.onChange(newSelectedDate);
  };

  const currentDate = setTimeToNoon(new Date());
  const selectedDate = setTimeToNoon(props.selectedDate);
  const minDate = props.minDate ? setTimeToNoon(new Date(props.minDate)) : null;
  const maxDate = props.maxDate ? setTimeToNoon(new Date(props.maxDate)) : null;
  const year = props.displayDate.getFullYear();
  const month = props.displayDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startingDay =
    props.weekStartsOn > 1
      ? firstDay.getDay() - props.weekStartsOn + 7
      : props.weekStartsOn === 1
      ? firstDay.getDay() === 0
        ? 6
        : firstDay.getDay() - 1
      : firstDay.getDay();
  // const showWeeks = props.showWeeks;

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
          minDate && Date.parse(date) < Date.parse(minDate.toISOString());
        const afterMinDate =
          maxDate && Date.parse(date) > Date.parse(maxDate.toISOString());

        let clickHandler = handleClick;
        const style = {
          cursor: 'pointer',
          padding: cellPadding,
          borderRadius: roundedCorners ? 5 : 0,
        };

        if (beforeMinDate || afterMinDate) {
          className = 'text-muted';
          // can disable the button instead
          //   clickHandler = null;
          style.cursor = 'default';
        } else if (
          Date.parse(date) === Date.parse(selectedDate!.toISOString())
        ) {
          className = 'bg-primary';
        } else if (Date.parse(date) === Date.parse(currentDate.toISOString())) {
          className = 'text-primary';
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

    if (showWeeks) {
      const weekNum = getWeekNumber(
        new Date(year, month, day - 1, 12, 0, 0, 0)
      );
      week.unshift(
        <td
          key={7}
          style={{
            padding: cellPadding,
            fontSize: '0.8em',
            color: 'darkgrey',
          }}
          className="text-muted"
        >
          {weekNum}
        </td>
      );
    }

    weeks.push(<tr key={i}>{week}</tr>);
    if (day > monthLength) {
      break;
    }
  }

  const weekColumn = showWeeks ? (
    <td className="text-muted current-week" style={{ padding: cellPadding }} />
  ) : null;
  return (
    <table className="text-center">
      <thead>
        <tr>
          {weekColumn}
          {dayLabels.map((label: string, index: number) => {
            return (
              <td
                key={index}
                className="text-muted"
                style={{ padding: cellPadding }}
              >
                <small>{label}</small>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>{weeks}</tbody>
      {props.showTodayButton && (
        <tfoot>
          <tr>
            <td colSpan={dayLabels.length} style={{ paddingTop: '9px' }}>
              <Button
                //   block
                size="sm"
                className="u-today-button"
                onClick={handleClickToday}
              >
                {todayButtonLabel}
              </Button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default Calendar;
// const Calendar = createReactClass({
//   displayName: 'DatePickerCalendar',

//   propTypes: {
//     selectedDate: PropTypes.object,
//     displayDate: PropTypes.object.isRequired,
//     minDate: PropTypes.string,
//     maxDate: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     dayLabels: PropTypes.array.isRequired,
//     cellPadding: PropTypes.string.isRequired,
//     weekStartsOn: PropTypes.number,
//     showTodayButton: PropTypes.bool,
//     todayButtonLabel: PropTypes.string,
//     roundedCorners: PropTypes.bool,
//     showWeeks: PropTypes.bool,
//   },

//   handleClick(e: React.MouseEvent<HTMLTableCellElement>) {
//     const day = e.currentTarget.getAttribute('data-day');
//     const newSelectedDate = this.setTimeToNoon(
//       new Date(this.props.displayDate)
//     );
//     newSelectedDate.setDate(day);
//     this.props.onChange(newSelectedDate);
//   },

//   handleClickToday() {
//     const newSelectedDate = this.setTimeToNoon(new Date());
//     this.props.onChange(newSelectedDate);
//   },

//   setTimeToNoon(date: Date) {
//     date.setHours(12);
//     date.setMinutes(0);
//     date.setSeconds(0);
//     date.setMilliseconds(0);
//     return date;
//   },

//   getWeekNumber(date: Date) {
//     const target = new Date(date.valueOf());
//     const dayNr = (date.getDay() + 6) % 7;
//     target.setDate(target.getDate() - dayNr + 3);
//     const firstThursday = target.valueOf();
//     target.setMonth(0, 1);
//     if (target.getDay() !== 4) {
//       target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
//     }
//     return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
//   },

//   render() {
//     const currentDate = this.setTimeToNoon(new Date());
//     const selectedDate = this.props.selectedDate
//       ? this.setTimeToNoon(new Date(this.props.selectedDate))
//       : null;
//     const minDate = this.props.minDate
//       ? this.setTimeToNoon(new Date(this.props.minDate))
//       : null;
//     const maxDate = this.props.maxDate
//       ? this.setTimeToNoon(new Date(this.props.maxDate))
//       : null;
//     const year = this.props.displayDate.getFullYear();
//     const month = this.props.displayDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const startingDay =
//       this.props.weekStartsOn > 1
//         ? firstDay.getDay() - this.props.weekStartsOn + 7
//         : this.props.weekStartsOn === 1
//         ? firstDay.getDay() === 0
//           ? 6
//           : firstDay.getDay() - 1
//         : firstDay.getDay();
//     const showWeeks = this.props.showWeeks;

//     let monthLength = daysInMonth[month];
//     if (month == 1) {
//       if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
//         monthLength = 29;
//       }
//     }

//     const weeks = [];
//     let day = 1;
//     for (let i = 0; i < 9; i++) {
//       const week = [];
//       for (let j = 0; j <= 6; j++) {
//         if (day <= monthLength && (i > 0 || j >= startingDay)) {
//           let className = undefined;
//           const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
//           const beforeMinDate =
//             minDate && Date.parse(date) < Date.parse(minDate);
//           const afterMinDate =
//             maxDate && Date.parse(date) > Date.parse(maxDate);
//           let clickHandler = this.handleClick;
//           const style = {
//             cursor: 'pointer',
//             padding: this.props.cellPadding,
//             borderRadius: this.props.roundedCorners ? 5 : 0,
//           };

//           if (beforeMinDate || afterMinDate) {
//             className = 'text-muted';
//             clickHandler = null;
//             style.cursor = 'default';
//           } else if (Date.parse(date) === Date.parse(selectedDate)) {
//             className = 'bg-primary';
//           } else if (Date.parse(date) === Date.parse(currentDate)) {
//             className = 'text-primary';
//           }

//           week.push(
//             <td
//               key={j}
//               data-day={day}
//               onClick={clickHandler}
//               style={style}
//               className={className}
//             >
//               {day}
//             </td>
//           );
//           day++;
//         } else {
//           week.push(<td key={j} />);
//         }
//       }

//       if (showWeeks) {
//         const weekNum = this.getWeekNumber(
//           new Date(year, month, day - 1, 12, 0, 0, 0)
//         );
//         week.unshift(
//           <td
//             key={7}
//             style={{
//               padding: this.props.cellPadding,
//               fontSize: '0.8em',
//               color: 'darkgrey',
//             }}
//             className="text-muted"
//           >
//             {weekNum}
//           </td>
//         );
//       }

//       weeks.push(<tr key={i}>{week}</tr>);
//       if (day > monthLength) {
//         break;
//       }
//     }

//     const weekColumn = showWeeks ? (
//       <td
//         className="text-muted current-week"
//         style={{ padding: this.props.cellPadding }}
//       />
//     ) : null;

//     return (
//       <table className="text-center">
//         <thead>
//           <tr>
//             {weekColumn}
//             {this.props.dayLabels.map((label: string, index: number) => {
//               return (
//                 <td
//                   key={index}
//                   className="text-muted"
//                   style={{ padding: this.props.cellPadding }}
//                 >
//                   <small>{label}</small>
//                 </td>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody>{weeks}</tbody>
//         {this.props.showTodayButton && (
//           <tfoot>
//             <tr>
//               <td
//                 colSpan={this.props.dayLabels.length}
//                 style={{ paddingTop: '9px' }}
//               >
//                 <Button
//                   //   block
//                   size="sm"
//                   className="u-today-button"
//                   onClick={this.handleClickToday}
//                 >
//                   {this.props.todayButtonLabel}
//                 </Button>
//               </td>
//             </tr>
//           </tfoot>
//         )}
//       </table>
//     );
//   },
// });
