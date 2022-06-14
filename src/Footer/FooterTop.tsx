import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import FooterTopContactLinks from './FooterTopContactLinks';
import { FooterTopHeader } from './FooterTopHeader';
import { FooterTopItem } from './FooterTopItem';
import {FooterTopItemGroup} from './FooterTopItemGroup'

export interface FooterTopProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

export const FooterTop: BsPrefixRefForwardingComponent<
  'section',
  FooterTopProps
> = React.forwardRef<HTMLElement, FooterTopProps>(
  (
    { as: Component = 'section', children, className, bsPrefix, ...props },
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-top');
    return (
      <Component
        ref={ref}
        className={classNames(bsPrefix, className)}
        {...props}
      >
        <div className="container-fluid">{children}</div>
      </Component>
    );
  }
);

export default Object.assign(FooterTop, {
  Header: FooterTopHeader,
  ItemGroup: FooterTopItemGroup,
  Item: FooterTopItem,
  ContactLinks: FooterTopContactLinks,
});
