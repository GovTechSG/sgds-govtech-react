import NavLink, { NavLinkProps } from '../Nav/NavLink';
import * as React from 'react';
import { BsPrefixRefForwardingComponent } from '../helpers';
import SideNavContext from './SideNavContext';
export interface SideNavLinkProps extends Omit<NavLinkProps, 'eventKey'> {
  eventKey: string;
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

export default SideNavLink;
