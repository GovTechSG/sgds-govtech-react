
import createWithBsPrefix from '../utils/createWithBsPrefix';

export const DropdownHeader = createWithBsPrefix('dropdown-header', {
    defaultProps: { role: 'heading' },
  });
  
  export const DropdownDivider = createWithBsPrefix('dropdown-divider', {
    Component: 'hr',
    defaultProps: { role: 'separator' },
  });
  
  export const DropdownItemText = createWithBsPrefix('dropdown-item-text', {
    Component: 'span',
  });