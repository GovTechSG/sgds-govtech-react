import {
   fireEvent,
   render,
   waitFor,
} from '@testing-library/react';
import { Button } from '../../src/Button';
import { Alert } from '../../src/Alert';
import { Stepper } from '../../src/Stepper';
import { useStep , OnDone } from '../../src/Stepper';
import * as React from 'react';

const MinimalMockStepper = () => {
  const minimalStepMethods = useStep([
    {
      component: 'At Step 1',
      title: 'Step 1',
      stepHeader: 'First Step',
    },
    {
      component: 'At Step 2',
      title: 'Step 2',
      stepHeader: 'Second Step',
    },
    {
      component: 'At Step 3',
      title: 'Create project',
      stepHeader: 'Third Step',
    },
  ]);

  return <Stepper methods={minimalStepMethods} />;
};
interface MockProps {
  onNextMock: VoidFunction;
  onPreviousMock: VoidFunction;
  onArrivedMock: VoidFunction;
}
const InteractiveMockStepper = ({
  onNextMock,
  onPreviousMock,
  onArrivedMock,
}: MockProps) => {
  const stepMethods = useStep([
    {
      component: 'At Step 1',
      title: 'Step 1',
      stepHeader: 'First Step',
      onNextStep: async (onDone: OnDone) => {
        onNextMock();
        onDone();
      },
      onPreviousStep: async (onDone: OnDone) => {
        onPreviousMock();
        onDone();
      },
      onArrived: async () => {
        onArrivedMock();
      },
    },
    {
      component: 'At Step 2',
      title: 'Step 2',
      stepHeader: 'Second Step',
      onNextStep: async (onDone: OnDone) => {
        onNextMock();
        onDone();
      },
      onPreviousStep: async (onDone: OnDone) => {
        onPreviousMock();
        onDone();
      },
      onArrived: async () => {
        onArrivedMock();
      },
    },
    {
      component: <Alert>At Step 3</Alert>,
      title: 'Create project',
      stepHeader: 'Third Step',
      onNextStep: async () => {
        onNextMock();
      },
      onPreviousStep: async (onDone: OnDone) => {
        onPreviousMock();
        onDone();
      },
      onArrived: async () => {
        onArrivedMock();
      },
    },
  ]);
  const {
    state: stepState,
    getTitle,
    setStep,
    nextStep,
    prevStep,
    getNextButtonTitle,
    getBackButtonTitle,
    getComponent,
    reset,
  } = stepMethods;
  return (
    <>
      <Stepper methods={stepMethods} />
      <div>{getComponent()}</div>
      <h3>{getTitle()}</h3>
      <p>currentStep: {stepState.currentStep} </p>
      {getBackButtonTitle() && (
        <Button onClick={prevStep} variant="danger">
          {getBackButtonTitle()}
        </Button>
      )}
      <Button onClick={nextStep}> {getNextButtonTitle()}</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={() => setStep(3)} variant="warning">
        Jump to last page
      </Button>
    </>
  );
};

