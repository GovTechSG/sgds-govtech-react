import * as React from 'react';
import { useState } from 'react';
import Button, { ButtonProps } from '../Button/Button';
import InputGroup, { InputGroupProps } from '../InputGroup/InputGroup';
import FormControl, { FormControlProps } from '../Form/FormControl';

type QuantityToggleType = Omit<InputGroupProps, 'hasValidation'> & Omit<ButtonProps, 'size'> & Omit<FormControlProps, 'isValid' | 'isInvalid' |'searchIcon'>;

export interface QuantityToggleProps extends QuantityToggleType {
    min?: number;
    step?: number;
    size?: 'sm' | 'lg'
}

const defaultProps: Partial<QuantityToggleProps> = {
    size: 'sm',
    min: 0,
    step: 1
}

const QuantityToggle: React.FC<QuantityToggleProps> = ({size, min = 0 , step = 1,  active, variant, ...props}) => {
  const [count, setCount] = useState(min);
  const buttonProps = {active, variant}
  const onPlus = () => {
    setCount(count + step);
  };
  const onMinus = () => {
    if (count < 1) setCount(0);
    else setCount(count - step);
  };
  return (
    <InputGroup size={size}>
      <Button onClick={onMinus} {...buttonProps}>-</Button>
      <FormControl
       {...props}
        type="number"
        value={count}
        onChange={(e) => {
          setCount(parseInt(e.target.value));
        }}
      />
      <Button onClick={onPlus}>+</Button>
    </InputGroup>
  );
};

QuantityToggle.displayName = 'QuantityToggle'
QuantityToggle.defaultProps = defaultProps

export default QuantityToggle