import { mount } from 'enzyme';
import * as React from 'react';

import Modal from '../../src/components/Modal/Modal';

describe('Modal.Body', () => {
  it('uses "div" by default', () => {
   const wrapper = mount(
      <Modal.Body className="custom-class">
        <strong>Content</strong>
      </Modal.Body>,
    )
    expect(wrapper.find('div.modal-body.custom-class strong')).toBeDefined()
  });

  it('should allow custom elements instead of "div"', () => {
    const wrapper = 
    mount(<Modal.Body as="section" />)
    expect(wrapper.find('section.modal-body')).toBeDefined()
  });
});
