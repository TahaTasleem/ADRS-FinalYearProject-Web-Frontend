import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import { Row, Col } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailIcon from '@mui/icons-material/Email';
import "../components/Styling.css";
import Image from "react-bootstrap/Image";
import AlertReport from './AlertReport';
const HomeScreen = () => {
    return (
        <>
        <AlertReport/>
            <Header />
            <Box sx={{ bgcolor: '#4da6ff', pt: 8, pb: 6, }} style={{position:"relative"}}>
                <Container maxWidth="lg" id="contain">
                    <Typography variant="h5" color="white" paragraph id="typo">
                        The rescue service app, which aims to provide services to the victims of road traffic accidents. In the event of an accident, if you do not respond and your bike is still, emergency services will be sent to your location and we will notify your loved ones.
                    </Typography>
                    <Image src="https://img.freepik.com/free-vector/emergency-medical-care-isometric-composition_1284-71113.jpg?w=740&t=st=1672763162~exp=1672763762~hmac=754e2ca73994deea654c0d1cd0ae521005265d82f376a8f6a5e226540c23caf4" alternate="Ambulance" rounded id="rightside" />
                </Container>
            </Box>
            <Box sx={{ bgcolor: '#4da6ff', pt: 1, pb: 3, }}>
            </Box>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center my-5 text-primary">Contact Us</h1>
                    <p className="text-center">Let us know what you think! Contact Us through following.Thank you.</p><hr />
                </Col>
            </Row>

            <div id="icons">
                <a href="https://www.transparenthands.org/top-welfare-organizations-in-pakistan/" target="_blank"><FacebookOutlinedIcon fontSize="large" color="primary" id="icon"></FacebookOutlinedIcon></a>
                <a href="mailto:info@edhi.org" target="_blank"><EmailIcon fontSize="large" color="error" id="icon1" /></a>
            </div>
            <Footer />

        </>

    )
}

export default HomeScreen