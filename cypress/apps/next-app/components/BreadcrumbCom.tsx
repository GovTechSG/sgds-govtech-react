import { Breadcrumb, BreadcrumbItem } from "@govtechsg/sgds-react"

const BreadcrumbCom = () => {
    return <Breadcrumb>
        <BreadcrumbItem href="https://www.designsystem.tech.gov.sg/">
            Home
        </BreadcrumbItem>
        <BreadcrumbItem href="https://github.com/GovTechSG/@govtechsg/sgds-react/">
            Library
        </BreadcrumbItem>
        <BreadcrumbItem active>
            Data
        </BreadcrumbItem>
    </Breadcrumb>
}

export default BreadcrumbCom;
