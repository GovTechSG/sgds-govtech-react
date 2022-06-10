import classNames from 'classnames';
import * as React from 'react';
import createWithBsPrefix from '../utils/createWithBsPrefix';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';

export interface FooterTopItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  itemTitle?: React.ReactNode;
  titleClass?: string;
  linksClass?: string;
}

const propTypes = {
  /** Category name of each Item */
  itemTitle: PropTypes.node,

  /** Forwards title className to .title */
  titleClass: PropTypes.string,

  /** Forwards links className to .links */
  linksClass: PropTypes.string,
};

export const FooterTopItems = createWithBsPrefix('row footer-items');

export const FooterTopItem: BsPrefixRefForwardingComponent<
  'div',
  FooterTopItemProps
> = React.forwardRef<HTMLElement, FooterTopItemProps>(
  (
    {
      as: Component = 'div',
      itemTitle,
      children,
      className,
      titleClass,
      linksClass,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={classNames('col-lg-3', className)}
        ref={ref}
        {...props}
      >
        <div className={classNames('title', titleClass)}>{itemTitle}</div>
        <ul className={classNames('links', linksClass)}>
          {React.Children.map(children, (child) => (
            <li>{React.cloneElement(child as React.ReactElement)}</li>
          ))}
        </ul>
      </Component>
    );
  }
);

FooterTopItem.displayName = 'FooterTopItem';
FooterTopItem.propTypes = propTypes;
export default FooterTopItem;
