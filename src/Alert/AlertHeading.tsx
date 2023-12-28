
import divWithClassName from '../utils/divWithClassName';
import createWithBsPrefix from '../utils/createWithBsPrefix';

const DivStyledAsH4 = divWithClassName('h4');

 export const AlertHeading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4,
});

export default AlertHeading;