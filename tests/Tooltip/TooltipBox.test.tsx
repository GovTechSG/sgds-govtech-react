import { render } from '@testing-library/react';
import  { TooltipBox } from '../../src/Tooltip';
import * as React from 'react';

describe('TooltipBox', () => {
  it('Should output a tooltip with content', () => {
    const { getByTestId } = render(
      <TooltipBox data-testid="test-tooltip-box" placement="right">
        <strong>Tooltip Content</strong>
      </TooltipBox>
    );

    expect(getByTestId('test-tooltip-box').classList).toContain('tooltip');
    expect(getByTestId('test-tooltip-box').classList).toContain('bs-tooltip-end');
    expect(getByTestId('test-tooltip-box').classList).toContain('sgds');

    expect(getByTestId('test-tooltip-box').getAttribute('x-placement')).toEqual(
      'right'
    );
  });
});
 