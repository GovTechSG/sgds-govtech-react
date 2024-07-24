import 'bootstrap-icons/font/bootstrap-icons.css';
import './static/global.css';
import { themes } from '@storybook/theming';
// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  docs: {
    theme: themes.sgdsTheme,
    // source: {
    //   type: 'code',
    // },
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        ['Introduction', 'Installation', 'Usage', 'Frameworks'],
        'Troubleshooting',
        'Components',
      ],
    },
  },
};
