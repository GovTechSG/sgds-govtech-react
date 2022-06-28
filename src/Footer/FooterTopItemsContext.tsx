import * as React from 'react';

interface FooterTopItemGrpContextValue {
  noOfItem: number;
}

const context = React.createContext<FooterTopItemGrpContextValue>({
  noOfItem: 0
});
context.displayName = 'FooterTopItemGrpContext';

export default context;
