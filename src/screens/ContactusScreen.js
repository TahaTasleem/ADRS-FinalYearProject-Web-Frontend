import React from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Row,Col, Container } from 'react-bootstrap';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailIcon from '@mui/icons-material/Email';
import "../components/Styling.css";
const ContactusScreen = () => {
    return (
        <>
            <Header />
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center my-5 text-primary">Contact Us</h1>
                        <p>Let us know what you think! Contact Us through following.Thank you.</p><hr />
                    </Col>
                </Row>
              
            </Container>
            <div id="icons">
                <a href="https://www.transparenthands.org/top-welfare-organizations-in-pakistan/" target="_blank"><FacebookOutlinedIcon fontSize="large" color="primary" id="icon"></FacebookOutlinedIcon></a>
                <a href="mailto:info@edhi.org" target="_blank"><EmailIcon  fontSize="large" color="error"id="icon1"/></a>
            </div>
            <Footer />
        </>
    );
}

export default ContactusScreen;