import classNames from 'classnames';
import * as React from 'react';
// import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
// import SideNavItemContext, {
//   SideNavItemContextValue,
// } from './SideNavItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../helpers';

export interface SideNavBodyItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  // eventKey: string;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav-item' */
  bsPrefix: PropTypes.string,

  /**
   * A unique key used to control this item's collapse/expand.
   * @required
   */
  // eventKey: PropTypes.string.isRequired,
};

const SideNavBodyItem: BsPrefixRefForwardingComponent<'li', SideNavBodyItemProps> =
  React.forwardRef<HTMLElement, SideNavBodyItemProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'li',
        bsPrefix,
        className,
        // eventKey,
        children,
        ...props
      },
      ref
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-subitem');
      //   const contextValue = useMemo<SideNavItemContextValue>(
      //     () => ({
      //       eventKey,
      //     }),
      //     [eventKey],
      //   );

      return (
        <Component
          ref={ref}
          {...props}
          className={classNames(className, bsPrefix)}
        >
          {children}
        </Component>
      );
    }
  );

SideNavBodyItem.propTypes = propTypes;
SideNavBodyItem.displayName = 'SideNavItem';

export default SideNavBodyItem;
