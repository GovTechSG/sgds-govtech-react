import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';

import { BsPrefixOnlyProps } from '../utils/helpers';

export interface TableProps
  extends BsPrefixOnlyProps,
  React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Populates header cells using Arrays.
   */
  tableHeaders?: string[];
  /**
   * Populates data cells using Arrays.
   */
  tableData?: (string | number)[][];
  /**
   * Adds zebra-striping to any table row within the `<tbody>`.
   */
  striped?: boolean;
  /**
   * Adds borders on all sides of the table and cells.
   */
  bordered?: boolean;
  /**
   * Removes all borders on the table and cells, including table header.
   */
  borderless?: boolean;
  /**
   * Enable a hover state on table rows within a `<tbody>`.
   */
  hover?: boolean;
  /**
   * Make tables more compact by cutting cell padding in half by setting
   * size as `sm`.
   */
  size?: string;
  /**
   * Invert the colors of the table — with light text on dark backgrounds
   * by setting variant as `dark`.
   */
  variant?: string;
  /** Allow tables to be scrolled horizontally with ease. Across every breakpoint, use responsive for horizontally scrolling tables. Responsive tables are wrapped automatically in a div. Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or `responsive="xl"` as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally. \n\n Alternatively, set boolean to `true` instead to make it always responsive throughout breakpoints.\n',
   */
  responsive?: boolean | string;
  /**
   * Sorting on a column is enabled by adding the sort property. The sorting algorithm is based on javascript array.sort() method. In ascending order from bottom, alphabets come first, followed by numbers, and then symbols. Similarly, in descending order from bottom, symbols come first, followed by numbers, and then alphabets.
   */
  sort?: boolean;
}

const propTypes = {
  /**
   * @default 'table'
   */
  bsPrefix: PropTypes.string,

  /**
   * Populates header cells using Arrays.
   */
  tableHeaders: PropTypes.arrayOf(PropTypes.string),

  /**
   * Populates data cells using Arrays.
   */
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),

  /**
 * Adds zebra-striping to any table row within the `<tbody>`.
 */
  striped: PropTypes.bool,

  /**
   * Adds borders on all sides of the table and cells.
   */
  bordered: PropTypes.bool,

  /**
   * Removes all borders on the table and cells, including table header.
   */
  borderless: PropTypes.bool,

  /**
   * Enable a hover state on table rows within a `<tbody>`.
   */
  hover: PropTypes.bool,

  /**
   * Make tables more compact by cutting cell padding in half by setting
   * size as `sm`.
   */
  size: PropTypes.string,

  /**
   * Invert the colors of the table — with light text on dark backgrounds
   * by setting variant as `dark`.
   */
  variant: PropTypes.string,

  /**
   * Responsive tables allow tables to be scrolled horizontally with ease.
   * Across every breakpoint, use `responsive` for horizontally
   * scrolling tables. Responsive tables are wrapped automatically in a `div`.
   * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
   * `responsive="xl"` as needed to create responsive tables up to
   * a particular breakpoint. From that breakpoint and up, the table will
   * behave normally and not scroll horizontally.
   */
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Sorting on a column is enabled by adding the sort property. The sorting algorithm is based on javascript array.sort() method. In ascending order from bottom, alphabets come first, followed by numbers, and then symbols. Similarly, in descending order from bottom, symbols come first, followed by numbers, and then alphabets.
   */
  sort: PropTypes.bool
};

interface TableState {
  activeColumn: number | null;
  isSortAsc: boolean | null;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      tableHeaders = [],
      tableData = [],
      bsPrefix,
      className,
      striped,
      bordered,
      borderless,
      hover,
      size,
      variant,
      responsive,
      sort = false,
      ...props
    },
    ref
  ) => {
    const [state, setState] = React.useState<TableState>({
      activeColumn: null, isSortAsc: null
    });
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'table');
    const classes = classNames(
      className,
      decoratedBsPrefix,
      variant && `${decoratedBsPrefix}-${variant}`,
      size && `${decoratedBsPrefix}-${size}`,
      striped && `${decoratedBsPrefix}-striped`,
      bordered && `${decoratedBsPrefix}-bordered`,
      borderless && `${decoratedBsPrefix}-borderless`,
      hover && `${decoratedBsPrefix}-hover`
    );

    const handleHeaderClick = (column: number) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      if (!sort) return;

      if (state.activeColumn === column) {
        setState({ ...state, isSortAsc: !state.isSortAsc });
      } else {
        setState({ activeColumn: column, isSortAsc: true });
      }
    }

    /**
     * Get table data, sorted by the specified column.
     * @param sortColumn The index of the specified column.
     */
    const getSortedData = (sortColumn: number | null) => {
      if (sortColumn === null) {
        return tableData;
      }
      return [...tableData].sort((a: (string | number)[], b: (string | number)[]) => {
        const aValue = a[sortColumn].toString();
        const bValue = b[sortColumn].toString();
        return state.isSortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      })
    }

    const getIcon = (column: number) => {
      if (state.activeColumn !== column) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up ms-2 align-self-center"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        )
      }
      return state.isSortAsc
        ? (<svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-sort-up-alt ms-2 align-self-center"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707V13.5zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"
          />
        </svg>)
        : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-sort-down ms-2 align-self-center"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
            />
          </svg>
        )
    }

    const tableHead = (
      <thead>
        <tr>
          {tableHeaders.map(
            (header: string, index: number) => {
              return (
                <th
                  key={index}
                  className={classNames(
                    sort && 'sortable-header',
                    state.activeColumn === index && 'active'
                  )}
                  onClick={handleHeaderClick(index)}
                >
                  {header} {sort ? getIcon(index) : null}
                </th>
              )
            }
          )}
        </tr>
      </thead>
    );

    const tableBody = (
      <tbody>
        {getSortedData(state.activeColumn).map(
          (row, index: number) => {
            return (
              <tr key={index}>
                {row.map(
                  (cell: string | number, index: number) => {
                    return <td key={index}>{cell}</td>
                  })}
              </tr>
            )
          }
        )}
      </tbody>
    )

    const table = (
      <SGDSWrapper as="table" {...props} className={classes} ref={ref}>
        {tableHead}
        {tableBody}
      </SGDSWrapper>
    )

    if (responsive) {
      let responsiveClass = `${decoratedBsPrefix}-responsive`;
      if (typeof responsive === 'string') {
        responsiveClass = `${responsiveClass}-${responsive}`;
      }

      return (
        <div className={responsiveClass} tabIndex={0}>
          {table}
        </div>
      );
    }

    return table;
  }
);

Table.displayName = 'Table';
Table.propTypes = propTypes;

export default Table;
