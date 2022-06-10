import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface FooterTopContactLinksProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const FooterTopContactLinks: BsPrefixRefForwardingComponent<
  'div',
  FooterTopContactLinksProps
> = React.forwardRef<HTMLDivElement, FooterTopContactLinksProps>(
  ({ as: Component = 'div', children, bsPrefix, className, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix,'footer-contact-links')
    return (
      <Component className={classNames(bsPrefix, 'row', className)} ref={ref} {...props}>
        <div className="col">
          <div className="d-flex justify-content-lg-end">
            <ul>{children}</ul>
          </div>
        </div>
      </Component>
    );
  }
);

export default FooterTopContactLinks;
