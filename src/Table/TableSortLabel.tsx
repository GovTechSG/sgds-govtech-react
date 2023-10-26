import * as React from 'react';
import PropTypes from 'prop-types';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export type SortOrder = 'asc' | 'desc';

export interface TableSortLabelProps
  extends BsPrefixProps, React.HTMLAttributes<HTMLSpanElement> {
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
  direction: PropTypes.oneOf<SortOrder>(['asc', 'desc'])
}

const TableSortLabel: BsPrefixRefForwardingComponent<'span', TableSortLabelProps> =
  React.forwardRef<HTMLSpanElement, TableSortLabelProps>(
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
        return direction === 'asc'
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

      return (
        <Component
          {...props}
          ref={ref}
          role='button'
          tabIndex='0'
          onClick={onClick} >
          {props.children} {getIcon()}
        </Component>
      )
    }
  )

TableSortLabel.displayName = 'TableSortLabel';
TableSortLabel.propTypes = propTypes;

export default TableSortLabel;
