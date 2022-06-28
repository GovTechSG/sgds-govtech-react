import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import FooterBottomCopyrights from './FooterBottomCopyrights';
import FooterBottomLinks from './FooterBottomLinks';

export interface FooterBottomProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
}

export const FooterBottom: BsPrefixRefForwardingComponent<
  'section',
  FooterBottomProps
> = React.forwardRef<HTMLElement, FooterBottomProps>(
  (
    {
      as: Component = 'section',
      children,
      bsPrefix,
      className,
      ...props
    },
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-bottom');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      >
        <div className="container-fluid">
          {children}
        </div>
      </Component>
    );
  }
);

export default Object.assign(FooterBottom, {
   Links: FooterBottomLinks,
   Copyrights: FooterBottomCopyrights
  });
  
  