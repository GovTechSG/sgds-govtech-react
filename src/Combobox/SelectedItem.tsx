import * as React from 'react';
import { Button } from '../Button';

interface SelectedItemProps {
  label: string;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectedItem = ({ ...props }: SelectedItemProps) => {
  return (
    <div
      style={{ 
        display: "flex", 
        height: "fit-content", 
        borderRadius: "2px", 
        margin: "2px" }} 
      className="bg-primary">
      <span
        style={{ 
          display: "flex", 
          alignItems: "center", 
          whiteSpace: "initial", 
          overflow: "hidden", 
          textOverflow: "ellipsis" }}
        className="badge bg-primary sgds">
        {props.label}
      </span>
      <Button
        onClick={props.onRemove}
        style={{ padding: "0" }}>
        <i className="bi bi-x"></i>
      </Button>
    </div>
  )
}

export default SelectedItem;
