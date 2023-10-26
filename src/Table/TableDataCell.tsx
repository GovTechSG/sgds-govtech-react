import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface TableDataCellProps
  extends BsPrefixProps,
  React.TableHTMLAttributes<HTMLTableCellElement> {
}

const TableDataCell: BsPrefixRefForwardingComponent<'td', TableDataCellProps> =
  React.forwardRef<HTMLTableCellElement, TableDataCellProps>(
    (
      {
        as: Component = 'td',
        ...props
      },
      ref
    ) => {
      return (
        <Component {...props} ref={ref} />
      )
    }
  )

  TableDataCell.displayName = 'TableDataCell';


export default TableDataCell;
