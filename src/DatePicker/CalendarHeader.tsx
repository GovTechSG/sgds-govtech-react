import * as React from 'react';
import DatePickerContext from './DatePickerContext';
import { calculateYearRange } from './YearView';

interface CalendarHeaderProps{
  displayDate: Date;
  onChange: (date: Date) => void;
  resetFocusOnHeader: () => void;
  handleTabPressOnPreviousButton: (
    event: React.KeyboardEvent<HTMLElement>
  ) => void;
  handleTabPressOnHeaderTitle: (
    event: React.KeyboardEvent<HTMLElement>
  ) => void;
  handleTabPressOnNextButton: (event: React.KeyboardEvent<HTMLElement>) => void;
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
        if (newDisplayDate.getFullYear() === 1900) {
          props.resetFocusOnHeader();
        }
        return props.onChange(newDisplayDate);
      } else if (view === 'year') {
        newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 12);
        if (newDisplayDate.getFullYear() <= 1900) {
          props.resetFocusOnHeader();
        }
        return props.onChange(newDisplayDate);
      } else {
        newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
        if (
          newDisplayDate.getMonth() === 0 &&
          newDisplayDate.getFullYear() === 1900
        ) {
          props.resetFocusOnHeader();
        }
        return props.onChange(newDisplayDate);
      }
    };

    const handlePressPrevious = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      switch (event.key) {
        case 'Tab':
          props.handleTabPressOnPreviousButton(event);
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
          props.handleTabPressOnNextButton(event);
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
          props.handleTabPressOnHeaderTitle(event);
          break;
        case 'Enter':
        case ' ':
          changeView();
          break;
        default:
          break;
      }
    };

    const renderPreviousButton = () => {
      const ariaLabels = {
        day: "Show previous month", 
        month: "Show previous year",
        year: "Show previous 12 years"
      }
      const previousButton = (
        <button
          type="button"
          onClick={handleClickPrevious}
          onKeyDown={handlePressPrevious}
          aria-label={ariaLabels[view]}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      );

      const startLimitDate = new Date('1900-01-01');
      switch (view) {
        case 'day':
          if (
            props.displayDate.getDate() === startLimitDate.getDate() &&
            props.displayDate.getMonth() === startLimitDate.getMonth() &&
            props.displayDate.getFullYear() === startLimitDate.getFullYear()
          ) {
            return <div style={{ width: 32 }}></div>;
          }

          return previousButton;
        case 'month':
          if (
            props.displayDate.getFullYear() === startLimitDate.getFullYear()
          ) {
            return <div style={{ width: 32 }}></div>;
          }

          return previousButton;
        case 'year':
          if (props.displayDate.getFullYear() <= startLimitDate.getFullYear()) {
            return <div style={{ width: 32 }}></div>;
          }

          return previousButton;
        default:
          return previousButton;
      }
    };
    const renderNextButton = () => {
      const ariaLabels = {
        day: "Show next month", 
        month: "Show next year",
        year: "Show next 12 years"
      }
      return (
        <button
        type="button"
        onClick={handleClickNext}
        onKeyDown={handlePressNext}
        aria-label={ariaLabels[view]}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
      )
    }
    const renderHeader = () => {
      let header: string = ""
      let ariaLabel: string = ""
      const [displayMonth, displayYear] = [props.displayDate.getMonth(),props.displayDate.getFullYear() ]
      const { startLimit, endLimit } = calculateYearRange(props.displayDate);
      if (view === 'day'){
        header = `${
          MONTH_LABELS[displayMonth]
        } ${displayYear}`
      }
      if (view === 'month') {
        header = `${displayYear}`;
      }
      if (view === 'year') {
        header = `${startLimit} - ${endLimit}`;
      }

      return (
        <button
        type="button"
        onClick={changeView}
        onKeyDown={handlePressChangeView}
        aria-disabled={view === 'year'}
        className={view === 'year' ? "disabled" : undefined}
        aria-live="polite"
        aria-label={ariaLabel}
      >
        {header}
      </button>
      )
    };

    return (
      <div className="text-center d-flex justify-content-between" ref={ref}>
        {renderPreviousButton()}
      {renderHeader()}
        {renderNextButton()}
      </div>
    );
  }
);
export default CalendarHeader;
