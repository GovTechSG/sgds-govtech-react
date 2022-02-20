import DropdownItem, { DropdownItemProps } from '../Dropdown/DropdownItem';
import * as React from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../helpers';
import NavContext from './NavContext';

export interface NavDropdownItemProps extends DropdownItemProps {
  of: string;
}
const propTypes = {
  of: PropTypes.string.isRequired,
};
const NavDropdownItem: BsPrefixRefForwardingComponent<
  typeof DropdownItem,
  NavDropdownItemProps
> = React.forwardRef(({ onClick, of, ...props }, ref) => {
  const navContext = React.useContext(NavContext);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    navContext?.setActiveKey && navContext?.setActiveKey(of);
    if (onClick) {
      onClick(e);
    }
  };
  return <DropdownItem ref={ref} {...props} onClick={handleClick} />;
});
NavDropdownItem.propTypes = propTypes;
NavDropdownItem.displayName = 'NavDropdownItem';
export default NavDropdownItem;
