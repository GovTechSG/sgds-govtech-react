import { Combobox } from '@govtechsg/sgds-react/Combobox';

const ComboboxCom = () => {
    const menuList = ['apple', 'orange', 'banana'];
    return (
        <Combobox
            label="Fruits"
            menuList={menuList}
            icon={<i className="bi bi-search"></i>}
        />
    );
};

export default ComboboxCom;
