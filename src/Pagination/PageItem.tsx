/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ReactNode } from 'react';
import Anchor from '@restart/ui/Anchor';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';

export interface PageItemProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  disabled?: boolean;
  active?: boolean;
  href?: string;
}

const propTypes = {
  /** Disables the PageItem */
  disabled: PropTypes.bool,

  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: PropTypes.bool,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,
};

const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)',
};

const PageItem: BsPrefixRefForwardingComponent<'li', PageItemProps> =
  React.forwardRef<HTMLLIElement, PageItemProps>(
    (
      {
        active,
        disabled,
        className,
        style,
        children,
        ...props
      }: PageItemProps,
      ref,
    ) => {
      const Component = active || disabled ? 'span' : Anchor;
      return (
        <li
          ref={ref}
          style={style}
          className={classNames(className, 'page-item', { active, disabled })}
        >
          <Component className="page-link" disabled={disabled} {...props}>
            {children}
          </Component>
        </li>
      );
    },
  );

PageItem.propTypes = propTypes;
PageItem.defaultProps = defaultProps;
PageItem.displayName = 'PageItem';

export default PageItem;

function createButton(name: string, defaultValue: ReactNode) {
  function Button({ children, ...props }: PageItemProps) {
    return (
      <PageItem {...props}>
        <span>{children || defaultValue}</span>
      </PageItem>
    );
  }

  Button.displayName = name;

  return Button;
}

export const First = createButton('First', '«');
export const Prev = createButton('Previous', '‹');
export const Ellipsis = createButton('Ellipsis', '…');
export const Next = createButton('Next', '›');
export const Last = createButton('Last', '»');
