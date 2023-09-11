import React, { useEffect } from 'react';
import {
  UseStepMethods,
  WrappedStepMetadata,
  WrappedStepsMetadata,
} from './useStep';
import { useCallbackRef } from '@restart/hooks';
import { SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import PropTypes from 'prop-types';

interface StepperProps {
  methods: UseStepMethods;
}

const propTypes = {
  methods: PropTypes.shape({
    state: PropTypes.shape({ currentStep: PropTypes.number }),
    stepsMetadata: PropTypes.instanceOf(WrappedStepsMetadata),
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    setStep: PropTypes.func,
    getTitle: PropTypes.func,
    getComponent: PropTypes.func,
    getNextButtonTitle: PropTypes.func,
    getBackButtonTitle: PropTypes.func,
    reset: PropTypes.func,
  }).isRequired,
};
const Stepper: React.FC<StepperProps> = ({ methods }) => {
  const [stepperEl, stepperRef] = useCallbackRef<HTMLDivElement>();
  const { state, stepsMetadata, setStep } = methods;

  useEffect(() => {
    if (!stepperEl) return;
    stepperEl.querySelectorAll('.stepper-item').forEach(stepperItem => {
      stepperItem.addEventListener('keydown', e => {
          const keyDown = (e as KeyboardEvent).key;
          if (keyDown === 'Enter') {
            e.preventDefault();
            (stepperItem as HTMLElement).click();
          }
      });
  });
  }, [stepperEl])
  const getClass = (stepMetadata: WrappedStepMetadata) => {
    if (stepMetadata.step < state.currentStep) {
      return 'is-completed is-clickable';
    }
    if (stepMetadata.step === state.currentStep) {
      return 'is-active';
    }
    return '';
  };
  const back = (stepMetadata: WrappedStepMetadata) => {
    return () => {
      if (stepMetadata.step < state.currentStep) {
        return setStep(stepMetadata.step);
      }
      return;
    };
  };

  return (
    <SGDSWrapper ref={stepperRef} className="stepper">
      {stepsMetadata.data.map((stepMetadata: WrappedStepMetadata) => (
        <div
          data-testid="sgds-step"
          className={`stepper-item ${getClass(stepMetadata)}`}
          onClick={back(stepMetadata)}
          key={stepMetadata.step}
          tabIndex={0}
          aria-current={stepMetadata.step === state.currentStep ? "step" : "false"}
          aria-disabled={stepMetadata.step >= state.currentStep}
        >
          <div className="stepper-marker">{stepMetadata.step}</div>
          <div className="stepper-detail">
            <p>
              <b>{stepMetadata.stepHeader}</b>
            </p>
          </div>
        </div>
      ))}
    </SGDSWrapper>
  );
};

Stepper.displayName = 'Stepper';
Stepper.propTypes = propTypes as any;

export default Stepper;
