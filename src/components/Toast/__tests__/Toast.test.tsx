import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import Toast from '../Toast';

const getToast = ({
  delay = 500,
  onCloseSpy = jest.fn(),
  autohide = true,
  show = true,
}) => (
  <Toast delay={delay} onClose={onCloseSpy} show={show} autohide={autohide}>
    <Toast.Header>header-content</Toast.Header>
    <Toast.Body>body-content</Toast.Body>
  </Toast>
);

describe('<Toast>', () => {
  let clock: typeof jest;

  beforeEach(() => {
    clock = jest.useFakeTimers()
  });

  afterEach(() => {
    clock = jest.useRealTimers()
  });

  it('should apply bg prop', () => {
    const { container } = render(<Toast bg="primary">Card</Toast>);
    expect(container.firstElementChild!.classList).toContain('bg-primary');
    expect(container.firstElementChild!.classList).toContain('toast')
  });

  it('should have .sgds class by default ', () => {
    const { container } = render(<Toast>Card</Toast>);
    expect(container.firstElementChild!.classList).toContain('sgds')
  })

  it('isSGDS prop false should remove .sgds selector', () => {
    const { container, rerender } = render(<Toast>Card</Toast>);
    expect(container.firstElementChild!.classList).toContain('sgds')
    rerender(<Toast isSGDS={false}>Card</Toast>)
    expect(container.firstElementChild!.classList).not.toContain('sgds')

  })
  it('when status defined, should reflect in class', () => {
    const { container, rerender } = render(<Toast>Card</Toast>);
    expect(container.firstElementChild!.classList).not.toContain('danger')
    expect(container.firstElementChild!.classList).not.toContain('sucess')
    expect(container.firstElementChild!.classList).not.toContain('warning')
    rerender(<Toast status="warning">Card</Toast>)
    expect(container.firstElementChild!.classList).toContain('warning')

    rerender(<Toast status="danger">Card</Toast>)
    expect(container.firstElementChild!.classList).toContain('danger')
    rerender(<Toast status="success">Card</Toast>)
    expect(container.firstElementChild!.classList).toContain('success')


  })
  it('should render an entire toast', () => {
    const { container } = render(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    ['fade', 'toast', 'show'].map(
      (className) =>
        expect(container.firstElementChild!.classList).toContain(className)
    );
    (
      [
        ['role', 'alert'],
        ['aria-live', 'assertive'],
        ['aria-atomic', true],
      ] as const
    ).map(
      ([attrName, attrVal]) =>
        (
          expect(container.firstElementChild).toHaveAttribute(attrName, `${attrVal}`)
        )
    );
  });

  it('should render without transition if animation is false', () => {
    const { container } = render(
      <Toast animation={false}>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['toast', 'show'].map(
      (className) =>
        expect(container.firstElementChild!.classList).toContain(className)
    );
  });

  it('should trigger the onClose event after clicking on the close button', () => {
    const onCloseSpy = jest.fn();

    const { container } = render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    fireEvent.click(
      container.firstElementChild!.getElementsByTagName('button')[0],
    );
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  });

  it('should trigger the onClose event after the autohide delay', () => {
    const onCloseSpy = jest.fn();
    render(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  });

  it('should not trigger the onClose event if autohide is not set', () => {
    const onCloseSpy =  jest.fn();
    render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(3000);
    expect(onCloseSpy).not.toHaveBeenCalled()
  });

  it('should clearTimeout after unmount', () => {
    const onCloseSpy =  jest.fn();
    const { unmount } = render(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    unmount();
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).not.toHaveBeenCalled()
  });

  it('should not reset autohide timer when element re-renders with same props', () => {
    const onCloseSpy = jest.fn();
    const toast = getToast({ onCloseSpy });
    const { rerender } = render(toast);

    clock.advanceTimersByTime(250);

    // Trigger render with no props changes.
    rerender(toast);

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  });

  it('should not reset autohide timer when delay is changed', () => {
    const onCloseSpy =  jest.fn();
    const { rerender } = render(getToast({ delay: 500, onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ delay: 10000, onCloseSpy }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  });

  it('should not reset autohide timer when onClosed is changed', () => {
    const onCloseSpy =  jest.fn();
    const onCloseSpy2 =  jest.fn();

    const { rerender } = render(getToast({ onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy: onCloseSpy2 }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled()
    expect(onCloseSpy2).toHaveBeenCalledTimes(1)
  });

  it('should not call onClose if autohide is changed from true to false', () => {
    const onCloseSpy =  jest.fn();
    const { rerender } = render(getToast({ onCloseSpy, autohide: true }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy, autohide: false }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled()
  });

  it('should not call onClose if show is changed from true to false', () => {
    const onCloseSpy =  jest.fn();
    const { rerender } = render(getToast({ show: true, onCloseSpy }));
    clock.advanceTimersByTime(100);

    rerender(getToast({ show: false, onCloseSpy }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled()
  });

  it('should render with bsPrefix', () => {
    const { container } = render(
      <Toast bsPrefix="my-toast">
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    expect(container.firstElementChild!.tagName.toLowerCase()).toEqual('div');
    expect(container.firstElementChild!.classList).toContain('my-toast');
  });
});
