import React from 'react';
import { UseStepMethods, WrappedStepMetadata } from './useStep';
import { SGDSWrapper } from '../ThemeProvider/ThemeProvider';
function Stepper({ methods }: { methods: UseStepMethods }) {
  const { state, stepsMetadata, setStep } = methods;
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
    <SGDSWrapper className="stepper">
      {stepsMetadata.data.map((stepMetadata: WrappedStepMetadata) => (
        <div
          data-testid="sgds-step"
          className={`stepper-item ${getClass(stepMetadata)}`}
          onClick={back(stepMetadata)}
          key={stepMetadata.step}
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
}

Stepper.displayName = 'Stepper';

export default Stepper;
