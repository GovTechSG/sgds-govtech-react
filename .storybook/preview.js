import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/index.css';
// import '@govtechsg/sgds/sgds/sgds.css'
// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  // docs: {
  //   source: {
  //     type: 'code',
  //   },
  // },
  options: {
    storySort: {
      order: ['Install', 'Usage', 'Components'],
    },
  },
};
