import { Breadcrumb } from '@govtechsg/sgds-react/Breadcrumb'

const BreadcrumbCom = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="https://www.designsystem.tech.gov.sg/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="https://github.com/GovTechSG/@govtechsg/sgds-react/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

export default BreadcrumbCom