import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import Collapse, { CollapseProps } from '../Collapse/Collapse';
import SideNavContext, {
  isSideNavItemSelected,
} from './SideNavContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../../utils/helpers';
import SideNavItemContext from './SideNavItemContext';
export interface SideNavCollapseProps extends BsPrefixProps, CollapseProps {
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.oneOfType([
    PropTypes.element,
  ]),
};

const SideNavCollapse: BsPrefixRefForwardingComponent<
  'div',
  SideNavCollapseProps
> = React.forwardRef<Transition<any>, SideNavCollapseProps>(
  ({ as: Component = 'div', bsPrefix, className, children, ...props }, ref) => {
    const { activeEventKey } = useContext(SideNavContext);
    const { eventKey: itemEventKey } = useContext(SideNavItemContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-collapse');
    return (
      <Collapse
        ref={ref}
        in={
          isSideNavItemSelected(activeEventKey, itemEventKey)
        }
        {...props}
        className={classNames(className, bsPrefix)}
      >
        <Component>
          <ul className="list-unstyled">{React.Children.only(children)}</ul>
        </Component>
      </Collapse>
    );
  }
) as any;

SideNavCollapse.propTypes = propTypes;
SideNavCollapse.displayName = 'SideNavCollapse';

export default SideNavCollapse;
