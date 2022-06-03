import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import Feedback, { FeedbackType } from './Feedback';
import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';
import FormContext from './FormContext';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export type FormCheckType = 'checkbox' | 'radio' | 'switch';

export interface FormCheckProps
  extends BsPrefixProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  type?: FormCheckType;
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: React.ReactNode;
  feedbackType?: FeedbackType;
  bsSwitchPrefix?: string;
}

const propTypes = {
  /**
   * @default 'form-check'
   */
  bsPrefix: PropTypes.string,

  /**
   * bsPrefix override for the base switch class.
   *
   * @default 'form-switch'
   */
  bsSwitchPrefix: PropTypes.string,

  /**
   * The FormCheck `ref` will be forwarded to the underlying input element,
   * which means it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * The underlying HTML element to use when rendering the FormCheck.
   *
   * @type {('input'|elementType)}
   */
  as: PropTypes.elementType,

  /**
   * A HTML id attribute, necessary for proper form accessibility.
   * An id is recommended for allowing label clicks to toggle the check control.
   *
   * This is **required** when `type="switch"` due to how they are rendered.
   */
  id: PropTypes.string,

  /**
   * Groups controls horizontally with other `FormCheck`s.
   */
  inline: PropTypes.bool,

  /**
   * Disables the control.
   */
  disabled: PropTypes.bool,

  /**
   * `title` attribute for the underlying `FormCheckLabel`.
   */
  title: PropTypes.string,

  /**
   * Label for the control.
   */
  label: PropTypes.node.isRequired,

  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'switch')}
   */
  type: PropTypes.oneOf(['radio', 'checkbox', 'switch']),

  /** Manually style the input as valid */
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,
};

const FormCheck: BsPrefixRefForwardingComponent<'input', FormCheckProps> =
  React.forwardRef<HTMLInputElement, FormCheckProps>(
    (
      {
        id,
        bsPrefix,
        bsSwitchPrefix,
        inline = false,
        disabled = false,
        isValid = false,
        isInvalid = false,
        feedback,
        feedbackType,
        className,
        style,
        title = '',
        type = 'checkbox',
        label,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as = 'input',
        ...props
      },
      ref,
    ) => {

      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check');
      bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, 'form-switch');

      const { controlId } = useContext(FormContext);
      const innerFormContext = useMemo(
        () => ({
          controlId: id || controlId,
        }),
        [controlId, id],
      );


      const input = (
        <FormCheckInput
          {...props}
          type={type === 'switch' ? 'checkbox' : type}
          ref={ref}
          isValid={isValid}
          isInvalid={isInvalid}
          disabled={disabled}
          as={as}
        />
      );

      return (
        <FormContext.Provider value={innerFormContext}>
          <div
            style={style}
            className={classNames(
              className,
              label && bsPrefix,
              inline && `${bsPrefix}-inline`,
              type === 'switch' && bsSwitchPrefix,
            )}
          >
                {input}
                  <FormCheckLabel title={title} aria-label={label?.toString()}>{label}</FormCheckLabel>
                {feedback && (
                  <Feedback type={feedbackType}>
                    {feedback}
                  </Feedback>
                )}
          </div>
        </FormContext.Provider>
      );
    },
  );

FormCheck.displayName = 'FormCheck';
FormCheck.propTypes = propTypes;

export default Object.assign(FormCheck, {
  Input: FormCheckInput,
  Label: FormCheckLabel,
});
