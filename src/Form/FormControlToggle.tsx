import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import DropdownContext from '@restart/ui/DropdownContext';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import InputGroupContext from '../InputGroup/InputGroupContext';
import useWrappedRefWithWarning from '../utils/useWrappedRefWithWarning';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import FormControl, { FormControlProps } from './FormControl';

export interface FormControlToggleProps extends Omit<FormControlProps, 'type'> {
  as?: React.ElementType;
  childBsPrefix?: string;
  setIsMenuOpen?: Function;
}

type FormControlToggleComponent = BsPrefixRefForwardingComponent<
  'input',
  FormControlToggleProps
>;

const propTypes = {
  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   */
  id: PropTypes.string,

  split: PropTypes.bool,

  as: PropTypes.elementType,

  /**
   * to passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix: PropTypes.string,
  setIsMenuOpen: PropTypes.func
};

const FormControlToggle: FormControlToggleComponent = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      childBsPrefix,
      setIsMenuOpen,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = FormControl,
      ...props
    }: FormControlToggleProps,
    ref
  ) => {
    const prefix = 'dropdown-toggle';
    const dropdownContext = useContext(DropdownContext);
    const isInputGroup = useContext(InputGroupContext);
    if (childBsPrefix !== undefined) {
      (props as any).bsPrefix = childBsPrefix;
    }
    const [toggleProps] = useDropdownToggle();
    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle')
    );
    const {"aria-expanded": ariaExpanded, ...togglePropsOmitAriaExpanded} = toggleProps

    if (setIsMenuOpen) {
      React.useEffect(() => {
        setIsMenuOpen(dropdownContext?.show);
      }, [dropdownContext?.show]);
    }
    // This intentionally forwards size and variant (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <Component
        className={classNames(
          className,
          prefix,
          !!isInputGroup && dropdownContext?.show && 'show'
        )}
        {...togglePropsOmitAriaExpanded}
        {...props}
      />
    );
  }
);

FormControlToggle.displayName = 'FormToggle';
FormControlToggle.propTypes = propTypes;

export default FormControlToggle;
