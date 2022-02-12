import * as React from 'react';
// import { SelectCallback } from '@restart/ui/types';
import { GenericContextValue } from '../Collapse/ComponentCollapse'

export interface AccordionContextValue extends GenericContextValue{
  // activeEventKey?: string;
  // onSelect?: SelectCallback;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = 'AccordionContext';

export default context;
