import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive'

import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import { DropdownMenuVariant } from '../Dropdown/DropdownMenu';
import NavLink from './NavLink';
import { BsPrefixRefForwardingComponent } from '../helpers';
import NavbarContext from '../Navbar/NavbarContext';

export interface NavDropdownProps extends Omit<DropdownProps, 'title'> {
  title: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  menuVariant?: DropdownMenuVariant;
  href?: string;
  isMegaMenu?: boolean;
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
  href: PropTypes.string,
  isMegaMenu: PropTypes.bool,
};

const NavDropdown: BsPrefixRefForwardingComponent<'div', NavDropdownProps> =
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
        href,
        isMegaMenu,
        ...props
      }: NavDropdownProps,
      ref,
    ) => {
      /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
      const navbarContext = useContext(NavbarContext)
      const expand = navbarContext && navbarContext.expand
      const mediaQueries = {
        sm : useMediaQuery({maxWidth: 992 - 1}),
        md : useMediaQuery({maxWidth: 768 - 1}),
        lg : useMediaQuery({maxWidth: 992 - 1}),
        xl : useMediaQuery({maxWidth: 1200 - 1}),
        xxl : useMediaQuery({maxWidth: 1400 - 1}),
     }
     const [isHam, setIsHam] = React.useState((typeof expand === 'string') && mediaQueries[expand])

      const navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');
      const [show, setShow] = useState(false);
      const showDropdown = () => {
        !isHam ? setShow(true) : undefined;
      };
      const hideDropdown = () => {
        !isHam ? setShow(false) : undefined;
      };
      const onToggle = () => {
        isHam ? setShow(!show) : undefined
      }
      const dropDownClass = classNames(className, navItemPrefix, isMegaMenu ? 'has-megamenu' : undefined)
      const HoverDropdown = (childs: React.ReactNode) =>  (
        <Dropdown
          ref={ref}
          {...props}
          show={show}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
          className={dropDownClass}
          
        >
          {childs}
        </Dropdown>
      )
      const ClickDropdown = (childs: React.ReactNode) =>  (
        <Dropdown
          ref={ref}
          {...props}
          onToggle={onToggle} 
          show={show}
          className={dropDownClass}
        >
          {childs}
        </Dropdown>
      )
      const Childrens = (
        <>
        <Dropdown.Toggle
            id={id}
            eventKey={null}
            active={active}
            disabled={disabled} 
            childBsPrefix={bsPrefix}
            as={NavLink}
            href={isHam ? undefined: href}
          >
            {title}<i className="bi bi-chevron-down"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu
            role={menuRole}
            renderOnMount={renderMenuOnMount}
            rootCloseEvent={rootCloseEvent}
            variant={menuVariant}
            onMouseLeave={hideDropdown}
            isNav
            className={isMegaMenu ? 'mega-menu' : undefined}
          >
            {children}
          </Dropdown.Menu>
        </>
      )
   
      React.useEffect(() => {
        setIsHam((typeof expand === 'string') && mediaQueries[expand])
      }, [(typeof expand === 'string') && mediaQueries[expand]])

      return isHam ? ClickDropdown(Childrens) : HoverDropdown(Childrens)
    },
  );

NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes;

export default Object.assign(NavDropdown, {
  Item: Dropdown.Item,
  ItemText: Dropdown.ItemText,
  Divider: Dropdown.Divider,
  Header: Dropdown.Header,
});
