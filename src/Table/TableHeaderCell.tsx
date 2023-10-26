import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface TableHeaderCellProps
  extends BsPrefixProps, React.TableHTMLAttributes<HTMLTableCellElement> {
}

const TableHeaderCell: BsPrefixRefForwardingComponent<'th', TableHeaderCellProps> =
  React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
    (
      {
        as: Component = 'th',
        ...props
      },
      ref
    ) => {
      return (
        <Component {...props} ref={ref} />
      )
    }
  )

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
