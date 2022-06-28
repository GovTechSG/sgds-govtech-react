import * as React from 'react';
import { render } from '@testing-library/react';

import { Modal } from '../../src/Modal';

describe('Modal.Title', () => {
  it('uses "div" by default', () => {
    const { getByTestId } = render(
      <Modal.Title data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </Modal.Title>
    );

    const elem = getByTestId('test-modal');
    expect(elem.tagName.toLowerCase()).toEqual('h3');
    expect(elem.classList).toContain('modal-title');
    expect(elem.classList).toContain('custom-class');
    expect(elem.querySelector('strong')!.textContent).toEqual('Content');
  });

  it('should allow custom elements instead of "div"', () => {
    const { getByTestId } = render(
      <Modal.Title data-testid="test-modal" as="h4">
        <strong>Content</strong>
      </Modal.Title>
    );

    expect(getByTestId('test-modal').classList).toContain('modal-title');
    expect(getByTestId('test-modal').tagName.toLowerCase()).toEqual('h4');
  });
});
