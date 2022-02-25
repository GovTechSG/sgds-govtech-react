import { render } from '@testing-library/react';
import ToastContainer, { ToastPosition } from '../../components/Toast/ToastContainer';
import * as React from 'react';

const expectedClasses: Record<ToastPosition, Array<string>> = {
  'top-start': ['position-absolute', 'top-0', 'start-0'],
  'top-center': [
    'position-absolute',
    'top-0',
    'start-50',
    'translate-middle-x',
  ],
  'top-end': ['position-absolute', 'top-0', 'end-0'],
  'middle-start': [
    'position-absolute',
    'top-50',
    'start-0',
    'translate-middle-y',
  ],
  'middle-center': [
    'position-absolute',
    'top-50',
    'start-50',
    'translate-middle',
  ],
  'middle-end': ['position-absolute', 'top-50', 'end-0', 'translate-middle-y'],
  'bottom-start': ['position-absolute', 'bottom-0', 'start-0'],
  'bottom-center': [
    'position-absolute',
    'bottom-0',
    'start-50',
    'translate-middle-x',
  ],
  'bottom-end': ['position-absolute', 'bottom-0', 'end-0'],
};

describe('ToastContainer', () => {
  it('should render a basic toast container', () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstElementChild!.classList).toContain('toast-container')
  });
  const positionArray = Object.keys(expectedClasses)
  positionArray.forEach((position: string) => {
    it(`should render position=${position}`, () => {
      const positon = position as ToastPosition
      const { container } = render(<ToastContainer position={positon} />);
      expectedClasses[positon].map(
        (className) =>
          expect(container.firstElementChild!.classList).toContain(className)
      );
    });
  });
});
