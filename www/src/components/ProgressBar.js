import { ProgressBar } from '@govtechsg/sgds-govtech-react/ProgressBar';
import { Button } from '@govtechsg/sgds-govtech-react/Button';
import { useState } from 'react';

const ProgressBarCom = () => {
  const current = 20;
  const [percentage, setPercentage] = useState(current);
  let incrementHandler = () => {
    if (percentage < 100) {
      setPercentage(percentage + 20);
    }
  };
  let decrementHandler = () => {
    if (percentage > 0) {
      setPercentage(percentage - 20);
    }
  };
  return (
    <>
      <ProgressBar now={percentage} label={`${percentage}%`} />
      <div className="mt-4">
        <Button className="me-3" variant="danger" onClick={decrementHandler}>
          Back
        </Button>
        <Button variant="dark" onClick={incrementHandler}>
          Next
        </Button>
      </div>
    </>
  );            
};
export default ProgressBarCom;
