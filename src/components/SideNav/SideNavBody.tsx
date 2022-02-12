import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import SideNavCollapse from './SideNavCollapse';
import SideNavItemContext from './SideNavItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../helpers';

export interface SideNavBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav-body' */
  bsPrefix: PropTypes.string,
};

const SideNavBody: BsPrefixRefForwardingComponent<'div', SideNavBodyProps> =
  React.forwardRef<HTMLElement, SideNavBodyProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        children,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-body');
      const { eventKey } = useContext(SideNavItemContext);

      return (
        <SideNavCollapse eventKey={eventKey}>
          <Component
            ref={ref}
            {...props}
            className={classNames(className, bsPrefix)}
          >
            <ul>{children}</ul>
          </Component>
        </SideNavCollapse>
      );
    },
  );

SideNavBody.propTypes = propTypes;
SideNavBody.displayName = 'SideNavBody';

export default SideNavBody;
