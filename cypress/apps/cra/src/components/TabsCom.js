import { Tab, Tabs } from "@govtechsg/sgds-react";

const TabsCom = () => {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco
            </Tab>
            <Tab eventKey="profile" title="Profile">
                It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point of using
                Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                opposed to using 'Content here, content here',
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                roots in a piece of classical Latin literature from 45 BC, making it over
                2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                College in Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage, and going through the cites of the
                word in classical literature, discovered the undoubtable source.
            </Tab>
        </Tabs>

    )
}

export default TabsCom;
