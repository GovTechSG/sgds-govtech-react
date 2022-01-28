import * as React from 'react';
import { BsPrefixProps } from '../helpers';
import FormCheck, { FormCheckProps } from '../Form/FormCheck';
import Card from './Card';
import { CardProps } from '..';
type CardFormCheckProps = Omit<
  FormCheckProps,
  | 'isValid'
  | 'isInvalid'
  | 'feedback'
  | 'feedbackTooltip'
  | 'feedbackType'
  | 'inline'
  | 'label'
> &
  Omit<CardProps, 'dismissible' | 'dismiss' | 'variant'>;

export interface ActionCardProps extends BsPrefixProps, CardFormCheckProps {}

const ActionCard: React.FC<ActionCardProps> = ({
  children,
  bg,
  text,
  border,
  ...props
}) => {
  const formCheckRef = React.useRef<HTMLInputElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const formCheckProps = props;
  const cardProps = { bg, text, border };
  const handleSelect = () => {
    formCheckRef?.current?.click();
    return formCheckRef?.current?.checked
      ? cardRef?.current?.focus()
      : cardRef?.current?.blur();
  };
  return (
    <Card
      ref={cardRef}
      onClick={handleSelect}
      tabIndex={0}
      variant="card-action"
      {...cardProps}
    >
      <FormCheck
        ref={formCheckRef}
        {...formCheckProps}
        onClick={handleSelect}
      ></FormCheck>
      {children}
    </Card>
  );
};

export default ActionCard;
