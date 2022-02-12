import * as React from 'react';
// import { SelectCallback } from '@restart/ui/types';
import { GenericContextValue } from '../Collapse/ComponentCollapse'

export interface SideNavContext extends GenericContextValue{
  // activeEventKey?: string;
  // onSelect?: SelectCallback;
}

const context = React.createContext<SideNavContext>({});
context.displayName = 'SideNavContext';

export default context;
