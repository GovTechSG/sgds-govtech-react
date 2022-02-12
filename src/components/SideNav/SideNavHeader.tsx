import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import SideNavButton from './SideNavButton';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../helpers';

export interface SideNavHeader
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav-header' */
  bsPrefix: PropTypes.string,

  /** Click handler for the `SideNavButton` element */
  onClick: PropTypes.func,
};

const SideNavHeader: BsPrefixRefForwardingComponent<
  'h2',
  SideNavHeader
> = React.forwardRef<HTMLElement, SideNavHeader>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'h6', // or button?
      bsPrefix,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-header');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, bsPrefix)}
      >
        <SideNavButton onClick={onClick}>{children}</SideNavButton>
      </Component>
    );
  },
);

SideNavHeader.propTypes = propTypes;
SideNavHeader.displayName = 'SideNavHeader';

export default SideNavHeader;
