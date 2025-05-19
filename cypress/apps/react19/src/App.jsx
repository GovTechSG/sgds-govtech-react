import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from './components/ModalCom';
import Accordion from './components/AccordionCom';
import DatepickerCom from './components/DatepickerCom';
import '@govtechsg/sgds/css/sgds.css';
import ButtonCom from './components/ButtonCom';

function App() {
  return (
    <>
      <Modal></Modal>
      <Accordion />
      <DatepickerCom />
      <ButtonCom />
    </>
  );
}

export default App;
