import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Tooltip } from '../../src/Tooltip';
import * as React from 'react';
import Button from '../../src/Button/Button';

describe('Tooltip', () => {
  it('default Tooltip should appear on hover', async () => {
    const { container } = render(
      <Tooltip content="default tooltip">
        <button>Tooltip Content</button>
      </Tooltip>
    );
    const $button = container.querySelector('button');
    expect($button).toBeDefined();
    expect(screen.queryByText('default tooltip')).toBeNull();
    fireEvent.mouseOver($button as HTMLButtonElement);
    await waitFor(() => {
      expect(screen.queryByText('default tooltip')).not.toBeNull();
      expect(screen.queryByRole('tooltip')?.classList).toContain(
        'bs-tooltip-top'
      );
    });
  });

  it('change placement prop value should change bs-tooltip-xx class', async () => {
    const { container } = render(
      <Tooltip content="default tooltip" placement="bottom">
        <button>Tooltip Content</button>
      </Tooltip>
    );
    const $button = container.querySelector('button');

    fireEvent.mouseOver($button as HTMLButtonElement);
    const $tooltip = screen.queryByRole('tooltip');
    await waitFor(() =>
      expect($tooltip?.classList).toContain('bs-tooltip-bottom')
    );
  });

  it('clickable tooltip should not be hoverable', async () => {
    const { container } = render(
      <Tooltip content="default tooltip" type="click">
        <button>Tooltip Content</button>
      </Tooltip>
    );
    const $button = container.querySelectorAll('button')[0];
    // hover should not open tooltip
    fireEvent.mouseOver($button as HTMLButtonElement);
    await waitFor(() => {
      expect(screen.queryByText('default tooltip')).toBeNull();
    });

    // click should open tooltip
    fireEvent.click($button as HTMLButtonElement);
    await waitFor(() => {
      expect(screen.queryByText('default tooltip')).not.toBeNull();
    });

    // close tooltip by clicking on target element
    fireEvent.click($button as HTMLButtonElement);
    await waitForElementToBeRemoved(screen.queryByText('default tooltip'));
    expect(screen.queryByText('default tooltip')).toBeNull();

    // open tooltip again
    fireEvent.click($button as HTMLButtonElement);
    await waitFor(() =>
      expect(screen.queryByText('default tooltip')).not.toBeNull()
    );

    // clicking can close tooltip
    fireEvent.click(document);
    await waitFor(() =>
      expect(screen.queryByText('default tooltip')).toBeNull()
    );
  });

  it('accepts a Component', () => {
    const { container } = render(
      <Tooltip content="default tooltip">
        <Button>Tooltip Content</Button>
      </Tooltip>
    );
    const $Button = container.querySelector('.btn');
    expect($Button).toBeDefined();
  });
  // it('content prop accepts a jsx.element', () => {
  //   const content = <div>Testing</div>;
  //   const { queryByText } = render(
  //     <Tooltip content={content}>
  //       <Button>Tooltip Content</Button>
  //     </Tooltip>
  //   );
  //   waitFor(() => {
  //     expect(queryByText('Testing')).not.toBeNull();
  //     expect(queryByText('Testing')?.tagName).toEqual('DIV');
  //   });
  // });
});
