import * as React from 'react';
import Button from '../Button/Button';
interface CalendarProps extends React.HTMLAttributes<HTMLTableElement> {
  selectedDate: Date;
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  changeDate: (date: Date) => void;
  dayLabels?: string[];
  cellPadding: string;
  weekStartsOn: number;
  showTodayButton: boolean;
  todayButtonLabel: string;
  roundedCorners: boolean;
  showWeeks: boolean;
}
const MAX_DATE = '2021-05-19T12:00:00.000Z';
const MIN_DATE = '2020-05-19T12:00:00.000Z';
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const defaultProps = {
  dayLabels : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
export const Calendar = React.forwardRef<HTMLTableElement, CalendarProps>(
  (
    {
      dayLabels = DAY_LABELS,
      cellPadding = '5px',
      showWeeks = false,
      todayButtonLabel = 'Today',
      roundedCorners = false,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      const day = e.currentTarget.getAttribute('data-day')!;
      const newSelectedDate = setTimeToNoon(props.displayDate!);
      newSelectedDate.setDate(parseInt(day));
      props.changeDate(newSelectedDate);
    };
    const handleClickToday = () => {
      const newSelectedDate = setTimeToNoon(new Date());
      props.changeDate(newSelectedDate);
    };
  
    const currentDate = setTimeToNoon(new Date());
    const selectedDate = setTimeToNoon(props.selectedDate);
    const minimumDate = props.minDate
      ? setTimeToNoon(new Date(props.minDate))
      : null;
    const maximumDate = props.maxDate
      ? setTimeToNoon(new Date(props.maxDate))
      : null;
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
            padding: cellPadding,
            borderRadius: roundedCorners ? 5 : 0,
          };
  
          if (beforeMinDate || afterMinDate) {
            className = 'text-muted';
            clickHandler = undefined;
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
      <table className="text-center" ref={ref} >
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
  }
);
// export const Calendar: React.FC<CalendarProps> = ({
//   dayLabels = DAY_LABELS,
//   cellPadding = '5px',
//   showWeeks = false,
//   todayButtonLabel = 'Today',
//   roundedCorners = false,
//   ...props
// }) => {
//   const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
//     const day = e.currentTarget.getAttribute('data-day')!;
//     const newSelectedDate = setTimeToNoon(props.displayDate!);
//     newSelectedDate.setDate(parseInt(day));
//     props.changeDate(newSelectedDate);
//   };
//   const handleClickToday = () => {
//     const newSelectedDate = setTimeToNoon(new Date());
//     props.changeDate(newSelectedDate);
//   };

//   const currentDate = setTimeToNoon(new Date());
//   const selectedDate = setTimeToNoon(props.selectedDate);
//   const minimumDate = props.minDate
//     ? setTimeToNoon(new Date(props.minDate))
//     : null;
//   const maximumDate = props.maxDate
//     ? setTimeToNoon(new Date(props.maxDate))
//     : null;
//   const year = props.displayDate.getFullYear();
//   const month = props.displayDate.getMonth();
//   const firstDay = new Date(year, month, 1);
//   const startingDay =
//     props.weekStartsOn > 1
//       ? firstDay.getDay() - props.weekStartsOn + 7
//       : props.weekStartsOn === 1
//       ? firstDay.getDay() === 0
//         ? 6
//         : firstDay.getDay() - 1
//       : firstDay.getDay();

//   let monthLength = daysInMonth[month];
//   if (month == 1) {
//     if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
//       monthLength = 29;
//     }
//   }

//   const weeks = [];
//   let day = 1;
//   for (let i = 0; i < 9; i++) {
//     const week = [];
//     for (let j = 0; j <= 6; j++) {
//       if (day <= monthLength && (i > 0 || j >= startingDay)) {
//         let className = undefined;
//         const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
//         const beforeMinDate =
//           minimumDate &&
//           Date.parse(date) < Date.parse(minimumDate.toISOString());
//         const afterMinDate =
//           maximumDate &&
//           Date.parse(date) > Date.parse(maximumDate.toISOString());

//         let clickHandler: React.MouseEventHandler | undefined = handleClick;
//         const style = {
//           cursor: 'pointer',
//           padding: cellPadding,
//           borderRadius: roundedCorners ? 5 : 0,
//         };

//         if (beforeMinDate || afterMinDate) {
//           className = 'text-muted';
//           clickHandler = undefined;
//           style.cursor = 'default';
//         } else if (
//           Date.parse(date) === Date.parse(selectedDate!.toISOString())
//         ) {
//           className = 'bg-primary';
//         } else if (Date.parse(date) === Date.parse(currentDate.toISOString())) {
//           className = 'text-primary';
//         }

//         week.push(
//           <td
//             key={j}
//             data-day={day}
//             onClick={clickHandler}
//             style={style}
//             className={className}
//           >
//             {day}
//           </td>
//         );
//         day++;
//       } else {
//         week.push(<td key={j} />);
//       }
//     }

//     if (showWeeks) {
//       const weekNum = getWeekNumber(
//         new Date(year, month, day - 1, 12, 0, 0, 0)
//       );
//       week.unshift(
//         <td
//           key={7}
//           style={{
//             padding: cellPadding,
//             fontSize: '0.8em',
//             color: 'darkgrey',
//           }}
//           className="text-muted"
//         >
//           {weekNum}
//         </td>
//       );
//     }

//     weeks.push(<tr key={i}>{week}</tr>);
//     if (day > monthLength) {
//       break;
//     }
//   }

//   const weekColumn = showWeeks ? (
//     <td className="text-muted current-week" style={{ padding: cellPadding }} />
//   ) : null;
//   return (
//     <table className="text-center">
//       <thead>
//         <tr>
//           {weekColumn}
//           {dayLabels.map((label: string, index: number) => {
//             return (
//               <td
//                 key={index}
//                 className="text-muted"
//                 style={{ padding: cellPadding }}
//               >
//                 <small>{label}</small>
//               </td>
//             );
//           })}
//         </tr>
//       </thead>
//       <tbody>{weeks}</tbody>
//       {props.showTodayButton && (
//         <tfoot>
//           <tr>
//             <td colSpan={dayLabels.length} style={{ paddingTop: '9px' }}>
//               <Button
//                 //   block
//                 size="sm"
//                 className="u-today-button"
//                 onClick={handleClickToday}
//               >
//                 {todayButtonLabel}
//               </Button>
//             </td>
//           </tr>
//         </tfoot>
//       )}
//     </table>
//   );
// };

export default Calendar;
