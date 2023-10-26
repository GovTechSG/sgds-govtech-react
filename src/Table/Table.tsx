import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';

import { BsPrefixOnlyProps } from '../utils/helpers';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableSortLabel from './TableSortLabel';
import TableBody from './TableBody';
import TableDataCell from './TableDataCell';

export interface TableProps
  extends BsPrefixOnlyProps,
  React.TableHTMLAttributes<HTMLTableElement> {
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
  /** 
   * Allow tables to be scrolled horizontally with ease. Across every breakpoint, use responsive for horizontally scrolling tables. Responsive tables are wrapped automatically in a div. Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or `responsive="xl"` as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally. \n\n Alternatively, set boolean to `true` instead to make it always responsive throughout breakpoints.\n',
   */
  responsive?: boolean | string;
}

const propTypes = {
  /**
   * @default 'table'
   */
  bsPrefix: PropTypes.string,

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
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      bsPrefix,
      className,
      striped,
      bordered,
      borderless,
      hover,
      size,
      variant,
      responsive,
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

    const table = (
      <SGDSWrapper as="table" {...props} className={classes} ref={ref} />
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

export default Object.assign(Table, {
  Row: TableRow,
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  SortLabel: TableSortLabel,
  Body: TableBody,
  DataCell: TableDataCell,
});

