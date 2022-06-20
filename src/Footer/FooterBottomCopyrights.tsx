import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';

export interface FooterBottomCopyrightsProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
};

export const FooterBottomCopyrights: BsPrefixRefForwardingComponent<
  'div',
  FooterBottomCopyrightsProps
> = React.forwardRef<HTMLDivElement, FooterBottomCopyrightsProps>(
  ({ as: Component = 'div', children, className, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-copyrights');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix, 'row')}
        {...props}
      >
        <div className="col">
          <div className="d-flex justify-content-lg-end">{children}</div>
        </div>
      </Component>
    );
  }
);

FooterBottomCopyrights.propTypes = propTypes;
FooterBottomCopyrights.displayName = 'FooterBottomCopyrights';

export default FooterBottomCopyrights;
