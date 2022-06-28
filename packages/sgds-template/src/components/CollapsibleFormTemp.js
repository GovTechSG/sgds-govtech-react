import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  DatePicker,
  Dropdown,
  Accordion,
} from "@govtechsg/sgds-react";
import React from "react";
import { FooterTemp } from "./FooterTemp"
import { MastheadTemp } from "./Masthead.js";

export const CollapsibleFormTemp = () => {
  return (
    <div>
      <MastheadTemp />
      <div className="p-3 mb-3">
        <Accordion defaultActiveKey='0' className='mb-4'>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Header 1</Accordion.Header>
            <Accordion.Body>
              <Col xs={8}>
                <Form>
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
                </Form>
              </Col>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Header 2</Accordion.Header>
            <Accordion.Body>
              <Form.Group className='mb-4'>
                <Form.Label>Label</Form.Label>
                <DatePicker />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Dropdown>
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>Header 3</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button className="mb-3">Submit</Button>
      </div>
      <FooterTemp />
    </div>
  );
};
