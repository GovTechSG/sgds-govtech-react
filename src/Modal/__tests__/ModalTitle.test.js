import { mount } from 'enzyme';
import * as React from 'react';

import Modal from '../Modal';

describe('Modal.Title', () => {
  it('uses "div" by default', () => {
    const wrapper = mount(
      <Modal.Title className="custom-class">
        <strong>Content</strong>
      </Modal.Title>,
    )
    expect(wrapper.find('div.h4.modal-title.custom-class>strong')).toBeDefined()
  });

  it('should allow custom elements instead of "div"', () => {
    const wrapper = mount(<Modal.Title as="h4" />)
    expect(wrapper.find('h4.modal-title')).toBeDefined()
  });
});
