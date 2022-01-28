import * as React from 'react';
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
  | 'bsSwitchPrefix'
> &
  Omit<CardProps, 'dismissible' | 'dismiss' | 'variant'>;

export interface SelectableCardProps extends CardFormCheckProps {}

const defaultProps : Partial<SelectableCardProps> ={
  disabled: false, 
  type: 'checkbox',
}
const SelectableCard: React.FC<SelectableCardProps> = ({
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

SelectableCard.displayName = 'SelectableCard';
SelectableCard.defaultProps = defaultProps

export default SelectableCard;
