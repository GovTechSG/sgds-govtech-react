import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ModalManager from '@restart/ui/ModalManager';
import { Modal, ModalProps } from '../../src/Modal';
import sinon from 'sinon';

describe('<Modal>', () => {
  it('Should forward ref to BaseModal', () => {
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>
    );
    expect(ref.current!.dialog).toBeDefined();
  });

  it('Should render the modal content', () => {
    const { getByTestId } = render(
      <Modal show animation={false} data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').querySelector('strong')!.textContent).toEqual(
      'Message'
    );
  });

  it('Should sets `display: block` to `div.modal` when animation is false', () => {
    const ref = React.createRef<ModalProps>();
    render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>
    );

    expect(ref.current!.dialog.style.display).toEqual('block');
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const { getByRole } = render(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    // the modal-dialog element is pointer-events: none;
    fireEvent.click(getByRole('dialog'));
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = jest.fn();
    const { getByTestId } = render(
      <Modal show onHide={onHideSpy} backdrop="static" data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.click(getByTestId('modal'));
    expect(onHideSpy).not.toHaveBeenCalled();
  });

  it('Should show "static" dialog animation when backdrop is clicked', () => {
    const { getByRole } = render(
      <Modal show backdrop="static">
        <strong>Message</strong>
      </Modal>
    );

    const modalDialog = getByRole('dialog');
    fireEvent.click(modalDialog);
    expect(getByRole('dialog').classList).toContain('modal-static');
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', () => {
    const { getByRole } = render(
      <Modal show backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });
    expect(getByRole('dialog').classList).toContain('modal-static');
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', () => {
    const { getByRole } = render(
      <Modal show backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });
    expect(getByRole('dialog').classList).not.toContain('modal-static');
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', () => {
    const { getByTestId, getByRole } = render(
      <Modal show backdrop data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.click(getByTestId('modal'));
    expect(getByRole('dialog').classList).not.toContain('modal-static');
  });

  it('Should close the modal when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const { getByTestId } = render(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton data-testid="close-btn" />
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.click(getByTestId('close-btn').querySelector('button')!);
  });

  it('Should pass className to the dialog', () => {
    const { getByRole } = render(
      <Modal show className="mymodal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByRole('dialog').classList).toContain('mymodal');
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    render(
      <Modal show backdropClassName="my-modal-backdrop">
        <strong>Message</strong>
      </Modal>
    );

    expect(document.querySelector('.modal-backdrop')!.classList).toContain(
      'my-modal-backdrop'
    );
  });

  it('Should pass size to the dialog', () => {
    const { getByTestId } = render(
      <Modal show size="sm" data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain('modal-sm');
  });

  it('Should pass fullscreen as bool to the dialog', () => {
    const { getByTestId } = render(
      <Modal show fullscreen data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain('modal-fullscreen');
  });

  it('Should pass fullscreen as string to the dialog', () => {
    const { getByTestId } = render(
      <Modal show fullscreen="sm-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain(
      'modal-fullscreen-sm-down'
    );
  });

  it('Should pass centered to the dialog', () => {
    const { getByTestId } = render(
      <Modal show centered data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain('modal-dialog-centered');
  });

  it('Should pass scrollable to the dialog', () => {
    const { getByTestId } = render(
      <Modal show scrollable data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain('modal-dialog-scrollable');
  });

  it('Should pass dialog style to the dialog', () => {
    const { getByRole } = render(
      <Modal show style={{ color: 'red' }}>
        <strong>Message</strong>
      </Modal>
    );

    expect(getByRole('dialog').style.color).toEqual('red');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const { getByTestId } = render(
      <Modal show dialogClassName="my-dialog" data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    expect(getByTestId('modal').classList).toContain('my-dialog');
  });

  it('Should pass contentClassName to .modal-content', () => {
    const { getByTestId } = render(
      <Modal show contentClassName="my-content" data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    const modalContent = getByTestId('modal').querySelector('.modal-content')!;
    expect(modalContent.classList).toContain('my-content');
  });

  it('should pass centered-align-icon to role=dialog element when centeredAlignVariant is true', () => {
    const { getByRole, rerender } = render(
      <Modal show centeredAlignVariant>
        <strong>Message</strong>
      </Modal>
    );
    expect(getByRole('dialog')).toHaveAttribute(
      'variant',
      'centered-align-icon'
    );
    rerender(
      <Modal show centeredAlignVariant={false}>
        <strong>Message</strong>
      </Modal>
    );
    expect(getByRole('dialog')).not.toHaveAttribute('variant');
  });
  it('Should use dialogAs', () => {
    function CustomDialog() {
      return <div className="custom-dialog" tabIndex={-1} />;
    }

    render(
      // eslint-disable-next-line react/jsx-no-bind
      <Modal show dialogAs={CustomDialog}>
        <strong>Message</strong>
      </Modal>
    );

    expect(document.querySelector('.custom-dialog')).toBeInTheDocument();
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = jest.fn();
    const Elem = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Modal
          show={show}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            setShow(false);
          }}
          onExit={increment}
          onExiting={increment}
          onExited={() => {
            increment();
            expect(increment).toHaveBeenCalledTimes(6);
            done();
          }}
        >
          <strong>Message</strong>
        </Modal>
      );
    };

    render(<Elem />);
  });

  it('should call `transitionend` before `exited`', (done) => {
    const increment = jest.fn();

    const { getByRole, rerender } = render(
      <Modal
        show
        data-testid="modal"
        style={{ transition: 'opacity 1s linear' }}
      >
        <strong>Message</strong>
      </Modal>
    );
    const modal = getByRole('dialog');
    modal.addEventListener('transitionend', increment);
    rerender(
      <Modal
        show={false}
        onExited={() => {
          expect(increment).toHaveBeenCalledTimes(1);
          modal.removeEventListener('transitionend', increment);
          done();
        }}
      >
        Foo
      </Modal>
    );
  });

  it('Should close once it was clicked outside of the Modal', () => {
    const onHideSpy = jest.fn();
    const { getByRole } = render(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.click(getByRole('dialog'));
    expect(onHideSpy).toHaveBeenCalled();
  });

  it('Should not call onHide if the click target comes from inside the dialog', () => {
    const onHideSpy = jest.fn();
    const { getByTestId, getByRole } = render(
      <Modal show onHide={onHideSpy} data-testid="modal">
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.mouseDown(getByTestId('modal'));
    fireEvent.mouseUp(getByRole('dialog'));
    fireEvent.click(getByRole('dialog'));

    expect(onHideSpy).not.toHaveBeenCalled();
    // onHideSpy.should.not.have.been.called;
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const { getByRole } = render(
      <Modal show aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>
    );

    expect(getByRole('dialog').getAttribute('aria-labelledby')).toEqual(
      'modal-title'
    );
  });

  it('Should set aria-describedby to the role="dialog" element if aria-describedby set', () => {
    const { getByRole } = render(
      <Modal show aria-describedby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>
    );
    expect(getByRole('dialog').getAttribute('aria-describedby')).toEqual(
      'modal-title'
    );
  });

  it('Should set aria-label to the role="dialog" element if aria-label set', () => {
    const labelValue = 'modal-label';
    const { getByRole } = render(
      <Modal show aria-label={labelValue}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>
    );

    expect(getByRole('dialog').getAttribute('aria-label')).toEqual(labelValue);
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const onEscapeKeyDownSpy = jest.fn();
    const { getByRole } = render(
      <Modal show keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });

    expect(onEscapeKeyDownSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  it('Should not call onEscapeKeyDown when keyboard is false', async () => {
    const onEscapeKeyDownSpy = jest.fn();
    const { getByRole } = render(
      <Modal show keyboard={false} onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>
    );

    fireEvent.keyDown(getByRole('dialog'), {
      keyCode: 27,
    });
    await waitFor(() => expect(onEscapeKeyDownSpy).not.toHaveBeenCalled());
    jest.clearAllMocks();
  });

  it('Should use custom props manager if specified', (done) => {
    class MyModalManager extends ModalManager {
      // @ts-ignore
      add() {
        done();
      }
    }

    const managerRef = React.createRef<ModalManager | null>();
    // @ts-ignore
    managerRef.current = new MyModalManager();

    render(
      <Modal show manager={managerRef.current as any}>
        <strong>Message</strong>
      </Modal>
    );
  });
});

import { mount } from 'enzyme';

describe('cleanup', () => {
  let offSpy: any;

  beforeEach(() => {
    offSpy = sinon.spy(window, 'removeEventListener');
  });

  afterEach(() => {
    offSpy.restore();
  });

  it('should remove resize listener when unmounted', () => {
    class Component extends React.Component {
      state = {
        show: true,
      };

      render() {
        if (!this.state.show) {
          return null;
        }

        return <Modal show>Foo</Modal>;
      }
    }

    const instance = mount(<Component />);
    instance.setState({ show: false });

    expect(offSpy.calledWith('resize')).toBe(true);
  });
});
