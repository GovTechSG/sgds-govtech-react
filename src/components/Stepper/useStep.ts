import { useEffect, useState } from 'react';

export type OnDone = () => Promise<void>;

export interface StepMetadata {
  component: any;
  title: any;
  stepHeader: string;
  onNextStep?: (onDone: OnDone) => Promise<void>;
  onPreviousStep?: (onDone: OnDone) => Promise<void>;
  onArrived?: () => Promise<void>;
}
export interface State {
  currentStep: number;
}

export class WrappedStepMetadata {
  private stepMetadata;
  private index;
  constructor(stepMetadata: StepMetadata, index: number) {
    this.stepMetadata = stepMetadata;
    this.index = index;
  }

  get component() {
    return this.stepMetadata.component;
  }

  get title() {
    return this.stepMetadata.title;
  }

  get step() {
    return this.index + 1;
  }

  get stepHeader() {
    return this.stepMetadata.stepHeader;
  }

  async onNextStep(onDone: OnDone) {
    if (this.stepMetadata.onNextStep) {
      await this.stepMetadata.onNextStep(onDone);
    } else {
      await onDone();
    }
  }

  async onPreviousStep(onDone: OnDone) {
    if (this.stepMetadata.onPreviousStep) {
      await this.stepMetadata.onPreviousStep(onDone);
    } else {
      await onDone();
    }
  }

  async onArrived() {
    if (this.stepMetadata.onArrived) {
      await this.stepMetadata.onArrived();
    }
  }
}

export class WrappedStepsMetadata {
  private wrappedStepMetadataArr;
  constructor(wrappedStepMetadataArr: WrappedStepMetadata[]) {
    this.wrappedStepMetadataArr = wrappedStepMetadataArr;
  }

  get length() {
    return this.wrappedStepMetadataArr.length;
  }

  findByStep(step: number) {
    return this.wrappedStepMetadataArr.find(
      (wrappedStepMetadata) => wrappedStepMetadata.step === step
    );
  }

  isFirstStep(step: number) {
    return step === 1
  }

  isLastStep(step: number) {
    return step === this.length;
  }

  isWithinStepRange(step: number) {
    return step >= 1 && step <= this.length + 1;
  }

  get data() {
    return this.wrappedStepMetadataArr;
  }
}

export interface UseStepMethods {
  state: State;
  stepsMetadata: WrappedStepsMetadata;
  nextStep: () => Promise<void>;
  prevStep: () => Promise<void>;
  setStep: (step: number) => Promise<void>;
  getTitle: () => string;
  getComponent: () => any;
  getNextButtonTitle: () => string;
  getBackButtonTitle: () => string | null;
  reset: () => Promise<void>;
}

function useStep(stepsMetadata: StepMetadata[]): UseStepMethods {
  const wrappedStepsMetadata = new WrappedStepsMetadata(
    stepsMetadata.map(
      (stepMetadata, index) => new WrappedStepMetadata(stepMetadata, index)
    )
  );

  const getStateMethod = () => {
    return useState<State>({
      currentStep: 1,
    });
  };
  const [state, setState] = getStateMethod();

  useEffect(() => {
    runOnArrived();
  }, [state.currentStep]);

  const runOnArrived = async () => {
    const stepData = wrappedStepsMetadata.findByStep(state.currentStep);
    if (stepData) {
      await stepData.onArrived();
    }
  };

  const setStep = async (newStep: number) => {
    if (newStep === state.currentStep) {
      return;
    }
    const stepData = wrappedStepsMetadata.findByStep(state.currentStep);
    if (!stepData) {
      return;
    }
    if (!wrappedStepsMetadata.isWithinStepRange(newStep)) {
      return;
    }
    const onDoneMethod = async () => {
      setState({
        ...state,
        currentStep: newStep,
      });
    };
    if (newStep > state.currentStep) {
      console.log('1')

      await stepData.onNextStep(onDoneMethod);
    }
    if (newStep < state.currentStep) {
      console.log('1')
      await stepData.onPreviousStep(onDoneMethod);
    }
  };

  const nextStep = async () => {
    await setStep(state.currentStep + 1);
  };
  const prevStep = async () => {
    await setStep(state.currentStep - 1);
  };

  const getTitle = () => {
    const stepData = wrappedStepsMetadata.findByStep(state.currentStep);
    if (stepData) {
      return stepData.title;
    }
    return '';
  };

  const getComponent = () => {
    const stepData = wrappedStepsMetadata.findByStep(state.currentStep);
    if (stepData) {
      return stepData.component;
    }
  };

  const getNextButtonTitle = () => {
    if (wrappedStepsMetadata.isLastStep(state.currentStep)) {
      return 'Submit';
    } else {
      return 'Next';
    }
  };
  const getBackButtonTitle = () => {
    if(wrappedStepsMetadata.isFirstStep(state.currentStep)){
      return null
    } else {
      return 'Back'
    }
  }

  const reset = async () => {
    if (state.currentStep !== 1) {
      setState({
        ...state,
        currentStep: 1,
      });
    } else {
      await runOnArrived();
    }
  };

  return {
    state,
    stepsMetadata: wrappedStepsMetadata,
    nextStep,
    prevStep,
    setStep,
    getTitle,
    getComponent,
    getNextButtonTitle,
    getBackButtonTitle,
    reset,
  };
}

export default useStep;
