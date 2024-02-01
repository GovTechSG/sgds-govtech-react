import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'SGDS React Storybook',
  brandUrl: 'https://react.designsystem.tech.gov.sg/?path=/story/install--page',
  brandImage: 'https://v2dev.designsystem.tech.gov.sg/assets/img/logo-sgds.svg',
  brandTarget: '_self',

  //
  colorPrimary: '#5925dc',
  colorSecondary: '#5925dc',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#D0D5DD',
  appBorderRadius: 5,

  // Text colors
  textColor: '#1D2939',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#5925dc',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#98a2b3',
  inputTextColor: '#1D2939',
  inputBorderRadius: 5,
});