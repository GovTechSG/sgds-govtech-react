import DropdownMenu from '../Dropdown/DropdownMenu';
import * as React from 'react';
import FormControl from '../Form/FormControl';
import InputGroup from '../InputGroup/InputGroup';
import Overlay from '../Overlay/Overlay';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';

export type MenuPlacement = 'top' | 'bottom';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
export interface RangeSelectionValue {
  start: Date | undefined;
  end: Date | undefined;
}
export interface TypeaheadProps {
  initialValue?: string;
  className?: string;
  placeholder?: string;
  onClear?: Function;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  disabled?: boolean;
  menuPlacement?: MenuPlacement | undefined;
  id?: string;
  flip?: boolean;
}

const propTypes = {
  initialValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
  ]),
  required: PropTypes.bool,
  className: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  displayDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChangeDate: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  calendarPlacement: PropTypes.oneOf<MenuPlacement>(['top', 'bottom']),
  /**
   * dateFormat variants
   *
   * @type {('MM/DD/YYYY'|'DD/MM/YYYY'|'YYYY/MM/DD')}
   */
  dateFormat: PropTypes.string,
  id: PropTypes.string,
  /**
   * mode variants
   *
   * @type {('single'|'range')}
   */
  mode: PropTypes.string,
  flip: PropTypes.bool,
};
interface TypeaheadState {
  value: string;
  focused: boolean;
  inputFocused: boolean;
  invalid: boolean;
}

const defaultProps: Partial<TypeaheadProps> = {
  menuPlacement: 'bottom',
  flip: true,
};

export const Typeahead: BsPrefixRefForwardingComponent<
  'input',
  TypeaheadProps
> = React.forwardRef<HTMLInputElement, TypeaheadProps>(
  (
    {
      menuPlacement = 'bottom',
      flip = true,
      ...props
    },
    ref
  ) => {
    const formControlRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergedRefs(
      ref as React.MutableRefObject<HTMLInputElement>,
      formControlRef
    );
    const overlayRef = useRef(null);

    const initialState: TypeaheadState = {
      value: '',
      focused: false,
      inputFocused: false,
      invalid: false,
    };
    const [state, setState] = useState(initialState);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && state.inputFocused) {
        setState({ ...state, focused: false });
      }
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (state.focused === true) {
        return;
      }
      setState({
        ...state,
        inputFocused: true,
        focused: true,
      });
      if (props.onFocus) {
        props.onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setState({
        ...state,
        inputFocused: false,
      });
      if (props.onBlur) {
        props.onBlur(event);
      }
    };
    const clear = () => {
      setState({
        ...initialState,
      });
      if (props.onClear) {
        props.onClear();
      }
    };

    const handleHide = () => {
      if (state.inputFocused) {
        return;
      }
      setState({
        ...state,
        focused: false,
      });
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, value: e.currentTarget.value})
    }
    //triggered only when clicking dates

    const controlProps = {
      onChange,
      onKeyDown: handleKeyDown,
      value: state.value,
      placeholder: props.placeholder,
      ref: inputRef,
      disabled: props.disabled,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: props.className,
      isInvalid: state.invalid,
    };
    // const control = (
    //   <FormControl type="text" autoFocus={props.autoFocus} {...controlProps} />
    // );

    return (
      <InputGroup>
        <div ref={overlayRef} style={{width: '100vw'}}> 
        <FormControl type="text" autoFocus={props.autoFocus} {...controlProps} />
        </div>
        <Overlay
          rootClose={true}
          onHide={handleHide}
          show={state.focused}
          target={formControlRef.current}
          placement={menuPlacement}
          container={overlayRef}
          transition={true}
          flip={flip}
        >
          <DropdownMenu>test</DropdownMenu>
        </Overlay>
      </InputGroup>
    );
  }
);

Typeahead.displayName = 'Typeahead';
Typeahead.propTypes = propTypes as any;
Typeahead.defaultProps = defaultProps;
export default Typeahead;
