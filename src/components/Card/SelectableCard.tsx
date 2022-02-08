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
  Omit<CardProps, 'variant'>;

export interface SelectableCardProps extends CardFormCheckProps {
}

const defaultProps: Partial<SelectableCardProps> = {
  disabled: false,
  type: 'checkbox',
};
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
  };
  return (
    <Card
      ref={cardRef}
      onClick={handleSelect}
      tabIndex={0}
      variant="card-action"
      className={props.checked ? 'is-active' : undefined}
      {...cardProps}
    >
      <Card.Body>
        <div>{children}</div>
        <FormCheck
          ref={formCheckRef}
          {...formCheckProps}
          onClick={handleSelect}
        ></FormCheck>
      </Card.Body>
    </Card>
  );
};

SelectableCard.displayName = 'SelectableCard';
SelectableCard.defaultProps = defaultProps;

export default SelectableCard;
