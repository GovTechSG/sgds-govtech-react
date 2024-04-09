import * as React from 'react';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import FormControl, { FormControlElement } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import { ButtonVariant } from '../utils/types';
import PropTypes from 'prop-types';
import { FormLabel } from '../Form';

export interface QuantityToggleProps {
  /** Controls the incremental / decremental value */
  step?: number;
  /** Controls the size of the QuantityToggle */
  size?: 'sm' | 'lg';
  /**Keep tracks of input value. This parameter should be passed down from parent with `setCount` */
  count: number;
  /**Updates the count value in Parent component. This parameter should be passed down from parent with `count` */
  setCount: React.Dispatch<React.SetStateAction<number>>;
  /** Disables the buttons and input of `QuantityToggle` */
  disabled?: boolean;
  /**Controls the color of the buttons */
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
    'outline-light',
  ]),
};

export const QuantityToggle: BsPrefixRefForwardingComponent<
  'input',
  QuantityToggleProps
> = React.forwardRef<HTMLInputElement, QuantityToggleProps>(
  ({ size, step = 1, disabled, variant, count, setCount, ...props }, ref) => {
    const buttonProps = { disabled, variant };
    const onPlus = () => {
      setCount((prevCount) => prevCount + step);
    };
    const onMinus = () => {
      if (count < 1) setCount(0);
      else setCount((prevCount) => prevCount - step);
    };
    const onChangeInput = (e: React.ChangeEvent<FormControlElement>) => {
      const inputValue = e.target.value === '' ? 0 : parseInt(e.target.value);
      setCount(inputValue);
    };
    const handleKeyDown = (event: React.KeyboardEvent<FormControlElement>) => {
      const allowedKeys = [
        'Backspace',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        ...Array.from(Array(10).keys()).map((key) => key.toString()),
      ];

      // Allow keydown event only if the pressed key is in the allowedKeys array
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    return (
      <>
        <FormLabel className="visually-hidden">quantity-toggle</FormLabel>
        <InputGroup size={size} variant="quantity-toggle">
          <Button
            onClick={onMinus}
            {...buttonProps}
            aria-label={`decrease by ${step}`}
          >
            <i className="bi bi-dash"></i>
          </Button>
          <FormControl
            {...props}
            disabled={disabled}
            ref={ref}
            type="number"
            className="text-center"
            value={count.toString()}
            name="quantity"
            onKeyDown={handleKeyDown}
            onChange={onChangeInput}
            min={0}
          />
          <div
            id="quantitytoggle-announcer"
            role="region"
            aria-live="assertive"
            className="visually-hidden"
          >
            {count}
          </div>
          <Button
            onClick={onPlus}
            {...buttonProps}
            aria-label={`increase by ${step}`}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </InputGroup>
      </>
    );
  }
);

QuantityToggle.displayName = 'QuantityToggle';
QuantityToggle.defaultProps = defaultProps;
QuantityToggle.propTypes = propTypes;

export default QuantityToggle;
