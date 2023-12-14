import { Card } from "@govtechsg/sgds-react"

const CardCom = () => {
  return <>
    <Card>
      <Card.Img
        alt="img alternate text goes here"
        src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        variant="top"
      />
      <Card.Body>
        <Card.Title>
          Card Title
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
        </Card.Text>
        <Card.Link href="#">
          Go somewhere
        </Card.Link>
      </Card.Body>
    </Card>
  </>
}

export default CardCom;
