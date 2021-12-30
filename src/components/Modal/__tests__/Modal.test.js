import { mount } from 'enzyme';
import * as React from 'react';
import ModalManager from '@restart/ui/ModalManager';
import { act } from 'react-dom/test-utils';
import Modal from '../Modal';
import sinon from 'sinon';

describe('<Modal>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  }); 
  it('Should forward ref to BaseModal', () => {
    const noOp = jest.fn();
    const ref = React.createRef();
    mount(
      <Modal show onHide={noOp} animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>
    );
    expect(ref.current.dialog).toBeDefined();
  });

  it('Should render the modal content', () => {
    const noOp = jest.fn();
    const wrapper = mount(
      <Modal show onHide={noOp} animation={false}>
        <strong>Message</strong>
      </Modal>
    );
    expect(wrapper.find('strong').text()).toEqual('Message');
    expect(wrapper.find('div.sgds')).toBeDefined();
  });

  it('Should sets `display: block` to `div.modal` when animation is false', () => {
    const node = mount(
      <Modal show animation={false}>
        <strong>Message</strong>
      </Modal>
    )
      .find('div.modal')
      .getDOMNode();
    expect(node.style.display).toEqual('block');
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    mount(
      <Modal show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    )
      .find('div.modal') // the modal-dialog element is pointer-events: none;
      .simulate('click');
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    mount(
      <Modal show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Modal>
    )
      .find('ModalDialog')
      .simulate('click');

    expect(onHideSpy.notCalled).toBe(true);
  });

  it('Should show "static" dialog animation when backdrop is clicked', () => {
    const noOp = jest.fn();
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static">
        <strong>Message</strong>
      </Modal>
    );

    const modal = wrapper.find('.modal');
    modal.simulate('click');

    expect(wrapper.find('.modal-static').length).toEqual(1);
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', async() => {
    const noOp = jest.fn();
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>
    );
    const waitForComponentToPaint = async (wrapper) => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve));
        const event = new KeyboardEvent('keydown', { keyCode: 27 }); 
        document.dispatchEvent(event);
        wrapper.update();
      });
    };
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.modal-static').length).toEqual(1);  
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', async() => {
    const noOp = jest.fn() 
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>,
    );

    const waitForComponentToPaint = async (wrapper) => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve));
        const event = new KeyboardEvent('keydown', { keyCode: 27 }); 
        document.dispatchEvent(event);
        wrapper.update();
      });
    };
    await waitForComponentToPaint(wrapper); 

    expect(wrapper.find('.modal-static').length).toEqual(0);
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', () => {
    const noOp = () => {};
    const wrapper = mount(
      <Modal show onHide={noOp} backdrop>
        <strong>Message</strong>
      </Modal>,
    );

    const modal = wrapper.find('.modal');
    modal.simulate('click');

    expect(wrapper.find('.modal-static').length).toEqual(0);
  });

  it('Should close the modal when the modal close button is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    mount(
      <Modal show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>,
    )
      .find('.btn-close')
      .simulate('click');
  });

  it('Should pass className to the dialog', () => {
    const noOp = () => {};
   const wrapper = mount(
      <Modal show className="mymodal" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('div.modal.mymodal')).toEqual(true)
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = jest.fn()

    const wrapper = mount(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-backdrop.my-modal-backdrop')).toBe(true)
  });

  it('Should pass size to the dialog', () => {
    const noOp = jest.fn()
    const wrapper = mount(
      <Modal show size="sm" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-dialog.modal-sm')).toBe(true)
  });

  it('Should pass fullscreen as bool to the dialog', () => {
    const wrapper = mount(
      <Modal show fullscreen>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-dialog.modal-fullscreen')).toBe(true)
  });

  it('Should pass fullscreen as string to the dialog', () => {
   const wrapper =  mount(
      <Modal show fullscreen="sm-down">
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-dialog.modal-fullscreen-sm-down')).toBe(true)

  });

  it('Should pass centered to the dialog', () => {
    const noOp = jest.fn()
   const wrapper = mount(
      <Modal show centered onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-dialog.modal-dialog-centered')).toBe(true)
  });

  it('Should pass scrollable to the dialog', () => {
    const noOp = jest.fn()
   const wrapper= mount(
      <Modal show scrollable onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )

    expect(wrapper.exists('.modal-dialog.modal-dialog-scrollable')).toBe(true)
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = jest.fn()
    const dialog = mount(
      <Modal show style={{ color: 'red' }} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('div.modal')
      .getDOMNode();
    expect(dialog.style.color).toEqual('red')
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = jest.fn()
    const wrapper = mount(
      <Modal show dialogClassName="my-dialog" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-dialog.my-dialog')).toBe(true)
  });

  it('Should pass contentClassName to .modal-content', () => {
    const noOp = jest.fn()
    const wrapper =  mount(
      <Modal show contentClassName="my-content" onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.modal-content.my-content')).toBe(true)

  });

  it('Should use dialogAs', () => {
    const noOp = jest.fn()

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

   const wrapper = mount(
      <Modal show dialogAs={CustomDialog} onHide={noOp}>
        <strong>Message</strong>
      </Modal>,
    )
    expect(wrapper.exists('.custom-dialog')).toBe(true)

  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();

    const instance = mount(
      <Modal
        show
        onHide={() => {}}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(increment.callCount).toEqual(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          instance.setProps({ show: false });
        }}
      >
        <strong>Message</strong>
      </Modal>,
    );
  });

  it('should call `transitionend` before `exited`', (done) => {
    const increment = sinon.spy();
    let modal;

    const instance = mount(
      <Modal
        show
        style={{ transition: 'opacity 1s linear' }}
        onExited={() => {
          expect(increment.callCount).toEqual(1);
          modal.removeEventListener('transitionend', increment);
          done();
        }}
      >
        <strong>Message</strong>
      </Modal>,
    );
    modal = instance.find('.modal').getDOMNode();
    modal.addEventListener('transitionend', increment);
    instance.setProps({ show: false });
  });

  describe('cleanup', () => {
    let offSpy;

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

  it('Should close once it was clicked outside of the Modal', () => {
    const onHideSpy = sinon.spy();
    mount(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    )
      .find('div.modal.show')
      .simulate('click');

    expect(onHideSpy.called).toBe(true)
  });

  it('Should not call onHide if the click target comes from inside the dialog', () => {
    const onHideSpy = sinon.spy();
    const wrapper = mount(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    wrapper.find('div.modal-dialog').simulate('mouseDown');
    wrapper.find('div.modal.show').simulate('mouseUp');
    wrapper.find('div.modal.show').simulate('click');

    expect(onHideSpy.notCalled).toBe(true)
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    const noOp = jest.fn()
    const wrapper = mount(
      <Modal show onHide={noOp} aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );
    expect(wrapper.exists(
      'div.modal.show[role="dialog"][aria-labelledby="modal-title"]',
    )).toBe(true);
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const noOp = jest.fn()
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Modal show onHide={noOp} keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onEscapeKeyDownSpy.called).toBe(true);
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const noOp = jest.fn()
    const onEscapeKeyDownSpy = sinon.spy();
    mount(
      <Modal
        show
        onHide={noOp}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Modal>,
    );

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onEscapeKeyDownSpy.notCalled).toBe(true)
  });

  it('Should use custom props manager if specified', (done) => {
    const noOp = jest.fn()

    class MyModalManager extends ModalManager {
      add() {
        done();
      }
    }

    const managerRef = React.createRef();
    managerRef.current = new MyModalManager();

    mount(
      <Modal show onHide={noOp} manager={managerRef.current}>
        <strong>Message</strong>
      </Modal>,
    );
  });
});
