import * as React from 'react';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import useWrappedRefWithWarning from '../utils/useWrappedRefWithWarning';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownContext from '@restart/ui/DropdownContext';

export interface ComboboxToggleProps extends BsPrefixProps, React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  setIsMenuOpen: Function;
}

type ComboboxToggleComponent = BsPrefixRefForwardingComponent<
  'div',
  ComboboxToggleProps
>;

const ComboboxToggle: ComboboxToggleComponent = React.forwardRef(
  (
    {
      as: Component = 'div',
      setIsMenuOpen,
      ...props
    }: ComboboxToggleProps,
    ref
  ) => {
    const [toggleProps] = useDropdownToggle();
    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle')
    );

    const dropdownContext = React.useContext(DropdownContext);

    const { "aria-expanded": ariaExpanded, id, ...newToggleProps } = toggleProps
    

    if (setIsMenuOpen) {
      React.useEffect(() => {
        setIsMenuOpen(dropdownContext?.show);
      }, [dropdownContext?.show]);
    }
    
    return (
      <Component
        className="form-control"
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "0",
          paddingRight: "0"
        }}
        {...newToggleProps}
        {...props}
      />
    );
  }
);

export default ComboboxToggle;
