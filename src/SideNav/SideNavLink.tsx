import NavLink, { NavLinkProps } from '../Nav/NavLink';
import * as React from 'react';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import SideNavContext from './SideNavContext';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface SideNavLinkProps extends Omit<NavLinkProps, 'eventKey'> {
  /** A unique key for SideNavLink */
  eventKey: string;
}

const propTypes = {
  eventKey: PropTypes.string.isRequired
}
export const SideNavLink: BsPrefixRefForwardingComponent<'a', SideNavLinkProps> =
  React.forwardRef<HTMLAnchorElement, SideNavLinkProps>(
    ({ eventKey, ...props }, ref) => {
      const {  activeLinkKey } = React.useContext(SideNavContext);
      return (
        <NavLink
          {...props}
          ref={ref}
          eventKey={eventKey}
          className={classNames( activeLinkKey === eventKey && 'active' )}
        />
      );
    }
  );

  SideNavLink.displayName = 'SideNavLink'
  SideNavLink.propTypes = propTypes
export default SideNavLink;
