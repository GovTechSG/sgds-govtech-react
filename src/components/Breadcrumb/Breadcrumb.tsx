import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';
import BreadcrumbItem from './BreadcrumbItem';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../../utils/helpers';

export interface BreadcrumbProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

const propTypes = {
  /**
   * @default 'breadcrumb'
   */
  bsPrefix: PropTypes.string,

  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  ariaLabel: PropTypes.string,

  /**
   * Additional props passed as-is to the underlying `<ol>` element
   */
  listProps: PropTypes.object,

  as: PropTypes.elementType,
};

const defaultProps = {
  ariaLabel: 'breadcrumb',
  listProps: {},
};

export const Breadcrumb: BsPrefixRefForwardingComponent<'nav', BreadcrumbProps> =
  React.forwardRef<HTMLElement, BreadcrumbProps>(
    (
      {
        bsPrefix,
        className,
        listProps,
        children,
        ariaLabel,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as = 'nav',
        ...props
      },
      ref
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');

      return (
        <SGDSWrapper
          as={as}
          aria-label={ariaLabel}
          className={className}
          ref={ref}
          {...props}
        >
          <ol
            {...listProps}
            className={classNames(prefix, listProps?.className)}
          >
            {children}
          </ol>
        </SGDSWrapper>
      );
    }
  );

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Object.assign(Breadcrumb, {
  Item: BreadcrumbItem,
});
