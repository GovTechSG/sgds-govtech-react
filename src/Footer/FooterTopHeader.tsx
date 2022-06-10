import classNames from 'classnames';
import * as React from 'react';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';

export interface FooterTopHeaderProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: React.ReactNode;
  titleClass?: string;
  descriptionClass?: string;
}

export const FooterTopHeader: BsPrefixRefForwardingComponent<
  'div',
  FooterTopHeaderProps
> = React.forwardRef<HTMLElement, FooterTopHeaderProps>(
  (
    {
      as: Component = 'div',
      headerTitle,
      children,
      bsPrefix,
      className,
      titleClass,
      descriptionClass,
      ...props
    },
    ref
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'footer-header');
    return (
      <Component
        className={classNames(bsPrefix, className, 'row')}
        ref={ref}
        {...props}
      >
        <div className="col col-lg-6">
          <div className={classNames('title', titleClass)}>{headerTitle}</div>
          <div className={classNames('description', descriptionClass)}>
            {children}
          </div>
        </div>
      </Component>
    );
  }
);
