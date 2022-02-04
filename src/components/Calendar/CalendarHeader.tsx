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
    const minimumDate = new Date(props.minDate);
    return (
      minimumDate.getFullYear() == displayDate.getFullYear() &&
      minimumDate.getMonth() == displayDate.getMonth()
    );
  }

  const displayingMaxMonth = () => {
    if (!props.maxDate) return false;
    const displayDate = new Date(props.displayDate);
    const maximumDate = new Date(props.maxDate);
    console.log(maximumDate)
    return (
      maximumDate.getFullYear() == displayDate.getFullYear() &&
      maximumDate.getMonth() == displayDate.getMonth()
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
    <div className="text-center d-flex justify-content-around">
      <div
        className="text-muted pull-left"
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
        className="text-muted pull-right"
        onClick={handleClickNext}
        style={{ cursor: 'pointer' }}
      >
        {displayingMaxMonth() ? null : nextButtonElement}
      </div>
    </div>
  );
};
export default CalendarHeader