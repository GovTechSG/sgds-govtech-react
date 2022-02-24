import { render } from '@testing-library/react';
import ProgressBar from '../ProgressBar';
import { shouldWarn } from '../../utils/helpers.js';
import * as React from 'react';

describe('<ProgressBar>', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('Should output a progress bar with wrapper', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={0} />
    );
    const progressElem = getByTestId('test');
    const innerProgressElem = progressElem.children[0];
    expect(progressElem.classList).toContain('progress');
    expect(innerProgressElem.classList).toContain('progress-bar');
    expect(innerProgressElem).toHaveAttribute('role', 'progressbar');
  });

  ['success', 'warning', 'info', 'danger'].forEach((variant) => {
    it(`Should have the variant="${variant}" class`, () => {
      const { getByTestId } = render(
        <ProgressBar
          data-testid="test"
          min={0}
          max={10}
          now={0}
          variant={variant}
        />
      );
      const innerProgressElem = getByTestId('test').children[0];
      expect(innerProgressElem.classList).toContain(`bg-${variant}`);
    });
  });

  it('Should default to min:0, max:100', () => {
    const { getByTestId } = render(<ProgressBar data-testid="test" now={5} />);
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveAttribute('aria-valuemin', '0');
    expect(innerProgressElem).toHaveAttribute('aria-valuemax', '100');
  });

  it('Should have 0% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={0} />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveStyle('width: 0%');
  });

  it('Should have 10% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={1} />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveStyle('width: 10%');
  });

  it('Should have 100% computed width', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={10} />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveStyle('width: 100%');
  });

  it('Should have 50% computed width with non-zero min', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveStyle('width: 50%');
  });

  it('Should not have label', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={0} max={10} now={5} />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveTextContent('');
  });

  it('Should have label', () => {
    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        variant="success"
        label="progress bar label"
      />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem).toHaveTextContent('progress bar label');
  });

  it('Should have screen reader only label', () => {
    const { getByText, getByTestId, asFragment } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        visuallyHidden
        variant="success"
        label="progress bar label"
      />
    );
    expect(asFragment()).toMatchSnapshot();
    const innerProgressElem = getByTestId('test').firstChild;

    expect(getByText('progress bar label').classList).toContain(
      'visually-hidden'
    );
    expect(innerProgressElem).toHaveTextContent('progress bar label');
  });

  it('Should have a label that is a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    const { getByTestId } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
      />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem.children[0].classList).toContain('special-label');
  });

  it('Should have screen reader only label that wraps a React component', () => {
    const customLabel = <strong className="special-label">My label</strong>;

    const { getByRole, getByTestId, asFragment } = render(
      <ProgressBar
        data-testid="test"
        min={0}
        max={10}
        now={5}
        label={customLabel}
        visuallyHidden
      />
    );
    expect(asFragment()).toMatchSnapshot();
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem.children[0].classList).toContain(
      'visually-hidden'
    );
    expect(innerProgressElem.children[0].children[0].classList).toContain(
      'special-label'
    );
  });

  it('Should show striped bar', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} striped />
    );
    const innerProgressElem = getByTestId('test').children[0];
    innerProgressElem.classList.contains('progress-bar-striped');
  });

  it('Should show animated striped bar', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test" min={1} max={11} now={6} animated />
    );
    const innerProgressElem = getByTestId('test').children[0];
    expect(innerProgressElem.classList).toContain('progress-bar-striped');
    expect(innerProgressElem.classList).toContain('progress-bar-animated');
  });

  it('Should show stacked bars', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test">
        <ProgressBar key={1} now={50} />
        <ProgressBar key={2} now={30} />
      </ProgressBar>
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.children[0];
    const bar2 = innerProgressElem.lastChild;

    expect(bar1.classList).toContain('progress-bar');
    expect(bar1).toHaveStyle('width: 50%');

    expect(bar2.classList).toContain('progress-bar');
    expect(bar2).toHaveStyle('width: 30%');
  });

  it('Should render animated and striped children in stacked bar too', () => {
    const { getByTestId, asFragment } = render(
      <ProgressBar data-testid="test">
        <ProgressBar animated key={1} now={50} />
        <ProgressBar striped key={2} now={30} />
      </ProgressBar>
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.children[0];
    const bar2 = innerProgressElem.children[1];

    expect(asFragment()).toMatchSnapshot();

    //animated prop allows animated stripe without declaring striped
    expect(bar1.classList).toContain('progress-bar');
    expect(bar1.classList).toContain('progress-bar-striped');
    expect(bar1.classList).toContain('progress-bar-animated');

    //striped prop by itself should not contain animated
    expect(bar2.classList).toContain('progress-bar');
    expect(bar2.classList).toContain('progress-bar-striped');
    expect(bar2.classList).not.toContain('progress-bar-animated');
  });

  it('Should forward className and style to nested bars', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="test">
        <ProgressBar now={1} className="bar1" />
        <ProgressBar now={2} style={{ minWidth: 10 }} />
      </ProgressBar>
    );
    const innerProgressElem = getByTestId('test');

    const bar1 = innerProgressElem.firstChild;
    const bar2 = innerProgressElem.lastChild;

    expect(bar1.classList).toContain('progress-bar');
    expect(bar2).toHaveStyle('minWidth: 10px');
  });

  it('allows only ProgressBar in children', () => {
    shouldWarn('Failed prop');

    function NotProgressBar() {
      return null;
    }
    function NotProgressBar2() {
      return <div>asdf</div>;
    }

    const { asFragment, getByText } = render(
      <ProgressBar>
        <ProgressBar key={1} />
        <NotProgressBar />
        foo
        <NotProgressBar2 />
        <ProgressBar key={2} />
      </ProgressBar>
    );

    expect(asFragment()).toMatchSnapshot();
    // <NotProgressBar> component is not rendered as child, 3 instead of 4 children
    expect(getByText('foo').children.length).toEqual(3);
    expect(getByText('asdf')).not.toHaveAttribute('class', 'progress-bar');
  });
});
