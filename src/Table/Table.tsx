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
      sort,
      ...props
    },
    ref
  ) => {
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
                  )}
                >
                  {header}
                </th>
              )
            }
          )}
        </tr>
      </thead>
    );

    const tableBody = (
      <tbody>
        {tableData.map(
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
