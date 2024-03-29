import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';

export interface FooterBottomLinksProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string
};

export const FooterBottomLinks: BsPrefixRefForwardingComponent<
  'div',
  FooterBottomLinksProps
> = React.forwardRef<HTMLDivElement, FooterBottomLinksProps>(
  ({ as: Component = 'div', children, className, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-mandatory-links');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix, 'row')}
        {...props}
      >
        <div className="col">
          <ul>
            {React.Children.map(children, (child) => (
              <li>{React.cloneElement(child as React.ReactElement)}</li>
            ))}
          </ul>
        </div>
      </Component>
    );
  }
);

FooterBottomLinks.propTypes = propTypes;
FooterBottomLinks.displayName = 'FooterBottomLinks';

export default FooterBottomLinks;
