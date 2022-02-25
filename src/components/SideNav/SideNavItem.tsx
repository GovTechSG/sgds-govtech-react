import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import SideNavItemContext, {
    SideNavItemContextValue,
} from './SideNavItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../../utils/helpers';

export interface SideNavItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  eventKey: string;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion-item' */
  bsPrefix: PropTypes.string,

  /**
   * A unique key used to control this item's collapse/expand.
   * @required
   */
  eventKey: PropTypes.string.isRequired,
};

const SideNavItem: BsPrefixRefForwardingComponent<'li', SideNavItemProps> =
  React.forwardRef<HTMLElement, SideNavItemProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'li',
        bsPrefix,
        className,
        eventKey,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-item');
      const contextValue = useMemo<SideNavItemContextValue>(
        () => ({
          eventKey,
        }),
        [eventKey],
      );

      return (
        <SideNavItemContext.Provider value={contextValue}>
          <Component
            ref={ref}
            {...props}
            className={classNames(className, bsPrefix)}
          />
        </SideNavItemContext.Provider>
      );
    },
  );

SideNavItem.propTypes = propTypes;
SideNavItem.displayName = 'SideNavItem';

export default SideNavItem;
