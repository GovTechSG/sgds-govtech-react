import * as React from 'react';
import { useState, useRef } from 'react';
import { Placement } from '../types';
import Overlay, { OverlayChildren } from '../Overlay/Overlay';
import Button from '../Button/Button';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import TooltipBox from './TooltipBox';

export interface TooltipProps {
  placement: Placement;
  type: 'hover' | 'click';
  //   childComponent: JSX.Element
}
const defaultProps: TooltipProps = {
  placement: 'top',
  type: 'hover',
  //   childComponent: <Button>test</Button>
};

const HoverTooltip = (
  placement: Placement,
  overlay: JSX.Element
): JSX.Element => (
  <OverlayTrigger
    placement={placement}
    overlay={<TooltipBox>Tooltip</TooltipBox>}
  >
    {overlay}
  </OverlayTrigger>
);

const Tooltip = (props: TooltipProps = defaultProps): JSX.Element => {
  const { type, placement } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const ClickToolTip = () => (
    <>
      {
        <Button ref={target} onClick={() => setShow(!show)}>
          Click me!
        </Button>
      }
      <Overlay target={target.current} show={show} placement={placement}>
        {(props) => <TooltipBox {...props}>My Tooltip</TooltipBox>}
      </Overlay>
    </>
  );
  if (type === 'hover')
    return HoverTooltip(
      placement,
      <Button ref={target} onClick={() => setShow(!show)}>
        Click me!
      </Button>
    );
  else return ClickToolTip();
};

export default Tooltip;
