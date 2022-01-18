import { render } from '@testing-library/react';
import TooltipBox from '../TooltipBox';
import * as React from 'react';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    const { getByTestId } = render(
      <TooltipBox data-testid="test-tooltip" placement="right">
        <strong>Tooltip Content</strong>
      </TooltipBox>
    );

    expect(getByTestId('test-tooltip').classList).toContain('tooltip');
    expect(getByTestId('test-tooltip').classList).toContain('bs-tooltip-end');

    expect(getByTestId('test-tooltip').getAttribute('x-placement')).toEqual(
      'right'
    );
  });
});
