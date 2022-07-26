import { Button } from '@govtechsg/sgds-react/Button';
import { Stepper, useStep } from '@govtechsg/sgds-react/Stepper';
import { useState } from 'react';
import { Form } from '@govtechsg/sgds-react/Form';

const StepperCom = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    address: '',
  };
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState(initialState);
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const ComponentOne = (
    <>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Text className="text-muted">Enter first name</Form.Text>
        <Form.Control
          type="text"
          name="firstName"
          onChange={handleChange}
          value={details.firstName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Text className="text-muted">Enter last name</Form.Text>
        <Form.Control
          type="text"
          name="lastName"
          onChange={handleChange}
          value={details.lastName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="radio"
          name="gender"
          value="female"
          label="Female"
          inline
          onChange={handleChange}
          checked={details.gender === 'female'}
        />
        <Form.Check
          type="radio"
          name="gender"
          value="male"
          label="Male"
          inline
          onChange={handleChange}
          checked={details.gender === 'male'}
        />
      </Form.Group>
    </>
  );
  const ComponentTwo = (
    <>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Text className="text-muted">Enter email</Form.Text>
        <Form.Control
          type="email"
          name="email"
          onChange={handleChange}
          value={details.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>House Address</Form.Label>
        <Form.Text className="text-muted">
          e.g Blk 24 Seng Kang Way #02-05
        </Form.Text>
        <Form.Control
          type="text"
          name="address"
          onChange={handleChange}
          value={details.address}
        />
      </Form.Group>
    </>
  );
  const ComponentThree = (
    <>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={details.firstName}
          name="firstName"
          plaintext
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={details.lastName}
          plaintext
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="radio"
          name="gender"
          value="female"
          label="Female"
          inline
          checked={details.gender === 'female'}
          readOnly
        />
        <Form.Check
          type="radio"
          name="gender"
          value="male"
          label="Male"
          inline
          checked={details.gender === 'male'}
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          readOnly
          value={details.email}
          plaintext
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>House Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          readOnly
          value={details.address}
          plaintext
        />
      </Form.Group>
    </>
  );
  const stepMethods = useStep([
    {
      component: ComponentOne,
      title: 'Personal Details',
      stepHeader: 'Personal Details',
    },
    {
      component: ComponentTwo,
      title: 'Address and Contact Information',
      stepHeader: 'Address and Contact Information',
    },
    {
      component: ComponentThree,
      title: 'Create project',
      stepHeader: 'Review',
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
    alert('Form Submitted');
    setSubmitted(true);
  };
  return (
    <>
      {submitted ? (
        <div>Submitted!</div>
      ) : (
        <>
          <Stepper methods={stepMethods} />
          <Form className="p-3">
            <div>{getComponent()}</div>
            <div className="d-flex justify-content-between">
              <div>
                {getBackButtonTitle() && (
                  <Button onClick={prevStep} variant="danger" className="me-3">
                    {getBackButtonTitle()}
                  </Button>
                )}
                <Button onClick={resetForm} variant="secondary">
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
                  {' '}
                  {getNextButtonTitle()}
                </Button>
                <Button
                  className="ms-3"
                  onClick={() => setStep(3)}
                  variant="warning"
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

export default StepperCom