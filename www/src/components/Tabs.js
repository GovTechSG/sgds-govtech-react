import { Tabs, Tab } from '@govtechsg/sgds-react/Tabs';
import { Badge } from '@govtechsg/sgds-react/Badge';

const TabsCom = () => (
  <>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Home">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </Tab>
      <Tab eventKey="profile" title="Profile">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here',
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source.
      </Tab>
    </Tabs>
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example2"
      variant="tabs-basic-toggle"
    >
      <Tab
        eventKey="home"
        title="Home"
        contentLeft={<i className="bi bi-house left"></i>}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </Tab>
      <Tab
        eventKey="profile"
        title="Profile"
        contentRight={
          <Badge bg="light" text="dark" className="right">
            99
          </Badge>
        }
      >
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum
      </Tab>
      <Tab
        eventKey="contact"
        title="Contact"
        contentRight={<i className="bi bi-telephone right"></i>}
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Tab>
    </Tabs>
    <Tabs
  defaultActiveKey="profile"
  id="uncontrolled-tab-example3"
  variant="tabs-info-toggle"
>
  <Tab
    eventKey="home"
    title="Home"
    contentLeft={<i className="bi bi-house"></i>}
    contentBottom={99}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco
  </Tab>
  <Tab
    eventKey="profile"
    title="Profile"
    contentBottom={
      <Badge bg="light" text="dark" className="right">
        99
      </Badge>
    }
  >
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has
    roots in a piece of classical Latin literature from 45 BC, making it over
    2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
    College in Virginia, looked up one of the more obscure Latin words,
    consectetur, from a Lorem Ipsum
  </Tab>
</Tabs>
  </>
);

export default TabsCom;
