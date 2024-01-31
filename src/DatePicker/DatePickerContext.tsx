import * as React from 'react';

export type CalendarView = 'day' | 'month' | 'year';
export interface DatePickerContextProps {
  view: CalendarView;
  setView: React.Dispatch<React.SetStateAction<CalendarView>>;
  focusedDateIndex: number;
  setFocusedDateIndex: React.Dispatch<React.SetStateAction<number>>;
  focusedMonthIndex: number;
  setFocusedMonthIndex: React.Dispatch<React.SetStateAction<number>>;
  focusedYearIndex: number;
  setFocusedYearIndex: React.Dispatch<React.SetStateAction<number>>;
  yearPositionIndex: number; // to keep track of the position of the selected year, without this, year range position will not be consistent after selection
  setYearPositionIndex: React.Dispatch<React.SetStateAction<number>>;
}
const context = React.createContext<DatePickerContextProps>({
  view: 'day',
  setView: () => {},
  focusedDateIndex: 0,
  setFocusedDateIndex: () => {},
  focusedMonthIndex: 0,
  setFocusedMonthIndex: () => {},
  focusedYearIndex: 0,
  setFocusedYearIndex: () => {},
  yearPositionIndex: 0,
  setYearPositionIndex: () => {},
});

context.displayName = 'DatePickerContext';

export default context;
