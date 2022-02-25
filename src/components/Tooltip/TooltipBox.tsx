import classNames from 'classnames';
import * as React from 'react';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL, SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import { Placement } from '../../utils/types';
import { BsPrefixProps, getOverlayDirection } from '../../utils/helpers';
import PropTypes from 'prop-types';

export interface TooltipBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  placement?: Placement;
  arrowProps?: Partial<OverlayArrowProps>;
  show?: boolean;
  popper?: any;
  closeBtn?: JSX.Element;
}
const propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: PropTypes.string,

  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
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
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.any,
  closeBtn: PropTypes.element
};
const defaultProps = {
  placement: 'right',
};

const TooltipBox = React.forwardRef<HTMLDivElement, TooltipBoxProps>(
  (
    {
      bsPrefix,
      placement,
      className,
      style,
      children,
      arrowProps,
      popper: _,
      show: _2,
      closeBtn,
      ...props
    }: TooltipBoxProps,
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
    const isRTL = useIsRTL();

    const [primaryPlacement] = placement?.split('-') || [];
    const bsDirection = getOverlayDirection(primaryPlacement, isRTL);

    return (
      <SGDSWrapper
        ref={ref}
        style={style}
        role="tooltip"
        x-placement={primaryPlacement}
        className={classNames(className, bsPrefix, `bs-tooltip-${bsDirection}`)}
        {...props}
      >
        <div className="tooltip-arrow" {...arrowProps} />
        <div className={`${bsPrefix}-inner`}>
          {children}
          { closeBtn}
        </div>
      </SGDSWrapper>
    );
  }
);

TooltipBox.defaultProps = defaultProps as Partial<TooltipBoxProps>;
TooltipBox.displayName = 'Tooltip';
TooltipBox.propTypes = propTypes as any;
export default TooltipBox;
