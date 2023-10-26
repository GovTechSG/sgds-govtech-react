import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface TableRowProps
  extends BsPrefixProps,
  React.TableHTMLAttributes<HTMLTableRowElement> {
}

const TableRow: BsPrefixRefForwardingComponent<'tr', TableRowProps> = 
React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      as: Component = 'tr',
      ...props
    },
    ref
  ) => {
    return (
      <Component {...props} ref={ref} />
    )
  }
)

TableRow.displayName = 'TableRow';

export default TableRow;
