import { Toast } from '@govtechsg/sgds-govtech-react/Toast';
import { useState } from "react";

const ToastCom = () => {
  const [show, setShow] = useState(true);
  return (
    <Toast onClose={() => setShow(false)} show={show}>
      <Toast.Header>
        <i style={{ color: '#0A8217' }} className="bi bi-check-circle me-2"></i>
        <strong className="me-auto">Title</strong>
      </Toast.Header>
      <Toast.Body>This is a toast message.</Toast.Body>
    </Toast>
  );
};

export default ToastCom