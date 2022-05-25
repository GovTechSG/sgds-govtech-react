import { useState } from "react";
import { Row } from '@govtechsg/sgds-govtech-react/Row'
import { Col } from '@govtechsg/sgds-govtech-react/Col'
import { Card } from '@govtechsg/sgds-govtech-react/Card'
import { CloseButton } from '@govtechsg/sgds-govtech-react/CloseButton'
import { QuantityToggle } from '@govtechsg/sgds-govtech-react/QuantityToggle'
const QtyToggleCom = () => {
    const [count, setCount] = useState(0);
    const [disappear, setDisappear] = useState(false);
    const handleDismiss = () => {
      setDisappear(!disappear);
    };
    if (!disappear)
      return (
        <Row>
          <Col xs lg="5">
            <Card variant="card-action-quantity-toggle">
              <Card.Body>
                <div>
                  <Card.Title as="h4">
                    Basket <i className="bi bi-cart"></i>
                  </Card.Title>
                  <CloseButton onClick={handleDismiss} />
                </div>
                <div>
                  <Card.Unit>
                    <Card.Subtitle as="h6" className="text-muted">
                      Item Brand
                    </Card.Subtitle>
                    <Card.Subtitle as="h6">Apple</Card.Subtitle>
                  </Card.Unit>
                  <QuantityToggle count={count} setCount={setCount} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    else return null;
  };
  export default QtyToggleCom