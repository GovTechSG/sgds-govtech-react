import * as React from 'react';
import DatePickerContext from './DatePickerContext';
import { calculateYearRange } from './YearView';

interface CalendarHeaderProps {
  displayDate: Date;
  onChange: (date: Date) => void;
  handleTabPressPreviousButton: (
    event: React.KeyboardEvent<HTMLElement>
  ) => void;
  handleTabPressHeaderTitle: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleTabPressNextButton: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export const MONTH_LABELS = [
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

const CalendarHeader = React.forwardRef<HTMLDivElement, CalendarHeaderProps>(
  (props, ref) => {
    const { view, setView } = React.useContext(DatePickerContext);

    const handleClickPrevious = () => {
      const newDisplayDate = new Date(props.displayDate);
      newDisplayDate.setDate(1);
      if (view === 'month') {
        newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
        return props.onChange(newDisplayDate);
      } else if (view === 'year') {
        newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 12);
        return props.onChange(newDisplayDate);
      } else {
        newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
        return props.onChange(newDisplayDate);
      }
    };

    const handlePressPrevious = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      switch (event.key) {
        case 'Tab':
          props.handleTabPressPreviousButton(event);
          break;
        case 'Enter':
        case ' ':
          handleClickPrevious();
          break;
        default:
          break;
      }
    };

    const handleClickNext = () => {
      const newDisplayDate = new Date(props.displayDate);
      newDisplayDate.setDate(1);

      if (view === 'month') {
        newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
        return props.onChange(newDisplayDate);
      } else if (view === 'year') {
        newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 12);
        return props.onChange(newDisplayDate);
      } else {
        newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
        return props.onChange(newDisplayDate);
      }
    };

    const handlePressNext = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      switch (event.key) {
        case 'Tab':
          props.handleTabPressNextButton(event);
          break;
        case 'Enter':
        case ' ':
          handleClickNext();
          break;
        default:
          break;
      }
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
        default:
          break;
      }
    };

    const handlePressChangeView = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      switch (event.key) {
        case 'Tab':
          props.handleTabPressHeaderTitle(event);
          break;
        case 'Enter':
        case ' ':
          changeView();
          break;
        default:
          break;
      }
    };

    const renderHeader = () => {
      if (view === 'month') {
        return `${props.displayDate.getFullYear()}`;
      }
      if (view === 'year') {
        const { startLimit, endLimit } = calculateYearRange(props.displayDate);
        return `${startLimit} - ${endLimit}`;
      }

      return `${
        MONTH_LABELS[props.displayDate.getMonth()]
      } ${props.displayDate.getFullYear()}`;
    };

    return (
      <div className="text-center d-flex justify-content-between" ref={ref}>
        <button
          onClick={handleClickPrevious}
          onKeyDown={handlePressPrevious}
          aria-label={`previous ${view}`}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <button
          id="id-grid-label"
          onClick={changeView}
          onKeyDown={handlePressChangeView}
          // disabled={view === 'year'}
          aria-live="polite"
        >
          {renderHeader()}
        </button>

        <button
          onClick={handleClickNext}
          onKeyDown={handlePressNext}
          aria-label={`next ${view}`}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    );
  }
);
export default CalendarHeader;
