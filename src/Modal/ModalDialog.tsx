import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';

import { BsPrefixProps } from '../utils/helpers';

export interface ModalDialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  /**
   * Render a large, extra large or small modal.
   */
  size?: 'sm' | 'lg' | 'xl';
  /**
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   */
  fullscreen?:
    | true
    | 'sm-down'
    | 'md-down'
    | 'lg-down'
    | 'xl-down'
    | 'xxl-down';
  /**
   * Specify whether the Component should be vertically centered
   */
  centered?: boolean;
   /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable?: boolean;
   /**
   * Forwards className to .modal-content
   */
  contentClassName?: string;
}

const propTypes = {
  /** @default 'modal' */
  bsPrefix: PropTypes.string,
  contentClassName: PropTypes.string,

  /**
   * Render a large, extra large or small modal.
   *
   * @type ('sm'|'lg','xl')
   */
  size: PropTypes.string,

  /**
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   *
   * @type (true|'sm-down'|'md-down'|'lg-down'|'xl-down'|'xxl-down')
   */
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: PropTypes.bool,
};

const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  (
    {
      bsPrefix,
      className,
      contentClassName,
      centered,
      size,
      fullscreen,
      children,
      scrollable,
      ...props
    }: ModalDialogProps,
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
    const dialogClass = `${bsPrefix}-dialog`;

    const fullScreenClass =
      typeof fullscreen === 'string'
        ? `${bsPrefix}-fullscreen-${fullscreen}`
        : `${bsPrefix}-fullscreen`;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          dialogClass,
          className,
          size && `${bsPrefix}-${size}`,
          centered && `${dialogClass}-centered`,
          scrollable && `${dialogClass}-scrollable`,
          fullscreen && fullScreenClass
        )}
      >
        <div className={classNames(`${bsPrefix}-content`, contentClassName)}>
          {children}
        </div>
      </div>
    );
  }
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes as any;

export default ModalDialog;
