'use client'
import { Button, Modal } from "@govtechsg/sgds-react";
import { useState } from "react";

const ModalCom = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-exclamation-triangle me-3"></i>
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCom;
