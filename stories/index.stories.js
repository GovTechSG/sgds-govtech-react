import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../src/components';
import welcomeNotes from './notes/welcome.md';
import buttonNotes from './notes/components/buttons.md';
import Welcome from './pages/welcome.stories'
import {ButtonDoc} from './components';
storiesOf('Welcome',module)
  .add('Introduction',()=> <Welcome></Welcome>,{
    notes: {markdown:welcomeNotes}
  })

storiesOf('Components', module)
  .add('Buttons', () => <ButtonDoc/> ,{
    notes: {markdown:buttonNotes}
  })
