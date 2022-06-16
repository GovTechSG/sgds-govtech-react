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
import FooterSection from './FooterTop';
import PropTypes from 'prop-types';

export interface FooterProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
};

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

Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
export default Object.assign(Footer, {
  Top: FooterSection,
  Bottom: FooterBottom,
});
