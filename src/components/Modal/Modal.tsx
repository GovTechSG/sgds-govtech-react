import classNames from 'classnames';
import addEventListener from 'dom-helpers/addEventListener';
import canUseDOM from 'dom-helpers/canUseDOM';
import ownerDocument from 'dom-helpers/ownerDocument';
import removeEventListener from 'dom-helpers/removeEventListener';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useEventCallback from '@restart/hooks/useEventCallback';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useWillUnmount from '@restart/hooks/useWillUnmount';
import transitionEnd from 'dom-helpers/transitionEnd';
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import BaseModal, {
  ModalProps as BaseModalProps,
  ModalHandle,
  ModalTransitionComponent,
} from '@restart/ui/Modal';
import { getSharedManager } from '../BootstrapModalManager/BootstrapModalManager';
import Fade, { FadeProps } from '../Fade/Fade';
import ModalBody from './ModalBody';
import ModalContext from './ModalContext';
import ModalDialog, { ModalDialogProps } from './ModalDialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import { BsPrefixRefForwardingComponent } from '../helpers';
import {
  useBootstrapPrefix,
  useIsRTL,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';

export interface ModalProps
  extends Omit<
    BaseModalProps,
    | 'role'
    | 'renderBackdrop'
    | 'renderDialog'
    | 'transition'
    | 'backdropTransition'
    | 'children'
  > {
  size?: 'sm' | 'lg' | 'xl';
  fullscreen?:
    | true
    | 'sm-down'
    | 'md-down'
    | 'lg-down'
    | 'xl-down'
    | 'xxl-down';
  bsPrefix?: string;
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  contentClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
  [other: string]: any;
}

const defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
};

function DialogTransition(props: FadeProps) {
  return <Fade {...props} timeout={null} />;
}

function BackdropTransition(props: FadeProps) {
  return <Fade {...props} timeout={null} />;
}

