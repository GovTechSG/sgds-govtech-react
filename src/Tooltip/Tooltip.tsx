import * as React from 'react';
import { useState, useRef } from 'react';
import { TooltipPlacement } from '../utils/types';
import Overlay from '../Overlay/Overlay';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import TooltipBox from './TooltipBox';
import PropTypes from 'prop-types';
import generateId from '../utils/generateId';

export interface TooltipProps {
  /** The placement of the Tooltip in relation to its target */
  placement?: TooltipPlacement;
  /** Types of Tooltip include clickable and hoverable */
  type?: 'hover' | 'click';
  /** The content to be displayed in the tooltip */
  content: string;
  children?: React.ReactNode;
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

export const Tooltip: React.FC<TooltipProps> = ({
  placement = 'top',
  type = 'hover',
  content = '',
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const [tooltipId, setTooltipId] = useState('');
  React.useEffect(() => {
    setTooltipId(generateId('tooltip', 'div'));
  }, []);

  const clickToolTip = () => (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
        'aria-describedby': tooltipId,
      })}
      <Overlay target={target.current} show={show} placement={placement} rootClose={true} onHide={() => setShow(false)}>
        {(props) => (
          <TooltipBox
            {...props}
            id={tooltipId}
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
      overlay={
        <TooltipBox id={tooltipId} {...props}>
          {content}
        </TooltipBox>
      }
    >
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setShow(!show),
        ref: target,
        'aria-describedby': tooltipId,
      })}
    </OverlayTrigger>
  );
  return type === 'hover' ? hoverTooltip() : clickToolTip();
};

Tooltip.propTypes = propTypes as any;
export default Tooltip;
