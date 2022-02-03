import * as React from 'react';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import FormControl from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../helpers';
import { ButtonVariant } from '../types';

export interface QuantityToggleProps {
  step?: number;
  size?: 'sm' | 'lg';
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
  variant?: ButtonVariant;
}

const defaultProps: Partial<QuantityToggleProps> = {
  size: 'sm',
  step: 1,
};

export const QuantityToggle: BsPrefixRefForwardingComponent<
  'input',
  QuantityToggleProps
> = React.forwardRef<HTMLInputElement, QuantityToggleProps>(
  ({ size, step = 1, disabled, variant, count, setCount, ...props }, ref) => {
    const buttonProps = { disabled, variant };
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
          disabled={disabled}
          ref={ref}
          type="number"
          value={count}
          name="quantity"
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
        />
        <Button onClick={onPlus} {...buttonProps}>+</Button>
      </InputGroup>
    );
  }
);

QuantityToggle.displayName = 'QuantityToggle';
QuantityToggle.defaultProps = defaultProps;

export default QuantityToggle;