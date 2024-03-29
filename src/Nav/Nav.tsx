import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';
import { useContext, useMemo } from 'react';
import { useUncontrolled } from 'uncontrollable';
import BaseNav, { NavProps as BaseNavProps } from '@restart/ui/Nav';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import NavbarContext from './NavbarContext';
import NavItem from './NavItem';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import { EventKey } from '@restart/ui/types';
import NavContext from './NavContext';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface NavProps extends BsPrefixProps, BaseNavProps {
  /**
   * The visual variant of the nav items.
   */
  variant?: 'tabs-basic-toggle' | 'tabs-info-toggle';
  /**
   * Enable vertical scrolling within the toggleable contents of a collapsed Navbar.
   */
  navbarScroll?: boolean;
  /**
   * The default active key that is selected on start.
   */
  defaultActiveKey?: EventKey;
}

const propTypes = {
  /**
   * @default 'nav'
   */
  bsPrefix: PropTypes.string,

  /** @private */
  // navbarBsPrefix: PropTypes.string,
  /** @private */
  // cardHeaderBsPrefix: PropTypes.string,

  /**
   * The visual variant of the nav items.
   *
   * @type {('tabs-basic-toggle' | 'tabs-info-toggle')}
   */
  variant: PropTypes.string,

  /**
   * The default active key that is selected on start.
   */
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is "tablist", NavLink focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  // navbar: PropTypes.bool,

  /**
   * Enable vertical scrolling within the toggleable contents of a collapsed Navbar.
   */
  navbarScroll: PropTypes.bool,

  as: PropTypes.elementType,

  /** @private */
  onKeyDown: PropTypes.func,
};

const Nav: BsPrefixRefForwardingComponent<'ul', NavProps> = React.forwardRef<
  HTMLElement,
  NavProps
>((uncontrolledProps, ref) => {
  const {
    as = 'ul',
    bsPrefix: initialBsPrefix,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: 'onSelect' });

  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');
  const contextValue = useMemo(
    () => ({
      activeKey,
    }),
    [activeKey]
  );

  const navbarContext = useContext(NavbarContext);

  return (
    <NavContext.Provider value={contextValue}>
      <BaseNav
        as={as}
        ref={ref}
        activeKey={activeKey}
        className={classNames(className, {
          [bsPrefix]: !navbarContext,
          [`${navbarContext?.bsPrefix}-nav`]: navbarContext,
          [`${navbarContext?.bsPrefix}-nav-scroll`]:
            navbarContext && navbarScroll,
          ['sgds']: !navbarContext,
          ['nav-tabs']: !navbarContext,
        })}
        {...props}
      />
    </NavContext.Provider>
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

export default Object.assign(Nav, {
  Item: NavItem,
  Link: NavLink,
  Dropdown: NavDropdown,
});
