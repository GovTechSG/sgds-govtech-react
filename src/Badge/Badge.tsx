import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { useBootstrapPrefix, SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../utils/helpers';
import { Color, Variant } from '../utils/types';

export interface BadgeProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Sets the background styling of the badge */
  bg?: Variant;
  /** Add the `pill` modifier to make badges more rounded with some additional horizontal padding. */
  pill?: boolean;
  /** Sets badge text color */
  text?: Color;
  /** Controls badge position to the corner of a Component and shape of badge is a circle. Use with Component as a wrapper with `.position-relative `css */
  textIndicator?: boolean;
  /**Controls badge position to the corner of a Component. Use with Component as a wrapper with `.position-relative `css */
  dotIndicator?: boolean;
}

const propTypes = {
  /** @default 'badge' */
  bsPrefix: PropTypes.string,

  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: PropTypes.string,

  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: PropTypes.bool,

  /**
   * Sets badge text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  text: PropTypes.string,

  /** @default span */
  as: PropTypes.elementType,
  textIndicator: PropTypes.bool,
  dotIndicator: PropTypes.bool,
};

const defaultProps = {
  bg: 'primary',
  pill: false,
  textIndicator: false,
  dotIndicator: false
};

export const Badge: BsPrefixRefForwardingComponent<'span', BadgeProps> =
  React.forwardRef<HTMLElement, BadgeProps>(
    (
      { bsPrefix, bg, pill, text, className, textIndicator, dotIndicator, as: Component = 'span', ...props },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'badge');
      return (
        <SGDSWrapper
        as={Component}
          ref={ref}
          {...props}
          className={classNames(
            className,
            prefix,
            pill && `rounded-pill`,
            text && `text-${text}`,
            bg && `bg-${bg}`,
            (textIndicator || dotIndicator) && 'position-absolute top-0 start-100 translate-middle',
            dotIndicator && 'p-2 border border-light rounded-circle'
          )}
        >
          {dotIndicator && <span className='visually-hidden'>New alerts</span> }
          {props.children}
        </SGDSWrapper>
      );
    },
  );

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;


