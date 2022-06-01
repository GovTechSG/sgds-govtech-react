import { useState } from 'react';
import { Alert } from '@govtechsg/sgds-govtech-react/Alert';
import { Button } from '@govtechsg/sgds-govtech-react/Button';

 const AlertCom = () => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert dismissible onClose={() => setShow(false)}>
        <i className="bi bi-info-circle flex-shrink-0 me-4"></i>
        This is an Alert
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};
export default AlertCom