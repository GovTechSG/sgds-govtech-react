import classNames from 'classnames';
import * as React from 'react';
import {
  SGDSWrapper,
  useBootstrapPrefix,
} from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import FooterBottom from './FooterBottom';
import FooterTop from './FooterTop';

export interface FooterProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

export const Footer: BsPrefixRefForwardingComponent<'footer', FooterProps> =
  React.forwardRef<HTMLElement, FooterProps>(
    ({ as: Component = 'footer', bsPrefix, className, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'footer');
      return (
        <SGDSWrapper
          as={Component}
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    }
  );

export default Object.assign(Footer, {
  Top: FooterTop,
  Bottom: FooterBottom,
});
