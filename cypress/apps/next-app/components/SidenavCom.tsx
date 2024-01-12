import { SideNav, SideNavItem, SideNavButton, SideNavCollapse, SideNavLink } from "@govtechsg/sgds-react"

const SideNavCom = () => {
    return (
        <SideNav>
            <SideNavItem eventKey="0">
                <SideNavButton>SideNav Item #1</SideNavButton>
                <SideNavCollapse>
                    <>
                        <SideNavLink eventKey="nl-1" href="#">
                            number one
                        </SideNavLink>
                        <SideNavLink eventKey="nl-2" href="#">
                            number one
                        </SideNavLink>
                        <SideNavLink eventKey="nl-3" href="#">
                            number one
                        </SideNavLink>
                    </>
                </SideNavCollapse>
            </SideNavItem>
            <SideNavItem eventKey="1">
                <SideNavButton>SideNav Item #2</SideNavButton>
                <SideNavCollapse>
                    <>
                        <SideNavLink eventKey="nl-4">number two</SideNavLink>
                        <SideNavLink eventKey="nl-6">number two</SideNavLink>
                        <SideNavLink eventKey="nl-7">number two</SideNavLink>
                        <SideNavLink eventKey="nl-8">number two</SideNavLink>
                    </>
                </SideNavCollapse>
            </SideNavItem>
            <SideNavItem eventKey="2">
                <SideNavButton href="#">SideNav Item #3</SideNavButton>
            </SideNavItem>
        </SideNav>
    )
}

export default SideNavCom;
