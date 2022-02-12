import * as React from 'react';

export interface SideNavItemContextValue {
  eventKey: string;
}

const context = React.createContext<SideNavItemContextValue>({
  eventKey: '',
});
context.displayName = 'SideNavItemContext';

export default context;
