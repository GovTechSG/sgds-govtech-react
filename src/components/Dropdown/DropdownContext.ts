import * as React from 'react';
import { AlignType } from '../../utils/types';

export type DropDirection = 'up' | 'end' | 'down' /* | 'start' */;

export type DropdownContextValue = {
  align?: AlignType;
  drop?: DropDirection;
  isRTL?: boolean;
};

const DropdownContext = React.createContext<DropdownContextValue>({});
DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
