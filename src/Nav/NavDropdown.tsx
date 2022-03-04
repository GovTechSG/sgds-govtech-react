import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import { DropdownMenuVariant } from '../Dropdown/DropdownMenu';
import NavLink from './NavLink';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import NavContext from './NavContext';
import { EventKey } from '@restart/ui/esm/types';

export interface NavDropdownProps extends Omit<DropdownProps, 'title'> {
  title: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  menuVariant?: DropdownMenuVariant;
  isMegaMenu?: boolean;
  eventKey?: EventKey;
}

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: PropTypes.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables the toggle NavLink  */
  disabled: PropTypes.bool,

  /** Style the toggle NavLink as active  */
  active: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: PropTypes.bool,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: PropTypes.oneOf<DropdownMenuVariant>(['dark']),

  /** @ignore */
  bsPrefix: PropTypes.string,
  isMegaMenu: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const NavDropdown: BsPrefixRefForwardingComponent<'li', NavDropdownProps> =
  React.forwardRef(
    (
      {
        id,
        title,
        children,
        bsPrefix,
        className,
        rootCloseEvent,
        menuRole,
        disabled,
        active,
        renderMenuOnMount,
        menuVariant,
        isMegaMenu,
        eventKey,
        align,
        ...props
      }: NavDropdownProps,
      ref
    ) => {
      /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
      const navContext = useContext(NavContext);
      const navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');

      const dropDownClass = classNames(
        className,
        navItemPrefix,
        isMegaMenu ? 'has-megamenu' : undefined
      );
      return (
        <Dropdown
          ref={ref}
          as="div"
          {...props}
          className={dropDownClass}
          align={align}
        >
          <Dropdown.Toggle
            id={id}
            eventKey={null}
            active={active || navContext?.activeKey === eventKey}
            disabled={disabled}
            childBsPrefix={bsPrefix}
            as={NavLink}
          >
            {title}
            <i className="bi bi-chevron-down"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu
            role={menuRole}
            renderOnMount={renderMenuOnMount}
            rootCloseEvent={rootCloseEvent}
            variant={menuVariant}
            isNav
            align={align}
            as={isMegaMenu ? 'div' : undefined}
            className={isMegaMenu ? 'mega-menu' : undefined}
          >
            {children}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  );

NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes;

export default Object.assign(NavDropdown, {
  Item: Dropdown.Item,
  ItemText: Dropdown.ItemText,
  Divider: Dropdown.Divider,
  Header: Dropdown.Header,
});
