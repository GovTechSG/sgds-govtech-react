import * as React from 'react';
import Dropdown from '../Dropdown/Dropdown';
interface CalendarHeaderProps {
  displayDate: Date;
  minDate?: string;
  maxDate?: string;
  onChange: (date: Date) => void;
  monthLabels: string[];
  previousButtonElement: string | JSX.Element;
  nextButtonElement: string | JSX.Element;
  years?: number[]
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
const YEARS = (): number[] => {
  const currentYear = new Date().getFullYear()
  const yearsArray = []
  const start = currentYear - 50
  const end = currentYear + 50 
  for(let i= start; i< end ; i++) {
    yearsArray.push(i)
  }
  return yearsArray
}
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthLabels = MONTH_LABELS,
  previousButtonElement = '<',
  nextButtonElement = '>',
  years = YEARS(),
  ...props
}) => {
  const [year, setYear] = React.useState(props.displayDate.getFullYear())
  const displayingMinMonth = () => {
    if (!props.minDate) return false;

    const displayDate = new Date(props.displayDate);
    const minimumDate = new Date(props.minDate);
    return (
      minimumDate.getFullYear() == displayDate.getFullYear() &&
      minimumDate.getMonth() == displayDate.getMonth()
    );
  };

  const displayingMaxMonth = () => {
    if (!props.maxDate) return false;
    const displayDate = new Date(props.displayDate);
    const maximumDate = new Date(props.maxDate);
    return (
      maximumDate.getFullYear() == displayDate.getFullYear() &&
      maximumDate.getMonth() == displayDate.getMonth()
    );
  };

  const handleClickPrevious = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);
    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    props.onChange(newDisplayDate);
  };

  const handleClickNext = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    props.onChange(newDisplayDate);
  };
  const handleSelectYear = (key: string | null) => {
    const newDate = props.displayDate
    newDate.setFullYear(parseInt(key!))
    props.onChange(newDate)
    setYear(parseInt(key!))
  };
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
      </span>
      <Dropdown onSelect={handleSelectYear}>
        <Dropdown.Toggle variant="white" >
          {year}
        </Dropdown.Toggle>
        <Dropdown.Menu >
          {years.map((yr: number) => (
            <Dropdown.Item
            key={yr}
            active={yr===year}
              eventKey={yr}
            >
              {yr}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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
export default CalendarHeader;
