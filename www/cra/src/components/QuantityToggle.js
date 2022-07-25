import { useState } from "react";
import { Row } from '@govtechsg/sgds-react/Row'
import { Col } from '@govtechsg/sgds-react/Col'
import { Card } from '@govtechsg/sgds-react/Card'
import { CloseButton } from '@govtechsg/sgds-react/CloseButton'
import { QuantityToggle } from '@govtechsg/sgds-react/QuantityToggle'
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