describe('Stepper', () => {
  it('default html structure, with minimal required stepMethods', () => {
    const { container, asFragment, getByText } = render(<MinimalMockStepper />);

    //outer div
    expect(container.tagName).toEqual('DIV');
    const $outerDiv = container.querySelectorAll('div')[0];
    expect($outerDiv.classList).toContain('sgds');
    expect($outerDiv.classList).toContain('stepper');

    //3 child divs
    expect($outerDiv.children.length).toEqual(3);
    // 1st stepper
    expect($outerDiv.children[0].classList).toContain('stepper-item');
    expect($outerDiv.children[0].classList).toContain('is-active');
    expect($outerDiv.children[0].classList).not.toContain('is-completed');
    expect($outerDiv.children[0].classList).not.toContain(
      'stepper__item--clickable'
    );

    // 2nd stepper 
    expect($outerDiv.children[1].classList).toContain('stepper-item');
    expect($outerDiv.children[1].classList).not.toContain('is-active');
    expect($outerDiv.children[1].classList).not.toContain('is-completed');
    expect($outerDiv.children[1].classList).not.toContain(
      'is-clickable'
    );
    // 3rd stepper
    expect($outerDiv.children[2].classList).toContain('stepper-item');
    expect($outerDiv.children[2].classList).not.toContain('is-active');
    expect($outerDiv.children[2].classList).not.toContain('is-completed');
    expect($outerDiv.children[2].classList).not.toContain(
      'is-clickable'
    );

    //step-marker and step details
    expect(container.querySelectorAll('.stepper-marker').length).toEqual(3);
    expect(container.querySelectorAll('.stepper-detail').length).toEqual(3);
    expect(getByText('First Step')).toBeDefined();
    expect(getByText('1')).toBeDefined();
    expect(getByText('Second Step')).toBeDefined();
    expect(getByText('2')).toBeDefined();
    expect(getByText('Third Step')).toBeDefined();
    expect(getByText('3')).toBeDefined();
    //snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('Stepper interactions with onClick methods', async () => {
    const onNextMock = jest.fn(() => 'going next');
    const onPreviousMock = jest.fn(() => 'going previous');
    const onArrivedMock = jest.fn(() => 'arrived');
    const {
      asFragment,
      getByText,
      queryByText,
      container,
      getByRole,
      queryByRole,
      getAllByTestId,
    } = render(
      <InteractiveMockStepper
        onNextMock={onNextMock}
        onPreviousMock={onPreviousMock}
        onArrivedMock={onArrivedMock}
      />
    );
    const $outerDiv = container.querySelectorAll('div')[0];
    // step 1 mock calls
    expect(onArrivedMock).toHaveBeenCalledWith();
    expect(onPreviousMock).not.toHaveBeenCalled();
    expect(onNextMock).not.toHaveBeenCalled();
    jest.clearAllMocks();
    expect(asFragment()).toMatchSnapshot();

    //at stepper 1 expect 'Next' button only
    expect(getByText('Next')).toBeDefined();
    expect(getByText('Next').tagName).toEqual('BUTTON');
    expect(queryByText('Back')).toBeNull();

    //at stepper 1 expect component 1
    expect(getByText('At Step 1')).toBeDefined();
    expect(queryByText('At Step 2')).toBeNull();
    expect(queryByText('At Step 3')).toBeNull();

    // at stepper 1, stepper 2 is not active
    expect($outerDiv.children[0].classList).toContain('is-active');
    expect($outerDiv.children[1].classList).not.toContain('is-active');
    expect($outerDiv.children[2].classList).not.toContain('is-active');

    //at stepper 1, step 1 title is defined, currentStep is defined
    expect(getByText('Step 1').tagName).toEqual('H3');
    expect(getByText('currentStep: 1').tagName).toEqual('P');

    const $nextBtn = getByText('Next');
    // go to Step 2
    fireEvent.click($nextBtn);

    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
      expect(onArrivedMock).toHaveBeenCalledWith();
      expect(onPreviousMock).not.toHaveBeenCalled();
      jest.clearAllMocks();

      expect(getByText('Back')).toBeDefined();
      expect($outerDiv.children[0].classList).not.toContain('is-active');
      expect($outerDiv.children[1].classList).toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');
      expect(asFragment()).toMatchSnapshot();
    });
    // go to Step 3
    fireEvent.click($nextBtn);
    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
      expect(onArrivedMock).toHaveBeenCalledWith();
      expect(onPreviousMock).not.toHaveBeenCalled();
      jest.clearAllMocks();

      // alert component passed in step 3
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByText('Submit')).toBeDefined();
      expect($outerDiv.children[0].classList).not.toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).toContain('is-active');
      expect(asFragment()).toMatchSnapshot();
    });

    //clicking back button to step 2
    const $backBtn = getByText('Back');
    fireEvent.click($backBtn);
    await waitFor(() => {
      expect(onPreviousMock).toHaveBeenCalled();
      expect(onArrivedMock).toHaveBeenCalledWith();
      expect(onNextMock).not.toHaveBeenCalled();
      jest.clearAllMocks();

      expect(queryByRole('alert')).toBeNull();
      expect(queryByText('Submit')).toBeNull();
      expect($outerDiv.children[0].classList).not.toContain('is-active');
      expect($outerDiv.children[1].classList).toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');
      expect(asFragment()).toMatchSnapshot();
    });

    //click stepper to go to step 1
    const $stepMarkerOne = getAllByTestId('sgds-step')[0];
    fireEvent.click($stepMarkerOne);

    await waitFor(() => {
      expect(onPreviousMock).toHaveBeenCalled();
      expect(onArrivedMock).toHaveBeenCalledWith();
      expect(onNextMock).not.toHaveBeenCalled();
      jest.clearAllMocks();

      expect(container.textContent).toContain('At Step 1');
      expect($outerDiv.children[0].classList).toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');

      expect(asFragment()).toMatchSnapshot();
    });

    // At stepper 1 , cannot click stepMarker 2 or 3 to move forward

    const $stepMarkerTwo = getAllByTestId('sgds-step')[1];
    const $stepMarkerThree = getAllByTestId('sgds-step')[2];

    fireEvent.click($stepMarkerTwo);
    await waitFor(() => {
      expect(onNextMock).not.toHaveBeenCalled();
      expect(onArrivedMock).not.toHaveBeenCalled();
      jest.clearAllMocks();
      expect($outerDiv.children[0].classList).toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');

      expect(asFragment()).toMatchSnapshot();
    });
    fireEvent.click($stepMarkerThree);
    await waitFor(() => {
      expect(onNextMock).not.toHaveBeenCalled();
      expect(onArrivedMock).not.toHaveBeenCalled();
      jest.clearAllMocks();
      expect($outerDiv.children[0].classList).toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');

      expect(asFragment()).toMatchSnapshot();
    });

    //click Next
    fireEvent.click($nextBtn);
    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalled();
      expect(onArrivedMock).toHaveBeenCalled();
      jest.clearAllMocks();
      expect($outerDiv.children[0].classList).not.toContain('is-active');
      expect($outerDiv.children[1].classList).toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');

      expect(asFragment()).toMatchSnapshot();
    });

    //onclick reset goes back to step 1
    const $reset = getByText('Reset');
    expect($reset).toBeDefined();
    fireEvent.click($reset);
    await waitFor(() => {
      expect(onArrivedMock).toHaveBeenCalled();
      jest.clearAllMocks();
      expect($outerDiv.children[0].classList).toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).not.toContain('is-active');
    });

    //onclick Jump to last page Button to fast-forward to step 3
    const $jumpBtn = getByText('Jump to last page');
    fireEvent.click($jumpBtn);

    await waitFor(() => {
      expect(onArrivedMock).toHaveBeenCalled();
      expect($outerDiv.children[0].classList).not.toContain('is-active');
      expect($outerDiv.children[1].classList).not.toContain('is-active');
      expect($outerDiv.children[2].classList).toContain('is-active');
    });
  });
});
