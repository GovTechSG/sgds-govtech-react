import { Toast, ToastHeader, ToastBody } from "@govtechsg/sgds-react";

const ToastCom = () => {
    return <Toast show={true}>
        <ToastHeader>
            <i className="bi bi-check-circle me-2"></i>
            <strong className="me-auto">Title</strong>
        </ToastHeader>
        <ToastBody>This is a toast message.</ToastBody>
    </Toast>
}

export default ToastCom;
