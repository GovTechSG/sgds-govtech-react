import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import FormGroup, { FormGroupProps } from '../Form/FormGroup';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';

export interface FloatingLabelProps extends FormGroupProps, BsPrefixProps {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId?: string;
  /**
   * Form control label.
   */
  label: React.ReactNode;
}

const propTypes = {
  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId: PropTypes.string,

  /**
   * Form control label.
   */
  label: PropTypes.node.isRequired,
};

export const FloatingLabel: BsPrefixRefForwardingComponent<
  'div',
  FloatingLabelProps
> = React.forwardRef(
  ({ bsPrefix, className, children, controlId, label, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');

    return (
      <FormGroup
        ref={ref}
        className={classNames(className, bsPrefix)}
        controlId={controlId}
        {...props}
      >
        {children}
        <label htmlFor={controlId}>{label}</label>
      </FormGroup>
    );
  }
);

FloatingLabel.displayName = 'FloatingLabel';
FloatingLabel.propTypes = propTypes;

export default FloatingLabel;