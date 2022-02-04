import * as React from 'react';

interface CalendarHeaderProps {
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  onChange: (date: Date) => void;
  monthLabels: string[];
  previousButtonElement: string | JSX.Element;
  nextButtonElement: string | JSX.Element;
}
const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthLabels = MONTH_LABELS,
  previousButtonElement = '<',
  nextButtonElement = '>',
  ...props
}) => {

  const displayingMinMonth = () =>{
    if (!props.minDate) return false;

    const displayDate = new Date(props.displayDate);
    const minDate = new Date(props.minDate);
    return (
      minDate.getFullYear() == displayDate.getFullYear() &&
      minDate.getMonth() == displayDate.getMonth()
    );
  }

  const displayingMaxMonth = () => {
    if (!props.maxDate) return false;

    const displayDate = new Date(props.displayDate);
    const maxDate = new Date(props.maxDate);
    return (
      maxDate.getFullYear() == displayDate.getFullYear() &&
      maxDate.getMonth() == displayDate.getMonth()
    );
  }

  const handleClickPrevious = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    props.onChange(newDisplayDate);
  }

  const handleClickNext = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    props.onChange(newDisplayDate);
  }
  return (
    <div className="text-center">
      <div
        className="text-muted pull-left datepicker-previous-wrapper"
        onClick={handleClickPrevious}
        style={{ cursor: 'pointer' }}
      >
        {displayingMinMonth() ? null : previousButtonElement}
      </div>
      <span>
        {monthLabels[props.displayDate.getMonth()]}{' '}
        {props.displayDate.getFullYear()}
      </span>
      <div
        className="text-muted pull-right datepicker-next-wrapper"
        onClick={handleClickNext}
        style={{ cursor: 'pointer' }}
      >
        {displayingMaxMonth() ? null : nextButtonElement}
      </div>
    </div>
  );
};
export default CalendarHeader