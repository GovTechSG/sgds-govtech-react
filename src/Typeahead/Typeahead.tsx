import DropdownMenu from '../Dropdown/DropdownMenu';
import * as React from 'react';
import { FormControlProps } from '../Form/FormControl';
import FormLabel from '../Form/FormLabel';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownItem from '../Dropdown/DropdownItem';
import Dropdown  from '../Dropdown/Dropdown';
import FormControlToggle from '../Form/FormControlToggle';
import InputGroup from '../InputGroup/InputGroup';

export type MenuPlacement = 'up' | 'down';

export interface TypeaheadProps extends Omit<FormControlProps, 'type'> {
  /**Initial value of input */
  initialValue?: string;
  /** Placement of menu in relation to input */
  menuPlacement?: MenuPlacement;
  /** Array of values to pass into menu */
  menuList: string[];
  /** The onChange handler for Typeahead's input change */
  onChangeInput?: (
    val: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>
  ) => void;
  /** Adds a FormLabel to `<Typeahead />` */
  label?: string;
  /** When true, adds bi-search icon to FormControl */
  hasIcon?: boolean;
}

const propTypes = {
  initialValue: PropTypes.string,
  onChangeInput: PropTypes.func,
  menuPlacement: PropTypes.oneOf<MenuPlacement>(['up', 'down']),
  menuList: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  hasIcon: PropTypes.bool
};

interface TypeaheadState {
  value: string;
  invalid: boolean;
  menuList: string[];
}

const defaultProps: Partial<TypeaheadProps> = {
  menuPlacement: 'down',
  initialValue : '',
  hasIcon : true
};

export const Typeahead: BsPrefixRefForwardingComponent<
  'input',
  TypeaheadProps
> = React.forwardRef<HTMLInputElement, TypeaheadProps>(
  (
    {
      menuPlacement = 'down',
      menuList,
      initialValue = '',
      onChangeInput,
      label = '',
      hasIcon = true,
      ...props
    },
    ref
  ) => {
    const formControlRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergedRefs(
      ref as React.MutableRefObject<HTMLInputElement>,
      formControlRef
    );
    const [menuOpen, setIsMenuOpen] = useState(undefined);
    const initialState: TypeaheadState = {
      value: initialValue,
      invalid: false,
      menuList: initialValue
        ? menuList.filter((n) =>
            n.toLowerCase().startsWith(initialValue.toLowerCase())
          )
        : menuList,
    };
    const [state, setState] = useState(initialState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!menuOpen) {
        formControlRef.current?.click();
      }
      const filterMenuList = menuList.filter((n) => {
        const nLowerCase = n.toLowerCase();
        const valueLower = e.currentTarget.value.toLowerCase();
        return nLowerCase.startsWith(valueLower);
      });
      setState({
        ...state,
        value: e.currentTarget.value,
        menuList: filterMenuList,
      });
      if (onChangeInput) onChangeInput(e.currentTarget.value, e);
    };

    const controlProps = {
      onChange: handleChange,
      value: state.value,
      ref: inputRef,
      isInvalid: state.invalid,
      ...props,
    };

    const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
      if (onChangeInput) onChangeInput(e.currentTarget.textContent!, e);

      setState({
        ...state,
        value: e.currentTarget.textContent as string,
        menuList: state.menuList.filter(
          (c) => c === e.currentTarget.textContent!
        ),
      });
    };

    const focusDropdownItem = (event: React.FocusEvent<HTMLAnchorElement>) => {
      setState({
        ...state,
        value: event.currentTarget.textContent as string,
      });
    };

    return (
      <>
        {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
        <Dropdown focusFirstItemOnShow={false} drop={menuPlacement}>
          <InputGroup variant={hasIcon ? 'has-icon' : undefined}>
           {hasIcon && <i className="bi bi-search form-control-icon"></i>}
            <FormControlToggle
              {...controlProps}
              setIsMenuOpen={setIsMenuOpen}
            />
          </InputGroup> 

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
      </>
    );
  }
);

Typeahead.displayName = 'Typeahead';
Typeahead.propTypes = propTypes;
Typeahead.defaultProps = defaultProps;
export default Typeahead;
