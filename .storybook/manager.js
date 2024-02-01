// .storybook/manager.js

import { addons } from '@storybook/addons';
import sgdsTheme from './sgdsTheme';

addons.setConfig({
  theme: sgdsTheme,
  panelPosition: 'right',
  enableShortcuts: true,
});