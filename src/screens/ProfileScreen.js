import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "../components/Message";
import axios from 'axios';
import Header from '../components/Header';
const ProfileScreen = () => {
    const [username, setuserName] = useState("");
    const [organizationname, setorganizationName] = useState("");
    const [cell, setcellNo] = useState("");
    const [message, setMessage] = useState(null);
    const [message2, setMessage2] = useState(null);
    const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    };
    const id = localStorage.getItem("id");
    const getData = async () => {
        try {
            const url = "http://localhost:3000/api/rescue-services/specific/";
            const res = await axios.get(url + id, config);
            setuserName(res.data.credentials.userName);
            setorganizationName(res.data.organizationName);
            setcellNo(res.data.cell);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [setorganizationName, setcellNo]);
    const dat = JSON.stringify({ "updates": { "organizationName": organizationname, "cell": cell } });
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(dat);
            const url2 = "http://localhost:3000/api/rescue-services/update/";
            const res2 = await axios.put(url2 + id, dat, config);
            console.log(res2);
            setMessage("Profile Updated Successfully");
        }
        catch (error) {
            setMessage2("Profile Not Updated!");
            console.log(error);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <>
        <Header/>
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center my-5 text-primary">Rescue Service Profile</h1>
                    {message && <Message variant="success">{message}</Message>}
                    {message2 && <Message variant="alert">{message}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Enter Username"
                                value={username}
                                readOnly
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="organizationname">
                            <Form.Label>Organization Name</Form.Label>
                            <Form.Control
                                type="organizationname"
                                placeholder="Enter Organization Name"
                                value={organizationname}
                                onChange={(e) => setorganizationName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cell">
                            <Form.Label>Phone No</Form.Label>
                            <Form.Control
                                type="cell"
                                placeholder="Enter Phone No"
                                value={cell}
                                onChange={(e) => setcellNo(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Button type="submit" variant="primary" className="mb-3 btn-block">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </> 
    );
}

export default ProfileScreen;