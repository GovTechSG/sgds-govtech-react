import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';
import createWithBsPrefix from '../createWithBsPrefix';
import divWithClassName from '../divWithClassName';
import CardImg from './CardImg';
import CardHeader from './CardHeader';
import CardChecked from './CardChecked'
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../helpers';
import { Color, Variant } from '../types';

const DivStyledAsH6 = divWithClassName('h6');
const CardBody = createWithBsPrefix('card-body');
const CardTitle = createWithBsPrefix('card-title', {
  Component: 'h3',
});
const CardSubtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});
const CardLink = createWithBsPrefix('card-link', { Component: 'a' });
const CardStretchedLink = createWithBsPrefix('card-link stretched-link', { Component: 'a' });
const CardText = createWithBsPrefix('card-text', { Component: 'p' });
const CardFooter = createWithBsPrefix('card-footer');
const CardImgOverlay = createWithBsPrefix('card-img-overlay');

export interface CardProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  text?: Color;
  border?: Variant;
  body?: boolean;
  actionCSS?: string;
  checked? : boolean;
}

const defaultProps = {
  body: false,
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
        body,
        children,
        actionCSS,
        checked,
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
            border && `border-${border}`,
            
          )}
        >
          {body ? <CardBody>{children}</CardBody> : children}
        </SGDSWrapper>
      );
    }
  );

Card.displayName = 'Card';
Card.defaultProps = defaultProps;

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
  Checked : CardChecked
});
