import { Form } from "@govtechsg/sgds-react/Form";
import { InputGroup } from "@govtechsg/sgds-react/InputGroup";
import { Dropdown, DropdownButton } from "@govtechsg/sgds-react/Dropdown";
const InputGroupCom = () => {
    return (
      <Form>
        <InputGroup className="mb-3" variant="has-icon">
          <DropdownButton
            variant="outline-secondary"
            title="Dropdown"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#" disabled>
              Separated link
            </Dropdown.Item>
          </DropdownButton>
          <i className="bi bi-search form-control-icon"></i>
          <Form.Control
            className="w-75"
            aria-label="Text input with dropdown button"
          />
        </InputGroup>
      </Form>
    );
  };
  export default InputGroupCom