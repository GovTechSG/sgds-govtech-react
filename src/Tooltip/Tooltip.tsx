import * as React from 'react';
import { useState, useRef } from 'react';
import { TooltipPlacement } from '../utils/types';
import Overlay from '../Overlay/Overlay';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import TooltipBox from './TooltipBox';
import CloseButton from '../CloseButton/CloseButton';
import PropTypes from 'prop-types';

export interface TooltipProps {
  placement: TooltipPlacement;
  type: 'hover' | 'click';
  content: string;
  children: React.ReactNode;
}
const propTypes = {
  placement: PropTypes.oneOf<TooltipPlacement>([
    'top-start',
    'bottom-start',
    'top',
    'bottom',
    'left',
    'right',
  ]),
  type: PropTypes.oneOf(['hover', 'click']),
  content: PropTypes.oneOfType([PropTypes.string]),
  children: PropTypes.element,
};
const defaultProps: TooltipProps = {
  placement: 'top',
  type: 'hover',
  children: <></>,
  content: '',
};

export const Tooltip = (props = defaultProps): JSX.Element => {
  const { type, placement, content, children } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const clickToolTip = () => (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
      })}
      <Overlay target={target.current} show={show} placement={placement}>
        {(props) => (
          <TooltipBox
            {...props}
            closeBtn={
              <CloseButton variant="white" onClick={() => setShow(!show)} />
            }
          >
            {content}
          </TooltipBox>
        )}
      </Overlay>
    </>
  );
  const hoverTooltip = () => (
    <OverlayTrigger
      placement={placement}
      overlay={<TooltipBox {...props}>{content}</TooltipBox>}
    >
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
      })}
    </OverlayTrigger>
  );
  return type === 'hover' ? hoverTooltip() : clickToolTip();
};

Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes as any;
export default Tooltip;
