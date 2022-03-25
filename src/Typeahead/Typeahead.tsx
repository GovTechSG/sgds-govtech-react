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
import TypeaheadToggle from './TypeaheadToggle';
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
    const initialState: TypeaheadState = {
      value: '',
      invalid: false,
      menuList,
    };
    const [state, setState] = useState(initialState);

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
      value: state.value,
      ref: inputRef,
      isInvalid: state.invalid,
      ...props,
    };

    const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
      if (onChangeValue) onChangeValue(e.currentTarget.textContent!);

      setState({
        ...state,
        value: e.currentTarget.textContent as string,
      });
    };

    const focusDropdownItem = (event: React.FocusEvent<HTMLAnchorElement>) => {
      console.log(event.currentTarget.textContent);
      setState({
        ...state,
        value: event.currentTarget.textContent as string,
      });
    };

    return (
      <Dropdown>
        <TypeaheadToggle {...controlProps} />
        {state.menuList.length > 0 && (
          <DropdownMenu>
            {state.menuList.map((country) => (
              <DropdownItem
                href="#"
                key={country}
                onClick={handleClickItem}
                onFocus={focusDropdownItem}
              >
                {country}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
);

Typeahead.displayName = 'Typeahead';
Typeahead.propTypes = propTypes as any;
Typeahead.defaultProps = defaultProps;
export default Typeahead;
