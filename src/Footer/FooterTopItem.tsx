import classNames from 'classnames';
import * as React from 'react';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import PropTypes from 'prop-types';
import FooterTopItemGrpContext from './FooterTopItemsContext';

export interface FooterTopItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Category name of each item */
  itemTitle?: React.ReactNode;
  /** Forwards title className to .title */
  titleClass?: string;
  /** Forwards links className to .links */
  linksClass?: string;
}

const propTypes = {
  itemTitle: PropTypes.node,
  titleClass: PropTypes.string,
  linksClass: PropTypes.string,
};

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
    const { noOfItem } = React.useContext(FooterTopItemGrpContext);
    const colSize = noOfItem < 5 ? 'col-lg-3' : 'col-lg-2';
    return (
      <Component
        className={classNames(colSize, className)}
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
