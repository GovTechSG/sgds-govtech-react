import * as React from 'react';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import FormControl from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../helpers';
import { ButtonVariant } from '../types';
import PropTypes from 'prop-types';

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
const propTypes = {
  step: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'lg']),
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  disabled: PropTypes.bool, 
  variant: PropTypes.oneOf<ButtonVariant>([
 'primary',
 'secondary',
 'success',
 'danger',
 'warning',
 'info',
 'dark',
 'light',
  'link',
  'outline-primary',
  'outline-secondary',
  'outline-success',
  'outline-danger',
  'outline-warning',
  'outline-info',
  'outline-dark',
  'outline-light'
  ])
}

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
    React.useEffect(() => {
    if (count < 0 ) setCount(0)
    }, [])
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
QuantityToggle.propTypes = propTypes;

export default QuantityToggle;
