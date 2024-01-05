import useMergedRefs from '@restart/hooks/useMergedRefs';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useWrappedRefWithWarning from '../utils/useWrappedRefWithWarning';

export interface DateInputProps extends Omit<FormControlProps, 'type'> {
  as?: React.ElementType;
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

const DateInput: DateInputPropsComponent = React.forwardRef(
  (
    {
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = FormControl,
      ...props
    }: DateInputProps,
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [toggleProps] = useDropdownToggle();
    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle')
    );
    // Assign the ref element of dropdown toggle to HTMLInputElement (FormControl)
    React.useEffect(() => {
      toggleProps.ref(inputRef.current);
    }, []);

    return (
      <Component className={classNames(className)} ref={inputRef} {...props} />
    );
  }
);

DateInput.displayName = 'DateInput';
DateInput.propTypes = propTypes;

export default DateInput;
