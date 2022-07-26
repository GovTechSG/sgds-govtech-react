import { SideNav } from '@govtechsg/sgds-react/SideNav';

const SideNavCom = () => {
  return (
    <SideNav>
      <SideNav.Item eventKey="0">
        <SideNav.Button>SideNav Item #1</SideNav.Button>
        <SideNav.Collapse>
            <SideNav.Link eventKey="nl-1" href="#">
              number one
            </SideNav.Link>
            <SideNav.Link eventKey="nl-2" href="#">
              number one
            </SideNav.Link>
            <SideNav.Link eventKey="nl-3" href="#">
              number one
            </SideNav.Link>
        </SideNav.Collapse>
      </SideNav.Item>
      <SideNav.Item eventKey="1">
        <SideNav.Button>SideNav Item #2</SideNav.Button>
        <SideNav.Collapse>
            <SideNav.Link eventKey="nl-4">number two</SideNav.Link>
            <SideNav.Link eventKey="nl-6">number two</SideNav.Link>
            <SideNav.Link eventKey="nl-7">number two</SideNav.Link>
            <SideNav.Link eventKey="nl-8">number two</SideNav.Link>
        </SideNav.Collapse>
      </SideNav.Item>
      <SideNav.Item eventKey="2">
        <SideNav.Button href="#">SideNav Item #3</SideNav.Button>
      </SideNav.Item>
    </SideNav>
  );
};

export default SideNavCom