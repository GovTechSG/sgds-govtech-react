import * as React from 'react';
import { useState, useRef } from 'react';
import { Placement } from '../types';
import Overlay from '../Overlay/Overlay';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import TooltipBox from './TooltipBox';
import CloseButton from '../CloseButton/CloseButton';

export interface TooltipProps {
  placement: Placement;
  type: 'hover' | 'click';
  children: JSX.Element;
  content: string;
}
const defaultProps: TooltipProps = {
  placement: 'top',
  type: 'hover',
  children: <></>,
  content: '',
};

export const Tooltip = (props: TooltipProps = defaultProps): JSX.Element => {
  const { type, placement, children, content } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const clickToolTip = () => (
    <>
      {React.cloneElement(children, {
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
      overlay={<TooltipBox>{content}</TooltipBox>}
    >
      {React.cloneElement(children, {
        onClick: () => setShow(!show),
        ref: target,
      })}
    </OverlayTrigger>
  );
  return type === 'hover' ? hoverTooltip() : clickToolTip();
};

Tooltip.defaultProps = defaultProps;

export default Tooltip;
