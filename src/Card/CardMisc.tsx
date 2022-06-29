import createWithBsPrefix from '../utils/createWithBsPrefix';
import divWithClassName from '../utils/divWithClassName';

export const CardTitle = createWithBsPrefix('card-title', {
  Component: 'h3',
});

const DivStyledAsH6 = divWithClassName('h6');

export const CardSubtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});

export const CardLink = createWithBsPrefix('card-link', { Component: 'a' });
export const CardStretchedLink = createWithBsPrefix(
  'card-link stretched-link',
  {
    Component: 'a',
  }
);
export const CardText = createWithBsPrefix('card-text', { Component: 'p' });
export const CardFooter = createWithBsPrefix('card-footer');
export const CardImgOverlay = createWithBsPrefix('card-img-overlay');
export const CardUnit = createWithBsPrefix('card-unit', { Component: 'div' });
export const CardBody = createWithBsPrefix('card-body');
