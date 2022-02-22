import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import { DropdownMenuVariant } from '../Dropdown/DropdownMenu';
import NavLink from './NavLink';
import { BsPrefixRefForwardingComponent } from '../helpers';
import NavbarContext from '../Navbar/NavbarContext';
import { SM, MD, LG, XL, XXL } from '../../utils/constant';
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
  href?: string;
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
  href: PropTypes.string,
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
        href,
        isMegaMenu,
        eventKey,
        ...props
      }: NavDropdownProps,
      ref
    ) => {
      /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
      const navbarContext = useContext(NavbarContext);
      const navContext = useContext(NavContext);
      const expand = navbarContext && navbarContext.expand;
      const defaultMediaQueries = {
        sm: useMediaQuery({ maxWidth: SM - 1 }),
        md: useMediaQuery({ maxWidth: MD - 1 }),
        lg: useMediaQuery({ maxWidth: LG - 1 }),
        xl: useMediaQuery({ maxWidth: XL - 1 }),
        xxl: useMediaQuery({ maxWidth: XXL - 1 }),
      };
      const noMediaQuery = typeof expand === 'boolean';
      const stringMediaQuery =
        typeof expand === 'string' && defaultMediaQueries[expand];
      const numberMediaQuery =
        typeof expand === 'number' && useMediaQuery({ maxWidth: expand - 1 });
      const [isHam, setIsHam] = React.useState(stringMediaQuery);

      const navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');

      // const computeActive = navContext?.activeKey === activeItemKey
      const computeActive = eventKey
        ? navContext?.activeKey === eventKey
        : undefined;
      // const [show, setShow] = useState(false);
      /* const showDropdown = () => {
        !isHam ? setShow(true) : undefined;
      };
      const hideDropdown = () => {
        !isHam ? setShow(false) : undefined;
      };
      const onToggle = () => {
        isHam ? setShow(!show) : undefined;
      }; */
      const dropDownClass = classNames(
        className,
        navItemPrefix,
        isMegaMenu ? 'has-megamenu' : undefined,
        isHam ? undefined : 'is-hoverable'
      );
      /*  const HoverDropdown = (childs: React.ReactNode) => (
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
      );
      const ClickDropdown = (childs: React.ReactNode) => (
        <Dropdown
          ref={ref}
          {...props}
          onToggle={onToggle}
          show={show}
          className={dropDownClass}
        >
          {childs}
        </Dropdown>
      ); */
      /*    const Childrens = (
        <>
          <Dropdown.Toggle
            id={id}
            eventKey={null}
            active={active}
            disabled={disabled}
            childBsPrefix={bsPrefix}
            as={NavLink}
            href={isHam ? undefined : href}
          >
            {title}
            <i className="bi bi-chevron-down"></i>
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
      ); */

      React.useEffect(() => {
        // if (typeof expand === 'string') setIsHam(defaultMediaQueries[expand])
        // if (typeof expand === 'number') setIsHam(customMQ)
        if (noMediaQuery) setIsHam(!expand);
        else setIsHam(stringMediaQuery || numberMediaQuery);
        console.log(isHam);
      }, [stringMediaQuery, numberMediaQuery]);

      // return isHam ? ClickDropdown(Childrens) : HoverDropdown(Childrens);

      return (
        <Dropdown ref={ref} as="li" {...props} className={dropDownClass}>
          <Dropdown.Toggle
            id={id}
            eventKey={null}
            active={active || computeActive}
            disabled={disabled}
            childBsPrefix={bsPrefix}
            as={NavLink}
            href={isHam ? undefined : href}
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
