import * as React from 'react';
import PropTypes from 'prop-types';
import SideNavContext from './SideNavContext';
import { BsPrefixRefForwardingComponent } from '../helpers';
import ComponentCollapse from '../Collapse/ComponentCollapse';
import { useContext } from 'react';
import SideNavItemContext from './SideNavItemContext';

export interface SideNavCollapseProps {
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  // eventKey: PropTypes.string.isRequired, 

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

const SideNavCollapse: BsPrefixRefForwardingComponent<
  'div',
  SideNavCollapseProps
> = React.forwardRef<HTMLDivElement, SideNavCollapseProps>(
  ({ children, ...props }, ref) => {
    const { eventKey } = useContext(SideNavItemContext);

    return (
      <ComponentCollapse
        eventKey={eventKey}
        defaultPrefix='sidenav-collapse'
        ref={ref}
        context={SideNavContext}
        {...props}
      >
        <>{children}</>
      </ComponentCollapse>
    );
  }
);


SideNavCollapse.propTypes = propTypes;
SideNavCollapse.displayName = 'SideNavCollapse';

export default SideNavCollapse;
