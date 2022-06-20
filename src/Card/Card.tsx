import classNames from 'classnames';
import * as React from 'react';
import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';
import CardImg from './CardImg';
import CardHeader from './CardHeader';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from '../utils/helpers';
import { Color, Variant, CardVariant } from '../utils/types';
import PropTypes from 'prop-types';

import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardStretchedLink,
  CardText,
  CardFooter,
  CardImgOverlay,
  CardUnit,
} from './CardMisc';

export interface CardProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  /** Sets card background */
  bg?: Variant;
  /** Sets card text color */
  text?: Color;
  /** Sets card border color */
  border?: Variant;
  /** Use on actionable cards like SelectableCard and Quantity Toggle Card' */
  variant?: CardVariant;
}
const propTypes = {
  /**
   * @default 'card'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets card background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: PropTypes.string,

  /**
   * Sets card text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|'white'|'muted')}
   */
  text: PropTypes.string,

  /**
   * Sets card border color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  border: PropTypes.string,
  as: PropTypes.elementType,
  variant: PropTypes.oneOf<CardVariant>([
    'card-action',
    'card-action-quantity-toggle',
  ]),
};

export const Card: BsPrefixRefForwardingComponent<'div', CardProps> =
  React.forwardRef<HTMLElement, CardProps>(
    (
      {
        bsPrefix,
        className,
        bg,
        text,
        border,
        children,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...props
      },
      ref
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'card');

      return (
        <SGDSWrapper
          as={Component}
          ref={ref}
          {...props}
          className={classNames(
            className,
            prefix,
            bg && `bg-${bg}`,
            text && `text-${text}`,
            border && `border-${border}`
          )}
        >
          {children}
        </SGDSWrapper>
      );
    }
  );

Card.displayName = 'Card';
Card.propTypes = propTypes;

export default Object.assign(Card, {
  Img: CardImg,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Link: CardLink,
  StretchedLink: CardStretchedLink,
  Text: CardText,
  Header: CardHeader,
  Footer: CardFooter,
  ImgOverlay: CardImgOverlay,
  Unit: CardUnit,
});
