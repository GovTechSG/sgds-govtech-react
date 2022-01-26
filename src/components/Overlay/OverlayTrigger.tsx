import contains from 'dom-helpers/contains';
import * as React from 'react';
import { cloneElement, useCallback, useRef } from 'react';
import useTimeout from '@restart/hooks/useTimeout';
import warning from 'warning';
import { useUncontrolledProp } from 'uncontrollable';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import Overlay, { OverlayChildren, OverlayProps } from './Overlay';
import safeFindDOMNode from '../safeFindDOMNode';

export type OverlayTriggerType = 'hover' | 'click' | 'focus';

export type OverlayDelay = number | { show: number; hide: number };

export type OverlayInjectedProps = {
  onFocus?: (...args: any[]) => any;
};

export type OverlayTriggerRenderProps = OverlayInjectedProps & {
  ref: React.Ref<any>;
};

export interface OverlayTriggerProps
  extends Omit<OverlayProps, 'children' | 'target'> {
  children:
    | React.ReactElement
    | ((props: OverlayTriggerRenderProps) => React.ReactNode);
  trigger?: OverlayTriggerType | OverlayTriggerType[];
  delay?: OverlayDelay;
  show?: boolean;
  defaultShow?: boolean;
  onToggle?: (nextShow: boolean) => void;
  flip?: boolean;
  overlay: OverlayChildren;

  target?: never;
  onHide?: never;
}

function normalizeDelay(delay?: OverlayDelay) {
  return delay && typeof delay === 'object'
    ? delay
    : {
        show: delay,
        hide: delay,
      };
}

type RelatedNative = 'fromElement' | 'toElement';
interface INativeEvent extends MouseEvent {
  fromElement: Element;
  toElement: Element;
}

// Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.
function handleMouseOverOut(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  handler: (...args: [React.MouseEvent<Element, INativeEvent>, ...any[]]) => any,
  args: [React.MouseEvent<Element, INativeEvent>, ...any[]],
  relatedNative: RelatedNative
) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !contains(target, related as any)) {
    handler(...args);
  }
}


const defaultProps = {
  defaultShow: false,
  trigger: ['hover', 'focus'],
};

function OverlayTrigger({
  trigger,
  overlay,
  children,
  popperConfig = {},

  show: propsShow,
  defaultShow = false,
  onToggle,

  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}: OverlayTriggerProps) {
  const triggerNodeRef = useRef(null);
  const mergedRef = useMergedRefs<unknown>(
    triggerNodeRef,
    (children as any).ref
  );
  const timeout = useTimeout();
  const hoverStateRef = useRef<string>('');

  const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle);

  const delay = normalizeDelay(propsDelay);

  const { onFocus, onBlur, onClick } =
    typeof children !== 'function'
      ? React.Children.only(children).props
      : ({} as any);

  const attachRef = (r: React.ComponentClass | Element | null | undefined) => {
    mergedRef(safeFindDOMNode(r));
  };

  const handleShow = useCallback(() => {
    timeout.clear();
    hoverStateRef.current = 'show';

    if (!delay.show) {
      setShow(true);
      return;
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);

  const handleHide = useCallback(() => {
    timeout.clear();
    hoverStateRef.current = 'hide';

    if (!delay.hide) {
      setShow(false);
      return;
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);

  const handleFocus = useCallback(
    (...args: any[]) => {
      handleShow();
      onFocus?.(...args);
    },
    [handleShow, onFocus]
  );

  const handleBlur = useCallback(
    (...args: any[]) => {
      handleHide();
      onBlur?.(...args);
    },
    [handleHide, onBlur]
  );

  const handleClick = useCallback(
    (...args: any[]) => {
      setShow(!show);
      onClick?.(...args);
    },
    [onClick, setShow, show]
  );

  const handleMouseOver = useCallback(
    (...args: [React.MouseEvent<Element, INativeEvent>, ...any[]]) => {
      handleMouseOverOut(handleShow, args, 'fromElement');
    },
    [handleShow]
  );

  const handleMouseOut = useCallback(
    (...args: [React.MouseEvent<Element, INativeEvent>, ...any[]]) => {
      handleMouseOverOut(handleHide, args, 'toElement');
    },
    [handleHide]
  );

  const triggers: string[] = trigger == null ? [] : [].concat(trigger as any);
  const triggerProps: any = {
    ref: attachRef,
  };

  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }

  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }

  if (triggers.indexOf('hover') !== -1) {
    warning(
      triggers.length > 1,
      '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.'
    );
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }

  return (
    <>
      {typeof children === 'function'
        ? children(triggerProps)
        : cloneElement(children, triggerProps)}
      <Overlay
        {...props}
        show={show}
        onHide={handleHide}
        flip={flip}
        placement={placement}
        popperConfig={popperConfig}
        target={triggerNodeRef.current}
      >
        {overlay}
      </Overlay>
    </>
  );
}

OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
