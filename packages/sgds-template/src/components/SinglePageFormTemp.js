import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  DatePicker,
  Dropdown,
} from "@govtechsg/sgds-react";
import React from "react";
import { FooterTemp }from "./FooterTemp.js"

export const SinglePageFormTemp = (args) => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submission prevented");
  };
  return (
    <div>
      <Col xs={8} className="p-3" >
        <Form onSubmit={onSubmit} {...args} className="mb-3">
          <Row>
            <Form.Group
              as={Col}
              xs={6}
              className='mb-3'
              controlId='formSinglePageInput1'
            >
              <Form.Label>Label</Form.Label>
              <Form.Control type='text' placeholder='Text goes here' />
            </Form.Group>
            <Form.Group
              as={Col}
              xs={6}
              className='mb-3'
              controlId='formSinglePageInput2'
            >
              <Form.Label>Label</Form.Label>
              <Form.Control type='text' placeholder='Text goes here' />
            </Form.Group>
          </Row>
          <Form.Group className='mb-3' controlId='formSinglePageInput3'>
            <Form.Label>Label</Form.Label>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='Text goes here'
                aria-label='Dollar amount (with dot and two decimal places)'
              />
              <InputGroup.Text>@something</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formSinglePageInput4'>
            <Form.Label>Label</Form.Label>
            <Form.Control type='text' placeholder='Text goes here' />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Label</Form.Label>
            <DatePicker />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Dropdown {...args}>
              <Dropdown.Toggle>
                Label Dropdown Button<i className='bi bi-chevron-down'></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='#' eventKey='abc'>
                  Action
                </Dropdown.Item>
                <Dropdown.Item href='#'>Another action</Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Clicked")}>
                  Something else
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formSinglePageRadio1'>
            <Form.Label>Label</Form.Label>
            <Form.Check type='radio' name='radioGroup1' label='Input 1' />
            <Form.Check type='radio' name='radioGroup1' label='Input 2' />
            <Form.Check type='radio' name='radioGroup1' label='Input 3' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formSinglePageInput5'>
            <Form.Label>Label</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              type='text'
              placeholder='This is the text that has been filled in'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox1'>
            <Form.Check
              type='checkbox'
              label='I agree to the terms of the Subscriber Agreement and the Privacy Policy'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
      <FooterTemp />
    </div>
  );
};
