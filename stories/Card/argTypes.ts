import { VARIANT } from '../helpers';

export const CARD_COMMON_PROPS = {
  bg: {
    description: 'Sets card background',
    control: { type: 'select' },
    options: VARIANT,
  },
  border: {
    description: 'Sets card border color',
    control: { type: 'select' },
    options: VARIANT,
  },
};
