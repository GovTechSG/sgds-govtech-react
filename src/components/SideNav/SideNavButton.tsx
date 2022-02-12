import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SideNavContext from './SideNavContext';
import SideNavItemContext from './SideNavItemContext';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../helpers';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export interface SideNavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BsPrefixProps {}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'sidenav-button' */
  bsPrefix: PropTypes.string,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,
};

export function useSideNavButton(
  eventKey: string,
  onClick?: EventHandler,
): EventHandler {
  const { activeEventKey, onSelect } = useContext(SideNavContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    const eventKeyPassed = eventKey === activeEventKey ? null : eventKey;

    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const SideNavButton: BsPrefixRefForwardingComponent<
  'div',
  SideNavButtonProps
> = React.forwardRef<HTMLButtonElement, SideNavButtonProps>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      bsPrefix,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'sidenav-button');
    const { eventKey } = useContext(SideNavItemContext);
    const sideNavOnClick = useSideNavButton(eventKey, onClick);
    const { activeEventKey } = useContext(SideNavContext);

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component
        ref={ref}
        onClick={sideNavOnClick}
        {...props}
        aria-expanded={eventKey === activeEventKey}
        className={classNames(
          className,
          bsPrefix,
          eventKey !== activeEventKey && 'collapsed',
        )}
      />
    );
  },
);

SideNavButton.propTypes = propTypes;
SideNavButton.displayName = 'SideNavButton';

export default SideNavButton;
