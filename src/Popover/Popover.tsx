import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix, useIsRTL } from '../ThemeProvider/ThemeProvider';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';
import { Placement } from '../utils/types';
import { BsPrefixProps, getOverlayDirection } from '../utils/helpers';
import PropTypes from 'prop-types';

export interface PopoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  placement?: Placement;
  title?: string;
  body?: boolean;
  popper?: any;
  show?: boolean;
}

const propTypes = {
  /**
   * @default 'popover'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: PropTypes.string,

  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  placement: PropTypes.oneOf<Placement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  /**
   * When this prop is set, it creates a Popover with a Popover.Body inside
   * passing the children directly to it
   */
  body: PropTypes.bool,

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.bool,
};

const defaultProps: Partial<PopoverProps> = {
  placement: 'right',
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      bsPrefix,
      placement,
      className,
      style,
      children,
      body,
      popper: _,
      show: _1,
      ...props
    },
    ref
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
    const isRTL = useIsRTL();
    const [primaryPlacement] = placement?.split('-') || [];
    const bsDirection = getOverlayDirection(primaryPlacement, isRTL);

    return (
      <div
        ref={ref}
        role="tooltip"
        style={style}
        x-placement={primaryPlacement}
        className={classNames(
          className,
          decoratedBsPrefix,
          primaryPlacement && `bs-popover-${bsDirection}`
        )}
        {...props}
      >
        <> {children}</>
      </div>
    );
  }
);

Popover.defaultProps = defaultProps;
Popover.propTypes = propTypes as any;

export default Object.assign(Popover, {
  Header: PopoverHeader,
  Body: PopoverBody,

  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8] as const,
});
