import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SelectCallback } from '@restart/ui/types';
import { useUncontrolled } from 'uncontrollable';
import { useBootstrapPrefix, SGDSWrapper } from '../ThemeProvider/ThemeProvider';
// import SideNavBody from './SideNavBody';
import SideNavButton from './SideNavButton';
import SideNavCollapse from './SideNavCollapse';
import SideNavContext from './SideNavContext';
import SideNavHeader from './SideNavHeader';
import SideNavItem from './SideNavItem';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../helpers';
import SideNavBodyItem from './SideNavBodyItem';
export interface SideNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: SelectCallback;  
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav' */
  bsPrefix: PropTypes.string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey: PropTypes.string,

  /** The default active key that is expanded on start */
  defaultActiveKey: PropTypes.string,

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
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const prefix = useBootstrapPrefix(bsPrefix, 'sidenav');
    const contextValue = useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
      }),
      [activeKey, onSelect],
    );

    return (
      <SideNavContext.Provider value={contextValue}>
        <SGDSWrapper
          as={Component}
          ref={ref}
          {...controlledProps}
          className={classNames( className, prefix)}
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
  Header: SideNavHeader,
  // Body: SideNavBody,
  BodyItem: SideNavBodyItem
});





