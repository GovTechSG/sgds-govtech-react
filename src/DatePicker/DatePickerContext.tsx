import * as React from 'react';

export type CalendarView = 'day' | 'month' | 'year'
export interface DatePickerContextProps {
    view: CalendarView
    setView: React.Dispatch<React.SetStateAction<CalendarView>>
  }
  const context = React.createContext<DatePickerContextProps>({
      view: 'day',
      setView: () => {}
  });

  context.displayName = 'DatePickerContext'

  export default context;
