import PropTypes from 'prop-types';
import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export type SortOrder = 'asc' | 'desc';

export interface TableSortLabelProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Handles the click event on the sort label. User is expected to pass in the sort
   * handler function that will sort the respective table column.
   *
   * @param e The click event.
   */
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;

  /**
   * Whether sorting is currently active on the column.
   */
  active: boolean;

  /**
   * Whether the column is currently sorted by ascending ('asc') or descending ('desc') order.
   */
  direction: SortOrder;
}

const propTypes = {
  /**
   * Handles the click event on the sort label. User is expected to pass in the sort
   * handler function that will sort the respective table column.
   *
   * @param e The click event.
   */
  onClick: PropTypes.func,

  /**
   * Whether sorting is currently active on the column.
   */
  active: PropTypes.bool,

  /**
   * Whether the column is currently sorted by ascending ('asc') or descending ('desc') order.
   */
  direction: PropTypes.oneOf<SortOrder>(['asc', 'desc']),

  as: PropTypes.elementType,

  bsPrefix: PropTypes.string,
};

export const TableSortLabel: BsPrefixRefForwardingComponent<
  'span',
  TableSortLabelProps
> = React.forwardRef<HTMLSpanElement, TableSortLabelProps>(
  (
    {
      onClick,
      direction = 'asc',
      active = false,
      as: Component = 'span',
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      if (!active) {
        return <i className="bi bi-arrow-down-up ms-2 align-self-center"></i>;
      }
      return direction === 'asc' ? (
        <i className="bi bi-sort-up-alt ms-2 align-self-center"></i>
      ) : (
        <i className="bi bi-sort-down ms-2 align-self-center"></i>
      );
    };

    return (
      <Component
        {...props}
        ref={ref}
        role="button"
        tabIndex="0"
        onClick={onClick}
      >
        {props.children} {getIcon()}
      </Component>
    );
  }
);

TableSortLabel.displayName = 'TableSortLabel';
TableSortLabel.propTypes = propTypes;

export default TableSortLabel;
