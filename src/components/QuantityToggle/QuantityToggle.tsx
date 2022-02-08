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
    if (count < 0 ) setCount(0)
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
        <Button onClick={onMinus} {...buttonProps} >
        <i className="bi bi-dash"></i>
        </Button>
        <FormControl
          {...props}
          disabled={disabled}
          ref={ref}
          type="number"
          className="text-center"
          value={count}
          name="quantity"
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
          min={0}
        />
        <Button onClick={onPlus} {...buttonProps}><i className="bi bi-plus" ></i></Button>
      </InputGroup>
    );
  }
);

QuantityToggle.displayName = 'QuantityToggle';
QuantityToggle.defaultProps = defaultProps;

export default QuantityToggle;
