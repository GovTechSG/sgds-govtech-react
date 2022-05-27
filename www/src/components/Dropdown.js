import { Dropdown } from '@govtechsg/sgds-govtech-react/Dropdown';
const DropdownCom = () => (
  <Dropdown>
    <Dropdown.Toggle>
      Dropdown Button<i className="bi bi-chevron-down"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="#" eventKey="abc">
        Action
      </Dropdown.Item>
      <Dropdown.Item href="#">Another action</Dropdown.Item>
      <Dropdown.Item onClick={() => console.log('Clicked')}>
        Something else
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
export default DropdownCom;
