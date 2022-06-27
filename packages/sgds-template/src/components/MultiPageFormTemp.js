import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  DatePicker,
  Dropdown,
  useStep,
  Stepper,
} from "@govtechsg/sgds-govtech-react";
import React, { useState } from "react";

export const MultiPageFormTemp = () => {
  const initialState = {
    formSinglePageInput1: "",
    lastName: "",
    gender: "",
    email: "",
    address: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState(initialState);
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const ComponentOne = (
    <>
      <Col xs={8}>
        <Row>
          <Form.Group
            as={Col}
            xs={6}
            className='mb-3'
            controlId='formSinglePageInput1'
          >
            <Form.Label>Label</Form.Label>
            <Form.Control
              type='text'
              placeholder='Text goes here'
              name='formSinglePageInput1'
              onChange={handleChange}
              value={details.formSinglePageInput1}
            />
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
      </Col>
    </>
  );
  const ComponentTwo = (
    <>
      <Col xs={8}>
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
      </Col>
    </>
  );
  const ComponentThree = (
    <>
      <Col xs={8}>
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
      </Col>
    </>
  );
  const stepMethods = useStep([
    {
      component: ComponentOne,
      title: "Marker 1",
      stepHeader: "Marker 1",
    },
    {
      component: ComponentTwo,
      title: "Marker 2",
      stepHeader: "Marker 2",
    },
    {
      component: ComponentThree,
      title: "Marker 3",
      stepHeader: "Marker 3",
    },
  ]);
  const {
    state: stepState,
    stepsMetadata,
    getTitle,
    setStep,
    nextStep,
    prevStep,
    getNextButtonTitle,
    getBackButtonTitle,
    getComponent,
    reset,
  } = stepMethods;
  const resetForm = () => {
    setDetails(initialState);
    reset();
  };
  const submit = () => {
    alert("Form Submitted");
    setSubmitted(true);
  };
  return (
    <>
      {submitted ? (
        <div>Submitted!</div>
      ) : (
        <>
          <Stepper methods={stepMethods} />
          <Form className='p-3'>
            <div>{getComponent()}</div>
            <div className='d-flex justify-content-between'>
              <div>
                {getBackButtonTitle() && (
                  <Button onClick={prevStep} variant='danger' className='me-3'>
                    {getBackButtonTitle()}
                  </Button>
                )}
                <Button onClick={resetForm} variant='secondary'>
                  Reset
                </Button>
              </div>
              <div>
                <Button
                  onClick={
                    stepsMetadata.isLastStep(stepState.currentStep)
                      ? submit
                      : nextStep
                  }
                >
                  {" "}
                  {getNextButtonTitle()}
                </Button>
                <Button
                  className='ms-3'
                  onClick={() => setStep(3)}
                  variant='warning'
                >
                  Jump to last page
                </Button>
              </div>
            </div>
          </Form>
        </>
      )}
    </>
  );
};
