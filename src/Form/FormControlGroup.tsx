import PropTypes from 'prop-types';
import * as React from 'react';

import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import {
  SGDSWrapper,
  useBootstrapPrefix,
} from '../ThemeProvider/ThemeProvider';
import classNames from 'classnames';

export interface FormControlGroupProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Pass in custom icon element of your choice. Required field*/
  icon: React.ReactElement;
}

const propTypes = {
  as: PropTypes.elementType,
  icon: PropTypes.element,
};

export const FormControlGroup: BsPrefixRefForwardingComponent<
  'div',
  FormControlGroupProps
> = React.forwardRef<HTMLElement, FormControlGroupProps>(
  (
    {
      icon,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      children,
      className,
      ...props
    },
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-control-group');
    return (
      <SGDSWrapper
        className={classNames(bsPrefix, className)}
        {...props}
        ref={ref}
      >
        {icon &&
          React.cloneElement(icon, {
            className: classNames(icon.props.className, 'form-control-icon'),
          })}
        {children}
      </SGDSWrapper>
    );
  }
);

FormControlGroup.displayName = 'FormControlGroup';
FormControlGroup.propTypes = propTypes;

export default FormControlGroup;
