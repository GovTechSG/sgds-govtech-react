import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface TableBodyProps
  extends BsPrefixProps,
    React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const TableBody: BsPrefixRefForwardingComponent<'tbody', TableBodyProps> =
  React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ as: Component = 'tbody', ...props }, ref) => {
      return <Component {...props} ref={ref} />;
    }
  );

TableBody.displayName = 'TableBody';
export default TableBody;
