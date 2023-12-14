import { Button, Form } from "@govtechsg/sgds-react";
import { FormEvent } from "react";

const FormCom = () => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('submission prevented');
    };
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Text className="text-muted">
                    We&apos;ll never share your email with anyone else.
                </Form.Text>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Text className="text-muted">
                    Password has to be a combination of alphanumeric.
                </Form.Text>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default FormCom;
