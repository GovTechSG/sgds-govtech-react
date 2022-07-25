import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
//@ts-ignore
import { elementType } from 'prop-types-extra';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';
import Fade from '../Fade/Fade';
import CloseButton from '../CloseButton/CloseButton';
import { Variant } from '../utils/types';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
  TransitionType,
} from '../utils/helpers';
import { AlertLink } from './AlertLink';
import {AlertHeading}  from './AlertHeading';

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  /** The Alert visual color variant */
  variant?: Omit<Variant, 'dark'>;
  /** Renders a properly aligned dismiss button, as well as adding extra horizontal padding to the Alert */
  dismissible?: boolean;
  /** Controls the visual state of the Alert */
  show?: boolean;
  /** Callback fired when alert is closed*/
  onClose?: (a: any, b: any) => void;
  /** Sets the aria-label for alert close button*/
  closeLabel?: string;
   /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition?: TransitionType;
}


const propTypes = {
  /**
   * @default 'alert'
   */
  bsPrefix: PropTypes.string,

  /**
   * The Alert visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light'}
   */
  variant: PropTypes.string,

  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the Alert.
   */
  dismissible: PropTypes.bool,

  /**
   * Controls the visual state of the Alert.
   *
   * @controllable onClose
   */
  show: PropTypes.bool,

  /**
   * Callback fired when alert is closed.
   *
   * @controllable show
   */
  onClose: PropTypes.func,

  /**
   * Sets the text for alert close button.
   */
  closeLabel: PropTypes.string,

  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
};

const defaultProps = {
  variant: 'primary',
  show: true,
  transition: Fade,
  closeLabel: 'Close alert',
};

export const Alert: BsPrefixRefForwardingComponent<'div', AlertProps> =
  React.forwardRef<HTMLDivElement, AlertProps>(
    (uncontrolledProps: AlertProps, ref) => {
      const {
        bsPrefix,
        show,
        as: Component = 'div',
        closeLabel,
        className,
        children,
        variant,
        onClose,
        dismissible,
        transition,
        ...props
      } = useUncontrolled(uncontrolledProps, {
        show: 'onClose',
      });

      const prefix = useBootstrapPrefix(bsPrefix, 'alert');
      const handleClose = useEventCallback((e) => {
        if (onClose) {
          onClose(false, e);
        }
      });
      const Transition = transition === true ? Fade : transition;
      const alert = (
        <SGDSWrapper
          as={Component}
          role="alert"
          {...(!Transition ? props : undefined)}
          ref={ref}
          className={classNames(
            className,
            prefix,
            variant && `${prefix}-${variant}`,
            dismissible && `${prefix}-dismissible`
          )}
        >
          {children}
          {dismissible && (
            <CloseButton
              onClick={handleClose}
              aria-label={closeLabel}
              className={`btn-sm`}
            />
          )}
        </SGDSWrapper>
      );

      if (!Transition) return show ? alert : null;

      return (
        <Transition unmountOnExit {...props} ref={undefined} in={show}>
          {alert}
        </Transition>
      );
    }
  );

Alert.displayName = 'Alert';
Alert.defaultProps = defaultProps;
Alert.propTypes = propTypes;

export default Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading,
});
