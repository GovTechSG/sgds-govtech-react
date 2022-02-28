import { mount } from 'enzyme';
import * as React from 'react';
import { CloseButton } from '../../src/CloseButton'
import { Modal } from '../../src/Modal';
import sinon from "sinon";

describe('Modal.Header', () => {
  it('uses "div" by default', () => {
    const wrapper = mount(
      <Modal.Header className="custom-class">
        <strong>Content</strong>
      </Modal.Header>,
    )
    expect(wrapper.find('div.modal-header.custom-class>strong')).toBeDefined();
  });

  it('has closeButton without a containing Modal and renders', () => {
    const wrapper = mount(<Modal.Header closeButton />)
    expect(wrapper.find('button')).toBeDefined()
  });

  it('Should trigger onHide when modal is closed', () => {
    const onHideSpy = sinon.spy();
     mount(<Modal.Header closeButton onHide={onHideSpy} />)
      .find('button')
      .simulate('click');

    expect(onHideSpy.called).toBe(true)
  });

  it('should render close button variant', () => {
    const wrapper = mount(<Modal.Header closeButton closeVariant="white" />);
    expect(wrapper.find(CloseButton).props()).toMatchObject({variant: 'white'})
  });
});
