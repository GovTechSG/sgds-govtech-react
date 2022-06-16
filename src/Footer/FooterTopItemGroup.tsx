import classNames from 'classnames';
import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import FooterTopItemsContext from './FooterTopItemsContext';
import warning from 'warning';

export interface FooterTopItemGroupProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
};

export const FooterTopItemGroup: BsPrefixRefForwardingComponent<
  'div',
  FooterTopItemGroupProps
> = React.forwardRef<HTMLElement, FooterTopItemGroupProps>(
  ({ as: Component = 'div', children, className, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-items');

    const noOfChildren = React.Children.count(children);
    const contextValue = React.useMemo(
      () => ({ noOfItem: noOfChildren }),
      [noOfChildren]
    );

    warning(noOfChildren <= 6, 'Number of Footer Items should not exceed 6');

    return (
      <FooterTopItemsContext.Provider value={contextValue}>
        <Component
          className={classNames(bsPrefix, className, 'row')}
          ref={ref}
          {...props}
        >
          {children}
        </Component>
      </FooterTopItemsContext.Provider>
    );
  }
);

FooterTopItemGroup.displayName = 'FooterTopItemGroup';
FooterTopItemGroup.propTypes = propTypes;
export default FooterTopItemGroup;
