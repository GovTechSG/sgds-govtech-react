import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
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
} from '@/components';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
};

export default Home;
