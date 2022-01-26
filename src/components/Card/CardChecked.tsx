
import * as React from 'react';
import { BsPrefixProps } from '../helpers';
import FormCheck, {FormCheckProps} from '../Form/FormCheck'
import Card from './Card';

export interface ActionCardProps
  extends BsPrefixProps,
  FormCheckProps {}

const CardChecked: React.FC<ActionCardProps> = ({children, type}) => {
  const formCheckRef = React.useRef<HTMLInputElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    formCheckRef?.current?.click();
    return formCheckRef?.current?.checked ? cardRef?.current?.focus() : cardRef?.current?.blur();
};
   
  return (
    <Card ref={cardRef} onClick={handleSelect} tabIndex={0}>
      <FormCheck ref={formCheckRef} type={type} onClick={handleSelect}></FormCheck>
      {children}
    </Card>
  );
};

export default CardChecked;
