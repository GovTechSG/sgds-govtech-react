import DropdownMenu from '../Dropdown/DropdownMenu';
import * as React from 'react';
import FormControl, { FormControlProps } from '../Form/FormControl';
import FormLabel from '../Form/FormLabel';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent } from '../utils/helpers';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownItem from '../Dropdown/DropdownItem';
import Dropdown from '../Dropdown/Dropdown';
import classNames from 'classnames';
import generateId from '../utils/generateId';
import SelectedItem from './SelectedItem';
import ComboboxToggle from './ComboboxToggle';

export type MenuPlacement = 'up' | 'down';
export type ComboboxMode = 'single' | 'multi';

export interface ComboboxProps extends Omit<FormControlProps, 'type'> {
  /**Initial value of input */
  initialValue?: string;
  /** Placement of menu in relation to input */
  menuPlacement?: MenuPlacement;
  /** Array of values to pass into menu */
  menuList: string[];
  /** The onChange handler for Combobox's input change */
  onChangeInput?: (
    val: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** The onChange handler when selection changes. 
   *  For multi-selection mode, this handler is also called when user removes a selection. */
  onChangeSelect?: (
    item: string,
    items: string[],
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  /** Adds a FormLabel to `<Combobox />` */
  label?: string;
  /** Adds icon defined to FormControl */
  icon?: React.ReactElement;
  /** Single or multi-selection */
  mode?: ComboboxMode;
}

const propTypes = {
  initialValue: PropTypes.string,
  onChangeInput: PropTypes.func,
  onChangeSelect: PropTypes.func,
  menuPlacement: PropTypes.oneOf<MenuPlacement>(['up', 'down']),
  menuList: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  icon: PropTypes.element,
  mode: PropTypes.oneOf<ComboboxMode>(['single', 'multi'])
};

interface ComboboxState {
  value: string;
  invalid: boolean;
  menuList: string[];
  selectedItems: string[];
}

const defaultProps: Partial<ComboboxProps> = {
  menuPlacement: 'down',
  initialValue: '',
  label: '',
  mode: 'single'
};

const removeDuplicates = (arr: any[]) => {
  return arr.filter((item: any, index: number) => arr.indexOf(item) === index);
}

export const Combobox: BsPrefixRefForwardingComponent<
  'input',
  ComboboxProps
> = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      menuPlacement = 'down',
      menuList,
      initialValue = '',
      onChangeInput,
      onChangeSelect,
      label = '',
      icon,
      mode = 'single',
      ...props
    },
    ref
  ) => {
    const comboboxControlRef = useRef<HTMLDivElement>(null);
    const comboboxRef = useMergedRefs(
      ref as React.MutableRefObject<HTMLDivElement>,
      comboboxControlRef
    );

    const dropdownMenuRef = useRef<HTMLUListElement>(null);

    const [menuOpen, setIsMenuOpen] = useState(undefined);

    const initialState: ComboboxState = {
      value: initialValue,
      invalid: false,
      menuList: initialValue
        ? removeDuplicates(menuList).filter((n) =>
          n.toLowerCase().startsWith(initialValue.toLowerCase())
        )
        : removeDuplicates(menuList),
      selectedItems: menuList.includes(initialValue) ? [initialValue] : []
    };
    const [state, setState] = useState(initialState);

    const [comboboxMenuId, setComboboxMenuId] = useState("")
    React.useEffect(() => {
      setComboboxMenuId(generateId('combobox', 'ul'));
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!menuOpen) comboboxControlRef.current?.click()

      const newInput = e.currentTarget.value;

      const newSelectedItems =
        mode === 'single' && menuList.includes(newInput) && !state.selectedItems.includes(newInput)
          ? [newInput]
          : (mode === 'single' ? [] : state.selectedItems)

      const newMenuList = mode === 'single'
        ? filterMenuList(removeDuplicates(menuList), newInput)
        : filterMenuList(removeDuplicates(menuList), newInput)
          .filter(item => !newSelectedItems.includes(item))

      setState({
        ...state,
        value: newInput,
        menuList: newMenuList,
        selectedItems: newSelectedItems
      });

      if (onChangeInput) onChangeInput(newInput, e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (mode === 'single') return;
      
      const prevInput = e.currentTarget.value;

      if (e.key === 'Backspace' && prevInput.length === 0 && state.selectedItems.length > 0) {
        const prevSelectedItem = state.selectedItems.slice(-1)[0];
        removeSelectedItem(prevSelectedItem)(e)
        if (!menuOpen) comboboxControlRef.current?.click()
      }
    }

    const filterMenuList = (menuList: string[], input: string) => {
      return menuList.filter(item => item.toLowerCase().startsWith(input.toLowerCase()))
    }

    const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (mode === 'multi') e.stopPropagation();

      const selectedItem = e.currentTarget.textContent!

      const newInput = mode === 'single' ? selectedItem : ''

      const newSelectedItems = mode === 'single'
        ? [selectedItem]
        : (state.selectedItems.includes(selectedItem)
          ? state.selectedItems
          : [...state.selectedItems, selectedItem])

      const newMenuList = mode === 'single'
        ? filterMenuList(removeDuplicates(menuList), newInput)
        : removeDuplicates(menuList)
          .filter(item => !newSelectedItems.includes(item))

      if (onChangeInput) onChangeInput(selectedItem, e);
      if (onChangeSelect) onChangeSelect(selectedItem, newSelectedItems, e)

      setState({
        ...state,
        value: newInput,
        menuList: newMenuList,
        selectedItems: newSelectedItems
      });
    };

    const removeSelectedItem = (itemToRemove: string) =>
      (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        const newSelectedItems = state.selectedItems.filter(item => item !== itemToRemove)

        const newMenuList = filterMenuList(removeDuplicates(menuList), state.value)
          .filter(item => !newSelectedItems.includes(item))

        if (onChangeSelect) onChangeSelect(itemToRemove, newSelectedItems, e)

        setState({
          ...state,
          menuList: newMenuList,
          selectedItems: newSelectedItems
        })
      }

    const focusDropdownItem = (event: React.FocusEvent<HTMLAnchorElement>) => {
      setState({
        ...state,
        value: event.currentTarget.textContent as string,
      });
    };

    const controlProps = {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      value: state.value,
      isInvalid: state.invalid,
      ...props,
    };

    return (
      <>
        {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
        <Dropdown
          className={icon && 'combobox'}
          focusFirstItemOnShow={false}
          drop={menuPlacement}
        >
          <ComboboxToggle
            ref={comboboxRef}
            setIsMenuOpen={setIsMenuOpen}
            role="combobox"
            aria-controls={comboboxMenuId}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                flex: "1 1 0%",
                gap: "2px",
                overflow: "hidden"
              }}>

              {mode === 'multi'
                && state.selectedItems.map((item, idx) => {
                  return <SelectedItem
                    key={idx}
                    label={item}
                    onRemove={removeSelectedItem(item)} />
                })}

              <FormControl
                style={{
                  border: "none",
                  boxShadow: "none",
                  width: "auto",
                  flex: "1 1 auto"
                }}
                {...controlProps}
                aria-autocomplete="list" />
            </div>

            {icon &&
              React.cloneElement(icon, {
                className: classNames(icon.props.className, 'form-control-icon'),
                style: { position: "static", float: "right" }
              })}
          </ComboboxToggle>

          {state.menuList.length > 0 && (
            <DropdownMenu ref={dropdownMenuRef} id={comboboxMenuId} role="listbox" menuItems={state.menuList}>
              {state.menuList.map((menuItem) => (
                <DropdownItem
                  as="button"
                  key={menuItem}
                  onClick={handleClickItem}
                  onFocus={focusDropdownItem}
                >
                  {menuItem}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </>
    );
  }
);

Combobox.displayName = 'Combobox';
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;
export default Combobox;
