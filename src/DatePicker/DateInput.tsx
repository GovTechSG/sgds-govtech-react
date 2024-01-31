import useMergedRefs from '@restart/hooks/useMergedRefs';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useWrappedRefWithWarning from '../utils/useWrappedRefWithWarning';
import { DateFormat } from './DatePicker';

export interface DateInputProps extends Omit<FormControlProps, 'type'> {
  as?: React.ElementType;
  required?: boolean | undefined;
  isRange: boolean;
  inputDate?: string;
  isInvalid?: boolean;
  dateFormat: DateFormat;
  enterDateRange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  enterDateSingle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type DateInputPropsComponent = BsPrefixRefForwardingComponent<
  'input',
  DateInputProps
>;

const propTypes = {
  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   */
  id: PropTypes.string,

  as: PropTypes.elementType,
};

export const getMaskedDateFormat = (
  isRange: boolean,
  dateFormat: DateFormat
) => {
  const maskedDateFormat =
    dateFormat === 'YYYY/MM/DD' ? '9999/99/99' : '99/99/9999';
  if (isRange) {
    return `${maskedDateFormat} - ${maskedDateFormat}`;
  }

  return maskedDateFormat;
};

const DateInput: DateInputPropsComponent = React.forwardRef(
  (
    {
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = FormControl,
      required,
      placeholder,
      disabled,
      id,
      isRange,
      inputDate,
      isInvalid,
      dateFormat,
      enterDateRange,
      enterDateSingle,
      ...props
    }: DateInputProps,
    ref
  ) => {
    const maskedDateFormat = getMaskedDateFormat(isRange, dateFormat);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [toggleProps] = useDropdownToggle();
    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle')
    );

    const defaultPlaceHolder = isRange
      ? `${dateFormat.toLowerCase()} - ${dateFormat.toLowerCase()}`
      : `${dateFormat.toLowerCase()}`;

    const controlProps = {
      value: inputDate,
      required: required,
      placeholder: placeholder || defaultPlaceHolder,
      disabled: disabled,
      isInvalid: isInvalid,
      id: id,
    };

    // Assign the ref element of dropdown toggle to HTMLInputElement (FormControl)
    React.useEffect(() => {
      toggleProps.ref(inputRef.current);
    }, []);

    return (
      <InputMask
        {...controlProps}
        mask={maskedDateFormat}
        alwaysShowMask={true}
        maskPlaceholder={defaultPlaceHolder}
        aria-label="Enter Date"
        onChange={isRange ? enterDateRange : enterDateSingle}
      >
        <Component
          className={classNames(className)}
          ref={inputRef}
          {...props}
        />
      </InputMask>
    );
  }
);

DateInput.displayName = 'DateInput';
DateInput.propTypes = propTypes;

export default DateInput;
