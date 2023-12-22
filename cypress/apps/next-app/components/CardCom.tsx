import { Card, CardImg, CardTitle, CardBody, CardLink, CardText } from "@govtechsg/sgds-react"

const CardCom = () => {
  return <>
    <Card>
      <CardImg
        alt="img alternate text goes here"
        src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        variant="top"
      />
      <CardBody>
        <CardTitle>
          Card Title
        </CardTitle>
        <CardText>
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
        </CardText>
        <CardLink href="#">
          Go somewhere
        </CardLink>
      </CardBody>
    </Card>
  </>
}

export default CardCom;
