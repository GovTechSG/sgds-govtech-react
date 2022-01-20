import PropTypes from 'prop-types';
import * as React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import sinon from 'sinon';
import OverlayTrigger from '../OverlayTrigger';
import Popover from '../../Popover/Popover';
import TooltipBox from '../../Tooltip/TooltipBox';
 
describe('<OverlayTrigger>', () => {
  // Swallow extra props.
  const TemplateDiv = React.forwardRef(
    ({ className = '', children }: any, ref: any) => (
      <div
        ref={ref}
        className={className}
        role="tooltip"
        id="test-tooltip"
        data-testid="test-overlay"
      >
        {children}
      </div>
    )
  );

  it('should not throw an error with StrictMode', () => {
    const { getByTestId } = render(
      <React.StrictMode>
        <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
          <button type="button" data-testid="test-button">
            button
          </button>
        </OverlayTrigger>
      </React.StrictMode>
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
  });

  it('Should render OverlayTrigger element', () => {
    const { getByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    const buttonElem = getByTestId('test-button');
    expect(buttonElem).toBeDefined();
  });

  it('Should show after click trigger', async () => {
    const { queryByTestId, getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).toBeNull();

    fireEvent.click(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    await waitFor(() => expect(overlayElem).not.toBeNull());
  });

  it('Should accept a function as an overlay render prop', () => {
    const overlay = () => <TemplateDiv />;
    const { queryByTestId, getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={overlay}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).toBeNull();

    fireEvent.click(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();
  });

  it('Should show the tooltip when transitions are disabled', () => {
    const overlay = ({ className }: any) => (
      <TemplateDiv className={`${className} test`} />
    );
    const { getByTestId, queryByTestId } = render(
      <OverlayTrigger
        transition={false}
        trigger={['hover', 'focus']}
        overlay={overlay}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    let overlayElem = queryByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem).toBeNull();

    fireEvent.focus(buttonElem);

    overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();

    expect(overlayElem!.classList).toContain('show');
  });

  it('Should call OverlayTrigger onClick prop to child', async () => {
    const callback = jest.fn();

    const { getByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv>test</TemplateDiv>} trigger="click">
        <button type="button" onClick={callback} data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
    await waitFor(() => expect(callback).toHaveBeenCalled());
  });

  it('Should be controllable', async () => {
    const callback = jest.fn();

    const { getByTestId } = render(
      <OverlayTrigger
        show
        trigger="click"
        onToggle={callback}
        overlay={<TemplateDiv className="test" />}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    const overlayElem = getByTestId('test-overlay');
    const buttonElem = getByTestId('test-button');

    expect(overlayElem.classList).toContain('show');
    fireEvent.click(buttonElem);

    await waitFor(() => {
      expect(callback).toBeCalledTimes(1);
      expect(callback).toBeCalledWith(false);
    });
  });

  it('Should show after mouseover trigger', async (done) => {
    const clock = sinon.useFakeTimers();

    const { getByTestId, queryByTestId } = render(
      <OverlayTrigger overlay={<TemplateDiv />}>
        <span data-testid="test-hover">hover me</span>
      </OverlayTrigger>
    );
    let overlayElem = queryByTestId('test-overlay');
    const hoverElem = getByTestId('test-hover');

    expect(overlayElem).toBeNull();

    fireEvent.mouseOver(hoverElem);

    overlayElem = queryByTestId('test-overlay');
    await waitFor(() => expect(overlayElem).not.toBeNull());

    fireEvent.mouseOut(hoverElem);

    clock.tick(50);

    overlayElem = queryByTestId('test-overlay');
    await waitFor(() => expect(overlayElem).toBeNull());

    clock.restore();
    done();
  });

  it('Should not set aria-describedby if the state is not show', () => {
    const { getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    const buttonElem = getByTestId('test-button');

    expect(buttonElem.getAttribute('aria-describedby')).toBeNull();
  });

  it('Should set aria-describedby for tooltips if the state is show', async(done) => {
    const { getByTestId } = render(
      <OverlayTrigger trigger="click" overlay={<TemplateDiv />}>
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    let buttonElem = getByTestId('test-button');

    fireEvent.click(buttonElem);
    buttonElem = getByTestId('test-button');

    // aria-describedby gets assigned after a slight delay
    await waitFor(()=> {
        expect(buttonElem.getAttribute('aria-describedby')).toEqual(
          'test-tooltip'
        );
        done();
    })
 
  });

  describe('trigger handlers', () => {
    it('Should keep trigger handlers', (done) => {
      const { getByTestId } = render(
        <div>
          <OverlayTrigger
            trigger="click"
            overlay={<TemplateDiv>test</TemplateDiv>}
          >
            <button
              type="button"
              data-testid="test-button"
              onClick={() => done()}
            >
              button
            </button>
          </OverlayTrigger>
          <input id="target" />
        </div>
      );
      const buttonElem = getByTestId('test-button');
      fireEvent.click(buttonElem);
    });
  });

  it('Should maintain overlay classname', () => {
    const { getByTestId, queryByTestId } = render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv className="test-overlay">test</TemplateDiv>}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);

    const overlayElem = queryByTestId('test-overlay');
    expect(overlayElem).not.toBeNull();
    expect(overlayElem!.classList).toContain('test-overlay');
  });

  it('Should pass transition callbacks to Transition', (done) => {
    const increment = sinon.spy();

    const { getByTestId } = render(
      <OverlayTrigger
        trigger="click"
        overlay={<TemplateDiv>test</TemplateDiv>}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(increment.callCount).toEqual(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);
        }}
      >
        <button type="button" data-testid="test-button">
          button
        </button>
      </OverlayTrigger>
    );

    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
  });

  it('Should forward requested context', async() => {
    const contextTypes = {
      key: PropTypes.string,
    };

    const contextSpy = jest.fn();

    class ContextReader extends React.Component {
      static contextTypes = contextTypes;

      render() {
        contextSpy(this.context.key);
        return <div />;
      }
    }

    class ContextHolder extends React.Component {
      static childContextTypes = contextTypes;

      getChildContext() {
        return { key: 'value' };
      }

      render() {
        return (
          <OverlayTrigger trigger="click" overlay={<ContextReader />}>
            <button type="button" data-testid="test-button">
              button
            </button>
          </OverlayTrigger>
        );
      }
    }

    const { getByTestId } = render(<ContextHolder />);
    const buttonElem = getByTestId('test-button');
    fireEvent.click(buttonElem);
    await waitFor(()=> expect(contextSpy).toBeCalledWith('value'))
    
  });

  describe('overlay types', () => {
    [
      {
        name: 'Popover',
        overlay: <Popover id="test-popover">test</Popover>,
      },
      {
        name: 'Tooltip',
        overlay: <TooltipBox id="test-tooltip">test</TooltipBox>,
      },
    ].forEach((testCase) => {
      describe(testCase.name, () => {
        it('Should handle trigger without warnings', async(done) => {
          const { getByTestId } = render(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button type="button" data-testid="test-button">
                button
              </button>
            </OverlayTrigger>
          );
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);

          // The use of Popper means that errors above will show up
          //  asynchronously.
          await waitFor(()=>  setTimeout(done, 10))
         
        });
      });
    });
  });

  describe('rootClose', () => {
    [
      {
        label: 'true',
        rootClose: true,
        shownAfterClick: false,
      },
      {
        label: 'default (false)',
        rootClose: undefined,
        shownAfterClick: true,
      },
    ].forEach((testCase) => {
      describe(testCase.label, () => {
        it('Should have correct show state', async() => {
          const { getByTestId } = render(
            <OverlayTrigger
              overlay={<TemplateDiv>test</TemplateDiv>}
              trigger="click"
              rootClose={testCase.rootClose}
            >
              <button type="button" data-testid="test-button">
                button
              </button>
            </OverlayTrigger>
          );
          const buttonElem = getByTestId('test-button');
          fireEvent.click(buttonElem);
          const overlayElem = getByTestId('test-overlay');
          expect(overlayElem.classList).toContain('show');

          // Need to click this way for it to propagate to document element.
          await act(async () => {
            document.documentElement.click();
            expect(overlayElem.classList).toContain('show');
          });
        });
      });
    });

    describe('clicking on trigger to hide', () => {
      it('should hide after clicking on trigger', () => {
        const { getByTestId } = render(
          <OverlayTrigger
            overlay={<TemplateDiv>test</TemplateDiv>}
            trigger="click"
            rootClose
          >
            <button type="button" data-testid="test-button">
              button
            </button>
          </OverlayTrigger>
        );
        const buttonElem = getByTestId('test-button');
        fireEvent.click(buttonElem);

        let overlayElem = getByTestId('test-overlay');
        expect(overlayElem.classList).toContain('show');

        // Need to click this way for it to propagate to document element.
        fireEvent.click(buttonElem);
        overlayElem = getByTestId('test-overlay');
        expect(overlayElem.classList).not.toContain('show');
      });
    });

    describe('replaced overlay', () => {
      it('Should still be shown', () => {
        const ReplacedOverlay = React.forwardRef(
          ({ className = '' }: any, ref: any) => {
            const [state, setState] = React.useState(false);
            const handleClick = () => {
              setState(true);
            };

            if (state) {
              return (
                <div
                  data-testid="test-replaced"
                  className={className}
                  ref={ref}
                >
                  replaced
                </div>
              );
            }

            return (
              <div>
                <a
                  id="replace-overlay"
                  onClick={handleClick}
                  data-testid="test-not-replaced"
                  className={className}
                  ref={ref}
                >
                  original
                </a>
              </div>
            );
          }
        );

        const { getByTestId } = render(
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
            trigger="click"
            rootClose
          >
            <button type="button" data-testid="test-button">
              button
            </button>
          </OverlayTrigger>
        );
        const buttonElem = getByTestId('test-button');
        fireEvent.click(buttonElem);

        const toBeReplacedElem = getByTestId('test-not-replaced');
        fireEvent.click(toBeReplacedElem);

        const replacedElem = getByTestId('test-replaced');
        expect(replacedElem.classList).toContain('show');
      });
    });
  });
});
