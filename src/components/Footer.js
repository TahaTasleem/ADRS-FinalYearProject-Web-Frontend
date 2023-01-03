import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer expand="lg" style={{ backgroundColor: "#4da6ff",position:"absolute",bottom:0,width:"100%"}}>
      <Container>
        <Row>
          <Col className="text-center py-3 text-white" style={{ fontWeight: "bold" }}>
            Copyright &copy; ADRS
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;