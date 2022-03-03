import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';
import Anchor from '@restart/ui/Anchor';
import {
  useNavItem,
  NavItemProps as BaseNavItemProps,
} from '@restart/ui/NavItem';
import { makeEventKey } from '@restart/ui/SelectableContext';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface NavLinkProps
  extends BsPrefixProps,
    Omit<BaseNavItemProps, 'as'> {}

const propTypes = {
  /**
   * @default 'nav-link'
   */
  bsPrefix: PropTypes.string,

  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /**
   * Uniquely identifies the `NavItem` amongst its siblings,
   * used to determine and control the active state of the parent `Nav`
   */
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** @default 'a' */
  as: PropTypes.elementType,
};

const defaultProps = {
  disabled: false,
};

const NavLink: BsPrefixRefForwardingComponent<'a', NavLinkProps> =
  React.forwardRef<HTMLElement, NavLinkProps>(
    (
      {
        bsPrefix,
        className,
        as: Component = Anchor,
        active,
        eventKey,
        // onClick, 
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
      const [navItemProps, meta] = useNavItem({
        key: makeEventKey(eventKey, props.href),
        active,
        ...props,
      });
      // const navContext = React.useContext(NavContext);

      // const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      //   navContext?.setActiveKey && navContext.setActiveKey(eventKey)
      //   if (onClick) onClick(e)
      // }
      // const computeActive = navContext?.activeKey === eventKey
      return (
        <Component
          {...props}
          {...navItemProps} 
          ref={ref}
          // onClick={handleClick}
          className={classNames(
            className,
            bsPrefix,
            props.disabled && 'disabled',
            (meta.isActive /* || computeActive */) && 'active',
          )}
        />
      );
    },
  );

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
