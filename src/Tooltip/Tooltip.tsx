import * as React from 'react';
import { useState, useRef } from 'react';
import { TooltipPlacement } from '../utils/types';
import Overlay from '../Overlay/Overlay';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import TooltipBox from './TooltipBox';
import CloseButton from '../CloseButton/CloseButton';
import PropTypes from 'prop-types';
import generateId from '../utils/generateId';

export interface TooltipProps {
  /** The placement of the Tooltip in relation to its target */
  placement?: TooltipPlacement;
  /** Types of Tooltip include clickable and hoverable */
  type?: 'hover' | 'click';
  /** The content to be displayed in the tooltip */
  content: string;
  children?: React.ReactNode
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
  content: '',
};

export const Tooltip: React.FC<TooltipProps> = ((props = defaultProps) => {
  const { type, placement, content, children } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const toolTipId = generateId('tooltip', 'div');
  const clickToolTip = () => (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
        'aria-describedby': toolTipId,
      })}
      <Overlay target={target.current} show={show} placement={placement}>
        {(props) => (
          <TooltipBox
            {...props}
            closeBtn={
              <CloseButton variant="white" onClick={() => setShow(!show)} />
            }
            id={toolTipId}
          >
            {content}
          </TooltipBox>
        )}
      </Overlay>
    </>
  );
  // console.log((children as React.ReactElement).props);
  const hoverTooltip = () => (
    <OverlayTrigger
      placement={placement}
      overlay={<TooltipBox id={toolTipId} {...props}>{content}</TooltipBox>}
    >
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
        'aria-describedby': toolTipId,
      })}
    </OverlayTrigger>
  );
  return type === 'hover' ? hoverTooltip() : clickToolTip();
})

Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes as any;
export default Tooltip;
