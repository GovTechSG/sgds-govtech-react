import NavLink, { NavLinkProps } from '../Nav/NavLink';
import * as React from 'react';
import { BsPrefixRefForwardingComponent } from '../helpers';
import SideNavContext from './SideNavContext';
import PropTypes from 'prop-types';

export interface SideNavLinkProps extends Omit<NavLinkProps, 'eventKey'> {
  eventKey: string;
}

const propTypes = {
  eventKey: PropTypes.string.isRequired
}
const SideNavLink: BsPrefixRefForwardingComponent<'a', SideNavLinkProps> =
  React.forwardRef<HTMLAnchorElement, SideNavLinkProps>(
    ({ eventKey, ...props }, ref) => {
      const { setActiveNavLinkKey } = React.useContext(SideNavContext);

      const handleClick = () => {
        setActiveNavLinkKey(eventKey);
      };
      return (
        <NavLink
          {...props}
          ref={ref}
          eventKey={eventKey}
          onClick={handleClick}
        />
      );
    }
  );

  SideNavLink.displayName = 'SideNavLink'
  SideNavLink.propTypes = propTypes
export default SideNavLink;
