import * as React from 'react';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useTimeout from '@restart/hooks/useTimeout';
import { TransitionComponent } from '@restart/ui/types';
import ToastFade from './ToastFade';
import ToastHeader from './ToastHeader';
import ToastBody from './ToastBody';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import ToastContext from './ToastContext';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import { Variant } from '../utils/types';

export interface ToastProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Apply a CSS fade transition to the toast
   */
  animation?: boolean;
  /**
   * Auto hide the toast
   */
  autohide?: boolean;
  /**
   * Delay hiding the toast (ms)
   */
  delay?: number;
  /** Callback triggered once after delay. Use it to set `show` state to false to hide Toast */
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  /** When true, the toast will appear */
  show?: boolean;
  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   */
  transition?: TransitionComponent;
  /**
   * Sets Toast background
   *
   */
  bg?: Variant;
  /** When set true, applies SGDS stylings */
  isSGDS?: boolean;
  /**Adds CSS styling to `<Toast />` based on the defined status */
  status?: 'success' | 'warning' | 'danger';
}

const propTypes = {
  /**
   * @default 'toast'
   */
  bsPrefix: PropTypes.string,

  /**
   * Apply a CSS fade transition to the toast
   */
  animation: PropTypes.bool,

  /**
   * Auto hide the toast
   */
  autohide: PropTypes.bool,

  /**
   * Delay hiding the toast (ms)
   */
  delay: PropTypes.number,

  /**
   * A Callback fired when the close button is clicked.
   */
  onClose: PropTypes.func,

  /**
   * When `true` The toast will show itself.
   */
  show: PropTypes.bool,

  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   */
  transition: PropTypes.elementType,

  /**
   * Sets Toast background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: PropTypes.string,
  isSGDS: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'warning', 'danger']),
};

const Toast: BsPrefixRefForwardingComponent<'div', ToastProps> =
  React.forwardRef<HTMLDivElement, ToastProps>(
    (
      {
        bsPrefix,
        className,
        transition: Transition = ToastFade,
        show = true,
        animation = true,
        delay = 5000,
        autohide = false,
        onClose,
        bg,
        isSGDS = true,
        status,
        ...props
      },
      ref
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');

      // We use refs for these, because we don't want to restart the autohide
      // timer in case these values change.
      const delayRef = useRef(delay);
      const onCloseRef = useRef(onClose);

      useEffect(() => {
        delayRef.current = delay;
        onCloseRef.current = onClose;
      }, [delay, onClose]);

      const autohideTimeout = useTimeout();
      const autohideToast = !!(autohide && show);

      const autohideFunc = useCallback(() => {
        if (autohideToast) {
          onCloseRef.current?.();
        }
      }, [autohideToast]);

      useEffect(() => {
        // Only reset timer if show or autohide changes.
        autohideTimeout.set(autohideFunc, delayRef.current);
      }, [autohideTimeout, autohideFunc]);

      const toastContext = useMemo(
        () => ({
          onClose,
        }),
        [onClose]
      );

      const hasAnimation = !!(Transition && animation);

      const toast = (
        <div
          {...props}
          ref={ref}
          className={classNames(
            bsPrefix,
            className,
            bg && `bg-${bg}`,
            !hasAnimation && (show ? 'show' : 'hide'),
            isSGDS && 'sgds',
            status && `is-${status}`
          )}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        />
      );

      return (
        <ToastContext.Provider value={toastContext}>
          {hasAnimation && Transition ? (
            <Transition in={show} unmountOnExit>
              {toast}
            </Transition>
          ) : (
            toast
          )}
        </ToastContext.Provider>
      );
    }
  );

Toast.propTypes = propTypes;
Toast.displayName = 'Toast';

export default Object.assign(Toast, {
  Body: ToastBody,
  Header: ToastHeader,
});
