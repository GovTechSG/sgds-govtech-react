import { Col } from '@govtechsg/sgds-govtech-react/Col';
import { Card } from '@govtechsg/sgds-govtech-react/Card';
const CardCom = (args) => {
  return (
    <Col xs lg="4">
      <Card {...args}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Go somewhere</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardCom