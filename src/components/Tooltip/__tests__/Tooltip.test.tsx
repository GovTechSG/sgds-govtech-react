import { render } from '@testing-library/react';
import Tooltip from '../Tooltip';
import * as React from 'react';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    const { getByTestId } = render(
      <Tooltip data-testid="test-tooltip" placement="right">
        <strong>Tooltip Content</strong>
      </Tooltip>
    );

    expect(getByTestId('test-tooltip').classList).toContain('tooltip');
    expect(getByTestId('test-tooltip').classList).toContain('bs-tooltip-end');

    expect(getByTestId('test-tooltip').getAttribute('x-placement')).toEqual(
      'right'
    );
  });
});
