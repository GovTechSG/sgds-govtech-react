import * as React from 'react';
import classNames from 'classnames';
import { RangeSelectionValue } from './DatePicker';
import DatePickerContext from './DatePickerContext';

export interface YearViewProps extends React.HTMLAttributes<HTMLElement> {
  selectedDate: Date | RangeSelectionValue | undefined;
  displayDate: Date;
  onClickYear: Function;
  show: boolean;
  yearRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  onChangeMonth: (date: Date) => void;
  handleTabPressCalendarBody: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export const findIndexByYear = (
  year: string,
  yearRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
) => {
  for (let i = 0; i < yearRefs.current.length; i++) {
    if (yearRefs.current[i]?.innerText === year) {
      return i;
    }
  }
  return -1; // Return -1 if not found
};

const CURRENT_YEAR = new Date().getFullYear();

export const calculateYearRange = (displayDate: Date) => {
  // keeping the year range position to be always fixed by setting current year to the first element of the calendar
  const displayYear = displayDate.getFullYear();
  const remainder = (displayYear - CURRENT_YEAR) % 12;
  const yearsPosition = remainder < 0 ? 12 + remainder : remainder;
  const startLimit = displayYear - yearsPosition;
  const endLimit = displayYear - yearsPosition + 12 - 1; // -1 to match the index of the years (index starts from 0)

  return { startLimit, endLimit };
};

export const YearView = React.forwardRef<HTMLDivElement, YearViewProps>(
  (
    {
      selectedDate,
      displayDate,
      onClickYear,
      show,
      yearRefs,
      onChangeMonth,
      handleTabPressCalendarBody,
      ...props
    },
    ref
  ) => {
    const { focusedYearIndex, setFocusedYearIndex } =
      React.useContext(DatePickerContext);
    const { startLimit, endLimit } = calculateYearRange(displayDate);
    const yearArray: number[] = [];
    for (let i = startLimit; i < endLimit + 1; i++) {
      yearArray.push(i);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      event.preventDefault();

      const handleYearIncrement = (incrementedYear: number) => {
        const totalYearIndex = 11; // total 12 years in the calendar body and index starts from 0;
        setFocusedYearIndex((prevState) => {
          // switch calendar view to next year range
          if (prevState + incrementedYear > totalYearIndex) {
            const newDisplayDate = new Date(displayDate);
            newDisplayDate.setDate(1);
            newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 12);
            onChangeMonth(newDisplayDate);
            return prevState + incrementedYear - 12;
          }

          return prevState + incrementedYear;
        });
      };

      const handleYearDecrement = (decrementedYear: number) => {
        setFocusedYearIndex((prevState) => {
          // switch calendar view to previous year range
          if (prevState - decrementedYear < 0) {
            const newDisplayDate = new Date(displayDate);
            newDisplayDate.setDate(1);
            newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 12);
            onChangeMonth(newDisplayDate);
            return prevState - decrementedYear + 12;
          }

          return prevState - decrementedYear;
        });
      };

      switch (event.key) {
        case 'ArrowUp':
          handleYearDecrement(3); // minus 3 years
          break;
        case 'ArrowDown':
          handleYearIncrement(3); // add 3 years
          break;
        case 'ArrowLeft':
          handleYearDecrement(1); // minus 1 year
          break;
        case 'ArrowRight':
          handleYearIncrement(1); // add 1 year
          break;
        case 'Tab':
          handleTabPressCalendarBody(event);
          break;
        case 'Enter':
        case ' ':
          const year = yearRefs.current[focusedYearIndex]?.innerText;
          onClickYear(year);
          break;
        default:
          break;
      }
    };

    React.useEffect(() => {
      if (displayDate) {
        const displayYear = displayDate.getFullYear().toString();
        const yearIndex = findIndexByYear(displayYear, yearRefs);
        setFocusedYearIndex(yearIndex);
      }
    }, []);

    React.useEffect(() => {
      if (show) {
        const focusedElement = yearRefs.current[focusedYearIndex];
        if (focusedElement) {
          focusedElement.focus();
        }
      }
    }, [show, focusedYearIndex]);

    React.useEffect(() => {
      if (!show) {
        const displayYear = displayDate.getFullYear().toString();
        const yearIndex = findIndexByYear(displayYear, yearRefs);
        setFocusedYearIndex(yearIndex);
      }
    }, [show, displayDate]);

    const getActiveYearClass = (year: number) => {
      if (selectedDate === undefined) return undefined;

      if (selectedDate instanceof Date) {
        if (selectedDate.getFullYear() === year) {
          return 'bg-primary-600 text-white';
        }
      } else {
        const { start, end } = selectedDate;
        if (
          start &&
          end &&
          start.getFullYear() <= year &&
          end.getFullYear() >= year
        ) {
          if (start.getFullYear() === year || end.getFullYear() === year) {
            return 'bg-primary-600 text-white';
          }
          return 'bg-primary-100';
        }

        if (start && start.getFullYear() === year) {
          return 'bg-primary-600 text-white';
        }
      }

      return undefined;
    };

    return (
      <div className="sgds yearpicker" ref={ref} {...props}>
        {yearArray.map((year, index) => {
          const activeYearClass = getActiveYearClass(year);
          return (
            <button
              className={classNames(
                CURRENT_YEAR === year && 'text-primary',
                activeYearClass,
                'year'
              )}
              key={year}
              onClick={() => onClickYear(year)}
              onKeyDown={handleKeyDown}
              ref={(el) => (yearRefs.current[index] = el)}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  }
);

export default YearView;
