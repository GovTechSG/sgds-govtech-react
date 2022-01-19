import classNames from 'classnames';
import * as React from 'react';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL } from '../ThemeProvider/ThemeProvider';
import { Placement } from '../types';
import { BsPrefixProps, getOverlayDirection } from '../helpers';

export interface TooltipBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  placement?: Placement;
  arrowProps?: Partial<OverlayArrowProps>;
  show?: boolean;
  popper?: any;
  closeBtn?: JSX.Element;
}

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
      <div
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
      </div>
    );
  }
);

TooltipBox.defaultProps = defaultProps as Partial<TooltipBoxProps>;
TooltipBox.displayName = 'Tooltip';

export default TooltipBox;
