import React from 'react';
import { UseStepMethods, WrappedStepMetadata } from './useStep';

function Stepper({ methods }: { methods: UseStepMethods }) {
  const { state, stepsMetadata, setStep } = methods;
  const getClass = (stepMetadata: WrappedStepMetadata) => {
    if (stepMetadata.step < state.currentStep) {
      return 'is-completed stepper__item--clickable';
    }
    if (stepMetadata.step === state.currentStep) {
      return 'is-active';
    }
    return '';
  };
  const back = (stepMetadata: WrappedStepMetadata) => {
    return () => {
      if (stepMetadata.step < state.currentStep) {
        console.log('click back')

        return setStep(stepMetadata.step);
      }
      return
    };
  };
  return (
    <div className="sgds-steps stepper">
      {stepsMetadata.data.map((stepMetadata) => (
        <div
          data-testid="sgds-step"
          className={`sgds-step-item stepper__item ${getClass(stepMetadata)}`}
          onClick={back(stepMetadata)}
          key={stepMetadata.step}
        >
          <div className="sgds-step-marker">{stepMetadata.step}</div>
          <div className="sgds-step-details">
            <p>
              <b>{stepMetadata.stepHeader}</b>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;