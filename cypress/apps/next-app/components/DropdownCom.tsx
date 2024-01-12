import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "@govtechsg/sgds-react";

const DropdownCom = () => {
    return (
        <Dropdown>
            <DropdownToggle>
                Dropdown Button<i className="bi bi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem>
                    Something else
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownCom;
