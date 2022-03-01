import { mount } from 'enzyme';
import * as React from 'react';

import { Modal } from '../../src/Modal';

describe('Modal.Footer', () => {
  it('uses "div" by default', () => {
    const wrapper = mount(
      <Modal.Footer className="custom-class">
        <strong>Content</strong>
      </Modal.Footer>,
    )
    expect(wrapper.find('div.modal-footer.custom-class strong')).toBeDefined()
  });

  it('should allow custom elements instead of "div"', () => {
   const wrapper = mount(<Modal.Footer as="section" />)
   expect(wrapper.find('section.modal-footer')).toBeDefined()
  });
});
