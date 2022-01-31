import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import {
  useBootstrapPrefix,
  SGDSWrapper,
} from '../ThemeProvider/ThemeProvider';
import createWithBsPrefix from '../createWithBsPrefix';
import divWithClassName from '../divWithClassName';
import CardImg from './CardImg';
import CardHeader from './CardHeader';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from '../helpers';
import { Color, Variant, CardVariant } from '../types';
import { CloseButton } from '..';

const DivStyledAsH6 = divWithClassName('h6');
const CardBody = createWithBsPrefix('card-body');
const CardTitle = createWithBsPrefix('card-title', {
  Component: 'h3',
});
const CardSubtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});
const CardLink = createWithBsPrefix('card-link', { Component: 'a' });
const CardStretchedLink = createWithBsPrefix('card-link stretched-link', {
  Component: 'a',
});
const CardText = createWithBsPrefix('card-text', { Component: 'p' });
const CardFooter = createWithBsPrefix('card-footer');
const CardImgOverlay = createWithBsPrefix('card-img-overlay');

export interface CardProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  text?: Color;
  border?: Variant;
  variant?: CardVariant;
  dismissible?: boolean;
  dismiss?: Function; 
}


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
        dismissible = false,
        dismiss,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...props
      },
      ref
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'card');
      const [disappear, setDisappear] = useState(false);
      const handleDismiss = () => {
        if (dismiss){
          dismiss()
          setDisappear(!disappear)
        } else
        setDisappear(!disappear)
      };
      if (disappear) return null;
      else
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
            {dismissible ? <CloseButton onClick={handleDismiss} /> : null}
            {children}
          </SGDSWrapper>
        );
    }
  );

Card.displayName = 'Card';

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
});
