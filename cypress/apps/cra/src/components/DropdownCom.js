import { Dropdown } from "@govtechsg/sgds-react";

const DropdownCom = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle>
                Dropdown Button<i className="bi bi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item>
                    Something else
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownCom;
