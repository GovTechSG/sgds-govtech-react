import * as React from 'react';
import Button, { ButtonProps } from '../Button/Button';
import InputGroup, { InputGroupProps } from '../InputGroup/InputGroup';
import FormControl, { FormControlProps } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../helpers';

type QuantityToggleType = Omit<InputGroupProps, 'hasValidation'> &
  Omit<ButtonProps, 'size'> &
  Omit<FormControlProps, 'isValid' | 'isInvalid' | 'searchIcon'>;

export interface QuantityToggleProps extends QuantityToggleType {
  step?: number;
  size?: 'sm' | 'lg';
  count: number; 
  setCount : React.Dispatch<React.SetStateAction<number>>;
}

const defaultProps: Partial<QuantityToggleProps> = {
  size: 'sm',
  step: 1,
};

const QuantityToggle: BsPrefixRefForwardingComponent<
  'input',
  QuantityToggleProps
> = React.forwardRef<HTMLInputElement, QuantityToggleProps>(
  ({ size, step = 1, active, variant,count, setCount, ...props }, ref) => {
    const buttonProps = { active, variant };
    const onPlus = () => {
      setCount(count + step);
    };
    const onMinus = () => {
      if (count < 1) setCount(0);
      else setCount(count - step);
    };
    return (
      <InputGroup size={size}>
        <Button onClick={onMinus} {...buttonProps}>
          -
        </Button>
        <FormControl
          {...props}
          ref={ref}
          type="number"
          value={count}
          name="quantity"
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
        />
        <Button onClick={onPlus}>+</Button>
      </InputGroup>
    );
  }
);

QuantityToggle.displayName = 'QuantityToggle';
QuantityToggle.defaultProps = defaultProps;

export default QuantityToggle;