/* eslint-enable no-use-before-define */
const Modal: BsPrefixRefForwardingComponent<'div', ModalProps> =
  React.forwardRef(
    (
      {
        bsPrefix,
        className,
        style,
        dialogClassName,
        contentClassName,
        children,
        dialogAs: Dialog,
        'aria-labelledby': ariaLabelledby,

        /* BaseModal props */

        show,
        animation,
        backdrop,
        keyboard,
        onEscapeKeyDown,
        onShow,
        onHide,
        container,
        autoFocus,
        enforceFocus,
        restoreFocus,
        restoreFocusOptions,
        onEntered,
        onExit,
        onExiting,
        onEnter,
        onEntering,
        onExited,
        backdropClassName,
        manager: propsManager,
        ...props
      },
      ref
    ) => {
      const [modalStyle, setStyle] = useState({});
      const [animateStaticModal, setAnimateStaticModal] = useState(false);
      const waitingForMouseUpRef = useRef(false);
      const ignoreBackdropClickRef = useRef(false);
      const removeStaticModalAnimationRef = useRef<(() => void) | null>(null);
      const [modal, setModalRef] = useCallbackRef<ModalHandle>();

      const mergedRef = useMergedRefs<ModalHandle>(
        ref as React.MutableRefObject<ModalHandle>,
        setModalRef
      );
      const handleHide = useEventCallback(onHide);
      const isRTL = useIsRTL();

      bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');

      const modalContext = useMemo(
        () => ({
          onHide: handleHide,
        }),
        [handleHide]
      );

      function getModalManager() {
        if (propsManager) return propsManager;
        return getSharedManager({ isRTL });
      }

      function updateDialogStyle(node: HTMLElement | null) {
        if (!canUseDOM) return;

        const containerIsOverflowing =
          getModalManager().getScrollbarWidth() > 0;

        const modalIsOverflowing =
          node!.scrollHeight >
          ownerDocument(node as Element).documentElement.clientHeight;

        setStyle({
          paddingRight:
            containerIsOverflowing && !modalIsOverflowing
              ? getScrollbarSize()
              : undefined,
          paddingLeft:
            !containerIsOverflowing && modalIsOverflowing
              ? getScrollbarSize()
              : undefined,
        });
      }

      const handleWindowResize = useEventCallback(() => {
        if (modal) {
          updateDialogStyle(modal.dialog);
        }
      });

      useWillUnmount(() => {
        removeEventListener(window as any, 'resize', handleWindowResize);
        removeStaticModalAnimationRef.current?.();
      });

      // We prevent the modal from closing during a drag by detecting where the
      // the click originates from. If it starts in the modal and then ends outside
      // don't close.
      const handleDialogMouseDown = () => {
        waitingForMouseUpRef.current = true;
      };

      const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
          waitingForMouseUpRef.current &&
          modal &&
          e.target === modal.dialog
        ) {
          ignoreBackdropClickRef.current = true;
        }
        waitingForMouseUpRef.current = false;
      };

      const handleStaticModalAnimation = () => {
        setAnimateStaticModal(true);
        removeStaticModalAnimationRef.current = transitionEnd(
          modal!.dialog as any,
          () => {
            setAnimateStaticModal(false);
          }
        );
      };

      const handleStaticBackdropClick = (
        e: React.MouseEvent<HTMLDivElement>
      ) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        handleStaticModalAnimation();
      };

      const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop === 'static') {
          handleStaticBackdropClick(e);
          return;
        }

        if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
          ignoreBackdropClickRef.current = false;
          return;
        }

        onHide?.();
      };
      const handleEscapeKeyDown = (e: Event) => {
        if (!keyboard && backdrop === 'static') {
          // Call preventDefault to stop modal from closing in restart ui,
          // then play our animation.
          e.preventDefault();
          handleStaticModalAnimation();
        } else if (keyboard && onEscapeKeyDown) {
          onEscapeKeyDown(e);
        }
      };
      const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
        if (node) {
          node.style.display = 'block';
          updateDialogStyle(node);
        }

        onEnter?.(node, isAppearing);
      };
      const handleExit = (node: HTMLElement) => {
        removeStaticModalAnimationRef.current?.();
        onExit?.(node);
      };
      const handleEntering = (node: HTMLElement, isAppearing: boolean) => {
        onEntering?.(node, isAppearing);

        // FIXME: This should work even when animation is disabled.
        addEventListener(window as any, 'resize', handleWindowResize);
      };
      const handleExited = (node: HTMLElement) => {
        if (node) node.style.display = ''; // RHL removes it sometimes
        onExited?.(node);

        // FIXME: This should work even when animation is disabled.
        removeEventListener(window as any, 'resize', handleWindowResize);
      };

      const renderBackdrop = useCallback(
        (backdropProps) => (
          <div
            {...backdropProps}
            className={classNames(
              `${bsPrefix}-backdrop`,
              backdropClassName,
              !animation && 'show'
            )}
          />
        ),
        [animation, backdropClassName, bsPrefix]
      );

      const baseModalStyle = { ...style, ...modalStyle };

      // Sets `display` always block when `animation` is false
      if (!animation) {
        baseModalStyle.display = 'block';
      }
      const renderDialog = (dialogProps: ModalDialogProps) => (
        <SGDSWrapper
          role="dialog"
          {...dialogProps}
          style={baseModalStyle}
          className={classNames(
            className,
            bsPrefix,
            animateStaticModal && `${bsPrefix}-static`
          )}
          onClick={backdrop ? handleClick : undefined}
          onMouseUp={handleMouseUp}
          aria-labelledby={ariaLabelledby}
        >
          {/*
        // @ts-ignore */}
          <Dialog
            {...props}
            onMouseDown={handleDialogMouseDown}
            className={dialogClassName}
            contentClassName={contentClassName}
          >
            {children}
          </Dialog>
        </SGDSWrapper>
      );

      return (
        <ModalContext.Provider value={modalContext}>
          <BaseModal
            show={show}
            ref={mergedRef}
            backdrop={backdrop}
            container={container}
            keyboard // Always set true - see handleEscapeKeyDown
            autoFocus={autoFocus}
            enforceFocus={enforceFocus}
            restoreFocus={restoreFocus}
            restoreFocusOptions={restoreFocusOptions}
            onEscapeKeyDown={handleEscapeKeyDown}
            onShow={onShow}
            onHide={onHide}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={onEntered}
            onExit={handleExit}
            onExiting={onExiting}
            onExited={handleExited}
            manager={getModalManager()}
            transition={
              animation
                ? (DialogTransition as ModalTransitionComponent)
                : undefined
            }
            backdropTransition={
              animation
                ? (BackdropTransition as ModalTransitionComponent)
                : undefined
            }
            renderBackdrop={renderBackdrop}
            renderDialog={renderDialog}
          />
        </ModalContext.Provider>
      );
    }
  );

Modal.displayName = 'Modal';
Modal.defaultProps = defaultProps;

export default Object.assign(Modal, {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150,
});
