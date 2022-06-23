
import FormCheckInput, { FormCheckInputProps } from '../Form/FormCheckInput';
import { InputGroupText } from './InputGroupText';
import * as React from 'react';

export const InputGroupCheckbox = (props: FormCheckInputProps) => (
    <InputGroupText>
      <FormCheckInput type="checkbox" {...props} />
    </InputGroupText>
  );
  
  export const InputGroupRadio = (props: FormCheckInputProps) => (
    <InputGroupText>
      <FormCheckInput type="radio" {...props} />
    </InputGroupText>
  );
  