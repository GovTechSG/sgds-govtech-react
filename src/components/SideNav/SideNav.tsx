import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import { useBootstrapPrefix, SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import SideNavButton from './SideNavButton';
import SideNavCollapse from './SideNavCollapse';
import SideNavContext, {SideNavEventKey, SideNavSelectCallback} from './SideNavContext';
import SideNavItem from './SideNavItem';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../helpers';
export interface SideNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixProps {
  activeKey?: SideNavEventKey;
  defaultActiveKey?: SideNavEventKey;
  onSelect?: SideNavSelectCallback;  
  alwaysOpen?: boolean;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav' */
  bsPrefix: PropTypes.string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey:  PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /** The default active key that is expanded on start */
  defaultActiveKey:  PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
 /** Allow accordion items to stay open when another item is opened */
 alwaysOpen: PropTypes.bool,
};

const SideNav: BsPrefixRefForwardingComponent<'ul', SideNavProps> =
  React.forwardRef<HTMLElement, SideNavProps>((props, ref) => {
    const {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'ul',
      activeKey,
      bsPrefix,
      className,
      onSelect,
      alwaysOpen,
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const prefix = useBootstrapPrefix(bsPrefix, 'sidenav');
    const contextValue = useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
        alwaysOpen,
      }),
      [activeKey, onSelect, alwaysOpen],
    );

    return (
      <SideNavContext.Provider value={contextValue}>
        <SGDSWrapper
          as={Component}
          ref={ref}
          {...controlledProps}
          className={classNames( className, prefix, 'list-unstyled')}
        />
      </SideNavContext.Provider>
    );
  });

SideNav.displayName = 'SideNav';
SideNav.propTypes = propTypes;

export default Object.assign(SideNav, {
  Button: SideNavButton,
  Collapse: SideNavCollapse,
  Item: SideNavItem,
});





