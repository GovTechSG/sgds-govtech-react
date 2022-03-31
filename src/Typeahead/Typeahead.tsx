import DropdownMenu from '../Dropdown/DropdownMenu';
import * as React from 'react';
import { FormControlProps } from '../Form/FormControl';
import  FormLabel  from '../Form/FormLabel';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownItem from '../Dropdown/DropdownItem';
import { Dropdown } from '..';
import TypeaheadToggle from './TypeaheadToggle';

export type MenuPlacement = 'up' | 'down';

export interface TypeaheadProps extends Omit<FormControlProps, 'type'> {
  initialValue?: string;
  menuPlacement?: MenuPlacement;
  menuList: string[];
  onChangeInput?: (
    val: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>
  ) => void;
  label? : string;
}

const propTypes = {
  initialValue: PropTypes.string,
  onChangeInput: PropTypes.func,
  menuPlacement: PropTypes.oneOf<MenuPlacement>(['up', 'down']),
  menuList: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string
};

interface TypeaheadState {
  value: string;
  invalid: boolean;
  menuList: string[];
}

const defaultProps: Partial<TypeaheadProps> = {
  menuPlacement: 'down',
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
          <TypeaheadToggle {...controlProps} setIsMenuOpen={setIsMenuOpen} />
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
