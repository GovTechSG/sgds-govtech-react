import DropdownMenu from '../Dropdown/DropdownMenu';
import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import InputGroup from '../InputGroup/InputGroup';
import Overlay from '../Overlay/Overlay';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownItem from '../Dropdown/DropdownItem';
import { Dropdown } from '..';

export type MenuPlacement = 'top' | 'bottom';

export interface TypeaheadProps extends Omit<FormControlProps, 'type'> {
  initialValue?: string;
  menuPlacement?: MenuPlacement | undefined;
  flip?: boolean;
  menuList: string[];
  onChangeValue: (val: string) => void;
}

const propTypes = {
  initialValue: PropTypes.string,
  className: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  displayDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChangeValue: PropTypes.func,
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
  menuList: string[];
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
      menuList,
      flip = true,
      onChange,
      onFocus,
      onBlur,
      onChangeValue,
      onKeyDown,
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
      focused: false,
      value: '',
      inputFocused: false,
      invalid: false,
      menuList,
    };
    const [state, setState] = useState(initialState);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && state.inputFocused) {
        setState({ ...state, inputFocused: false });
      }
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (state.inputFocused === true) {
        return;
      }
      setState({
        ...state,
        inputFocused: true,
        focused: true,
      });
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setState({
        ...state,
        inputFocused: false,
      });
      if (onBlur) {
        onBlur(event);
      }
    };
    const handleHide = () => {
      console.log('hiude')
      if (state.focused) {
        return;
      }
      setState({
        ...state,
        focused: false,
      });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filterMenuList = menuList.filter((n) => {
        const nLowerCase = n.toLowerCase();
        const valueLower = e.currentTarget.value.toLowerCase();
        // return nLowerCase.includes(valueLower)
        return nLowerCase.startsWith(valueLower);
      });
      setState({
        ...state,
        value: e.currentTarget.value,
        menuList: filterMenuList,
      });
      if (onChange) onChange(e);
      if (onChangeValue) onChangeValue(e.currentTarget.value);
    };
    //triggered only when clicking dates
    const controlProps = {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: state.value,
      ref: inputRef,
      onFocus: handleFocus,
      onBlur: handleBlur,
      isInvalid: state.invalid,
      ...props,
    };

    const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
      if (onChangeValue) onChangeValue(e.currentTarget.textContent!);

      setState({ ...state, value: e.currentTarget.textContent as string, focused: false});

    };

    return (
      <InputGroup>
        <div ref={overlayRef}>
          <FormControl type="text" {...controlProps} />
        </div>
        {state.menuList.length > 0 && (
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
            {({ arrowProps, ...props }) => (
              <Dropdown {...props} >
                <DropdownMenu role="menu" >
                  {state.menuList.map((country) => (
                    <DropdownItem key={country} onClick={handleClickItem}>
                      {country}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </Overlay>
        )}
      </InputGroup>
    );
  }
);

Typeahead.displayName = 'Typeahead';
Typeahead.propTypes = propTypes as any;
Typeahead.defaultProps = defaultProps;
export default Typeahead;
