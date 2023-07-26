import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Footer = ({ pageActions }) => {
  return (
    <footer className="fixed-bottom bg-secondary">
      <Container fluid>
        <Row className="align-items-center">
          {pageActions.map((action, dex) => (
            <Col key={dex}>
              <Button
                variant="primary"
                onClick={action.action}
              >
                {action.text}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
