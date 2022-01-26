import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import BaseOverlay, {
  OverlayProps as BaseOverlayProps,
  OverlayArrowProps,
} from '@restart/ui/Overlay';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useOverlayOffset from '../../utils/hooks/useOverlayOffset';
import Fade from '../Fade/Fade';
import { TransitionType } from '../helpers';
import { Placement, RootCloseEvent } from '../types';
import safeFindDOMNode from '../safeFindDOMNode';

export interface OverlayInjectedProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  'aria-labelledby'?: string;

  arrowProps: Partial<OverlayArrowProps>;

  show: boolean;
  placement: Placement | undefined;
  popper: {
    state: any;
    outOfBoundaries: boolean;
    placement: Placement | undefined;
    scheduleUpdate?: () => void;
  };
  [prop: string]: any;
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode);

export interface OverlayProps
  extends Omit<BaseOverlayProps, 'children' | 'transition' | 'rootCloseEvent'> {
  children: OverlayChildren;
  transition?: TransitionType;
  placement?: Placement | undefined;
  rootCloseEvent?: RootCloseEvent;
}

const defaultProps: Partial<OverlayProps> = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: 'top',
};

function wrapRefs(props: any , arrowProps: any) {
  const { ref } = props;
  const { ref: aRef } = arrowProps;

  props.ref = ref.__wrapped || (ref.__wrapped = (r:any) => ref(safeFindDOMNode(r)));
  arrowProps.ref =
    aRef.__wrapped || (aRef.__wrapped = (r:any) => aRef(safeFindDOMNode(r)));
}

const Overlay = React.forwardRef<HTMLElement, OverlayProps>(
  (
    { children: overlay, transition, popperConfig = {}, ...outerProps },
    outerRef,
  ) => {
    const popperRef = useRef({});
    const [ref, modifiers] = useOverlayOffset();
    const mergedRef = useMergedRefs(outerRef as any, ref);

    const actualTransition =
      transition === true ? Fade : transition || undefined;

    return (
      <BaseOverlay
        {...outerProps}
        ref={mergedRef}
        popperConfig={{
          ...popperConfig,
          modifiers: modifiers.concat(popperConfig.modifiers || []),
        }}
        transition={actualTransition as React.ComponentType}
      >
        {(overlayProps, { arrowProps, popper: popperObj, show }) => {
          wrapRefs(overlayProps, arrowProps);
          // Need to get placement from popper object, handling case when overlay is flipped using 'flip' prop
          const updatedPlacement = popperObj?.placement;
          const popper = Object.assign(popperRef.current, {
            state: popperObj?.state,
            scheduleUpdate: popperObj?.update,
            placement: updatedPlacement,
            outOfBoundaries:
              popperObj?.state?.modifiersData.hide?.isReferenceHidden || false,
          });

          if (typeof overlay === 'function')
            return overlay({
              ...overlayProps,
              placement: updatedPlacement,
              show,
              ...(!transition && show && { className: 'show' }),
              popper,
              arrowProps,
            });

          return React.cloneElement(overlay as React.ReactElement, {
            ...overlayProps,
            placement: updatedPlacement,
            arrowProps,
            popper,
            className: classNames(
              (overlay as React.ReactElement).props.className,
              !transition && show && 'show',
            ),
            style: {
              ...(overlay as React.ReactElement).props.style,
              ...overlayProps.style,
            },
          });
        }}
      </BaseOverlay>
    );
  },
);

Overlay.displayName = 'Overlay';
Overlay.defaultProps = defaultProps;

export default Overlay;
