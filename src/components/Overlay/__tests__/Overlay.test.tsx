import * as React from 'react';
import {  render, waitFor } from '@testing-library/react';
import Overlay from '../Overlay';
import Popover from '../../Popover/Popover';

describe('<Overlay>', () => {
  it('should forward ref to the overlay', () => {
    const ref = React.createRef<any>();
    waitFor(() => {
      render(
        <Overlay ref={ref} show target={ref.current}>
          <Popover id="my-overlay">test</Popover>
        </Overlay>,
      );
      
    })
    expect(ref.current.id).toEqual('my-overlay');
  });

  it('should use Fade internally if transition=true', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <Overlay show transition ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = getByTestId('test');
    expect(popoverElem.classList).toContain('fade')
  });

  it('should not use Fade if transition=false', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <Overlay show transition={false} ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = getByTestId('test');
    expect(popoverElem.classList).not.toContain('fade')
  });
});
