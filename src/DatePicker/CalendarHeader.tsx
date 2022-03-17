import * as React from 'react';
import { useContext } from 'react';
import DatePickerContext from './DatePickerContext';
interface CalendarHeaderProps {
  displayDate: Date;
  onChange: (date: Date) => void;
  monthLabels: string[];
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
  ...props
}) => {
  const { view, setView } = useContext(DatePickerContext);

  const handleClickPrevious = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);
    if (view === 'month') {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
      props.onChange(newDisplayDate);
    }

    if (view === 'year') {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 10);
      props.onChange(newDisplayDate);
    }

    newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    props.onChange(newDisplayDate);
  };

  const handleClickNext = () => {
    const newDisplayDate = new Date(props.displayDate);
    newDisplayDate.setDate(1);

    if (view === 'month') {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
      props.onChange(newDisplayDate);
    }

    if (view === 'year') {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 10);
      props.onChange(newDisplayDate);
    }

    newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    props.onChange(newDisplayDate);
  };

  const changeView = () => {
    switch (view) {
      case 'day':
        setView('month');
        break;
      case 'month':
        setView('year');
        break;
      case 'year':
        break;
    }
  };
  const renderHeader = () => {
    if (view === 'month') return `${props.displayDate.getFullYear()}`;
    if (view === 'year')
      return `${props.displayDate.getFullYear() - 5} - ${
        props.displayDate.getFullYear() + 6
      }`;
    return `${
      monthLabels[props.displayDate.getMonth()]
    } ${props.displayDate.getFullYear()}`;
  };
  return (
    <div className="text-center d-flex justify-content-around">
      <div
        className="text-muted pull-left"
        onClick={handleClickPrevious}
        style={{ cursor: 'pointer' }}
      >
        <i className="bi bi-chevron-left"></i>
      </div>
      <button onClick={changeView} disabled={view === 'year'}>
        {renderHeader()}
      </button>
      <div
        className="text-muted pull-right"
        onClick={handleClickNext}
        style={{ cursor: 'pointer' }}
      >
        <i className="bi bi-chevron-right"></i>
      </div>
    </div>
  );
};
export default CalendarHeader;
