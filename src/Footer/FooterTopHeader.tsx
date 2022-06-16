import classNames from 'classnames';
import * as React from 'react';
import { forwardRef } from 'react';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';

export interface FooterTopHeaderProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** The title of FooterTopHeader */
  headerTitle?: React.ReactNode;
  /** Forwards css className to .title of FooterTopHeader */
  titleClass?: string;
  /** Forwards css className to .description of FooterTopHeader */
  descriptionClass?: string;
  /** Forwards css className to .col of FooterTopHeader */
  columnClass?: string;
}

const propTypes = {
  headerTitle: PropTypes.node,
  titleClass: PropTypes.string,
  descriptionClass: PropTypes.string,
  columnClass: PropTypes.string,
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string
};

const defaultProps = {
  columnClass: 'col-lg-6',
};

export const FooterTopHeader: BsPrefixRefForwardingComponent<
  'div',
  FooterTopHeaderProps
> = forwardRef<HTMLElement, FooterTopHeaderProps>(
  (
    {
      as: Component = 'div',
      headerTitle,
      children,
      bsPrefix,
      className,
      titleClass,
      descriptionClass,
      columnClass = 'col-lg-6',
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
        <div className={classNames('col', columnClass)}>
          <div className={classNames('title', titleClass)}>{headerTitle}</div>
          <div className={classNames('description', descriptionClass)}>
            {children}
          </div>
        </div>
      </Component>
    );
  }
);
FooterTopHeader.defaultProps = defaultProps;
FooterTopHeader.propTypes = propTypes;
FooterTopHeader.displayName = 'FooterTopHeader';
export default FooterTopHeader;
