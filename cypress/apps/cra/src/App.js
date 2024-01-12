import 'bootstrap-icons/font/bootstrap-icons.css';
import '@govtechsg/sgds/sass/sgds.scss';

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
  TooltipCom
} from "./components";

function App() {
  return (
    <div className="container">
      <NavCom />
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
