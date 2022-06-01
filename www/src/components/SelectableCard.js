import { SelectableCard, Card } from '@govtechsg/sgds-govtech-react/Card';

const SelectableCardCom = () => {
  const AppleBody = (
    <>
      <Card.Subtitle as="h6">
        <i className="bi bi-box"></i>Laptop
      </Card.Subtitle>
      <Card.Title as="h4">
        Apple <i className="bi bi-apple"></i>
      </Card.Title>
      <Card.Text>Macbook Pro M1</Card.Text>
    </>
  );

  return <SelectableCard>{AppleBody}</SelectableCard>;
};

export default SelectableCardCom