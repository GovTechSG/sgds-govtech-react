import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import { useBootstrapPrefix, SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import PageItem, { Ellipsis, First, Last, Next, Prev } from '../PageItem';
import { BsPrefixProps } from '../helpers';

type PaginationBaseSize = 'sm' | 'md' | 'lg';

export interface PaginationBaseProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLUListElement> {
  size?: 'sm' | 'md' | 'lg';
}

const propTypes = {
  /**
   * @default 'pagination'
   * */
  bsPrefix: PropTypes.string,

  /**
   * Set's the size of all PageItems.
   *
   * @type {('sm' | 'md' | lg')}
   */
  size: PropTypes.oneOf<PaginationBaseSize>(['sm', 'md', 'lg']),
};

/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
const PaginationBase = React.forwardRef<HTMLUListElement, PaginationBaseProps>(
  ({ bsPrefix, className, size, ...props }, ref) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
    return (
      <SGDSWrapper
        as="ul"
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          size && `${decoratedBsPrefix}-${size}`
        )}
      />
    );
  }
);

PaginationBase.propTypes = propTypes;
PaginationBase.displayName = 'PaginationBase';

export default Object.assign(PaginationBase, {
  First,
  Prev,
  Ellipsis,
  Item: PageItem,
  Next,
  Last,
});
