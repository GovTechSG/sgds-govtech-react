import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.scss';
import {
  AccordionCom,
  AlertCom,
  BadgeCom,
  BreadcrumbCom,
  ButtonCom,
  CardCom,
  ComboboxCom,
  DatepickerCom,
  DropdownCom,
  FileUploadCom,
  FooterCom,
  FormCom,
  ModalCom,
  NavCom,
  PaginationCom,
  ProgressBarCom,
  QuantityToggleCom,
  SideNavCom,
  StepperCom,
  TableCom,
  TabsCom,
  ToastCom,
  TooltipCom,
} from './components';
import {  Nav } from '@govtechsg/sgds-react';

function App() {
  return (
    <div className="container">
      <NavCom />
      <Nav>
      <Nav.Link href="#">test</Nav.Link>
      </Nav>
      <SideNavCom />
      <AccordionCom />
      <AlertCom />
      <BadgeCom />
      <BreadcrumbCom />
      <ButtonCom />
      <CardCom />
      <ComboboxCom />
      <DatepickerCom />
      <DropdownCom />
      <FileUploadCom />
      <FormCom />
      <ModalCom />
      <PaginationCom />
      <ProgressBarCom />
      <QuantityToggleCom />
      <StepperCom />
      <TableCom />
      <TabsCom />
      <ToastCom />
      <TooltipCom />
      <FooterCom />
    </div>
  );
}

export default App;
