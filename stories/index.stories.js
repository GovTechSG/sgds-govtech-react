import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../src/components';
import welcomeNotes from './notes/welcome.md';
import Welcome from './pages/welcome'
storiesOf('Welcome',module)
  .add('Introduction',()=> <Welcome></Welcome>,{
    notes: {markdown:welcomeNotes}
  })

storiesOf('Button', module)
  .add('with text', () => <Button>WOOOO</Button>,{
    notes: 'Hello this is a note'
  })
