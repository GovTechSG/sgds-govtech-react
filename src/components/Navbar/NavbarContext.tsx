import * as React from 'react';
import { Size } from '../types'
// TODO: check
export interface NavbarContextType {
  onToggle: () => void;
  bsPrefix?: string;
  expanded: boolean;
  expand?: boolean | Size | number;
}

const context = React.createContext<NavbarContextType | null>(null);
context.displayName = 'NavbarContext';

export default context;
