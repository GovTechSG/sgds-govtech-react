import * as React from 'react';
import PropTypes from 'prop-types';
import { ButtonType } from '@restart/ui/Button';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import { PropsFromToggle } from '../Dropdown/DropdownToggle';
import { BsPrefixProps } from '../utils/helpers';
import { alignPropType } from '../utils/types';

export interface SplitButtonProps
  extends Omit<DropdownProps, 'title'>,
    PropsFromToggle,
    BsPrefixProps {
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole?: string;
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount?: boolean;
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent?: 'click' | 'mousedown';
  /** An anchor `target` passed to the non-toggle Button */
  target?: string;
  /** The content of the non-toggle Button.  */
  title: React.ReactNode;
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel?: string;
  /** A `type` passed to the non-toggle Button */
  type?: ButtonType;
}

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   * @required
   */
  id: PropTypes.string,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string,

  /** An `href` passed to the non-toggle Button */
  href: PropTypes.string,

  /** An anchor `target` passed to the non-toggle Button */
  target: PropTypes.string,

  /** An `onClick` handler passed to the non-toggle Button */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** A `type` passed to the non-toggle Button */
  type: PropTypes.string,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: PropTypes.bool,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,
  /** @ignore */
  variant: PropTypes.string,
  /** @ignore */
  size: PropTypes.string,
};

const defaultProps: Partial<SplitButtonProps> = {
  toggleLabel: 'Toggle dropdown',
  type: 'button',
};

/**
 * A convenience component for simple or general use split button dropdowns. Renders a
 * `ButtonGroup` containing a `Button` and a `Button` toggle for the `Dropdown`. All `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of [`Dropdown`'s
 * props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._
 * The Button `variant`, `size` and `bsPrefix` props are passed to the button and toggle,
 * and menu-related props are passed to the `Dropdown.Menu`
 */
const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>(
  (
    {
      id,
      bsPrefix,
      size,
      variant,
      title,
      type,
      toggleLabel,
      children,
      onClick,
      href,
      target,
      menuRole,
      renderMenuOnMount,
      rootCloseEvent,
      ...props
    },
    ref
  ) => (
    <Dropdown ref={ref} {...props} as={ButtonGroup}>
      <Button
        size={size}
        variant={variant}
        disabled={props.disabled}
        bsPrefix={bsPrefix}
        href={href}
        target={target}
        onClick={onClick}
        type={type}
      >
        {title}
      </Button>
      <Dropdown.Toggle
        split
        id={id}
        size={size}
        variant={variant}
        disabled={props.disabled}
        childBsPrefix={bsPrefix}
      >
        <span className="visually-hidden">{toggleLabel}</span>
        <i className="bi bi-chevron-down"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
);

SplitButton.propTypes = propTypes as any;
SplitButton.defaultProps = defaultProps;
SplitButton.displayName = 'SplitButton';

export default SplitButton;
