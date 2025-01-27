import { render } from '@testing-library/react';
import * as React from 'react';
import { Popover } from '../../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    const { getByTestId } = render(
      <Popover data-testid="test" id="test-popover">
        <Popover.Header>Popover title</Popover.Header>
        <Popover.Body>
          <strong>Popover Content</strong>
        </Popover.Body>
      </Popover>
    ); 
    const popoverElem = getByTestId('test');
    const popoverFirstElem = popoverElem.children[0]!;
    const popoverSecondElem = popoverElem.children[1]!;

    expect(popoverElem.getAttribute('x-placement')).toEqual('right');
    expect(popoverElem.getAttribute('role')).toEqual('tooltip');
    expect(popoverElem.classList).toContain('popover');
    expect(popoverElem.classList).toContain('bs-popover-end');

    expect(popoverFirstElem.classList).toContain('popover-header'); 
    expect(popoverSecondElem.classList).toContain('popover-body');
  });
});
