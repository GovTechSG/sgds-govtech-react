import * as React from 'react';
import ReactCalendar, {CalendarProps as ReactCalendarProps} from 'react-calendar';

export interface CalendarProps extends ReactCalendarProps {}

export const Calendar = (props: CalendarProps) => (
     <ReactCalendar {...props}/>
)

export default Calendar