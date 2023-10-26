import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface TableHeaderProps
  extends BsPrefixProps,
  React.TableHTMLAttributes<HTMLTableSectionElement> {
}

const TableHeader: BsPrefixRefForwardingComponent<'thead', TableHeaderProps> =
  React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    (
      {
        as: Component = 'thead',
        ...props
      },
      ref
    ) => {
      return (
        <Component {...props} ref={ref} />
      )
    }
  )

TableHeader.displayName = 'TableHeader';


export default TableHeader;
