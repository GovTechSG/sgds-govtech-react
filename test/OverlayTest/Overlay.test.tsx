import * as React from 'react';
import {  render, waitFor } from '@testing-library/react';
import Overlay from '../../src/components/Overlay/Overlay';
import TooltipBox from '../../src/components/Tooltip/TooltipBox' 

describe('<Overlay>', () => {
  it('should forward ref to the overlay', () => {
    const ref = React.createRef<any>();
    waitFor(() => {
      render(
        <Overlay ref={ref} show target={ref.current}>
          <TooltipBox id="my-overlay">test</TooltipBox>
        </Overlay>,
      );
      
    })
    expect(ref.current.id).toEqual('my-overlay');
  });

  it('should use Fade internally if transition=true', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <Overlay show transition ref={ref} target={ref.current}>
        <TooltipBox id="my-overlay" data-testid="test">
          test
        </TooltipBox>
      </Overlay>,
    );
    const popoverElem = getByTestId('test');
    expect(popoverElem.classList).toContain('fade')
  });

  it('should not use Fade if transition=false', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <Overlay show transition={false} ref={ref} target={ref.current}>
        <TooltipBox id="my-overlay" data-testid="test">
          test
        </TooltipBox>
      </Overlay>,
    );
    const popoverElem = getByTestId('test');
    expect(popoverElem.classList).not.toContain('fade')
  });
});
