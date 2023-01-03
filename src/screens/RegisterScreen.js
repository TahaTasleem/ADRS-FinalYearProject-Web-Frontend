import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col,Container } from "react-bootstrap"
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Message from "../components/Message";

const RegisterScreen = () => {
  const [username, setuserName] = useState("");
  const [organizationname, setorganizationName] = useState("");
  const [cell, setcellNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  };
  const dat = JSON.stringify({ "userName": username, "password": password, "organizationName": organizationname, "cell": cell });
  const submitHandler = async (e) => {
    e.preventDefault(); console.log(dat);
    if (password != confirmPassword) {
      setMessage("Password donot match");
    }
    else {
      try {
        const url = "http://localhost:3000/api/rescue-services/add";
        const res = await axios.post(url, dat, config);
        navigate("..");
        console.log(res.status);
      }
      catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
      <Col md={6}>
      <h1 className="text-center text-primary">Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            required={true}
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="organizationname">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="organizationname"
            required={true}
            placeholder="Enter Organization Name"
            value={organizationname}
            onChange={(e) => setorganizationName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cell">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="cell"
            required={true}
            placeholder="Enter Phone No"
            value={cell}
            onChange={(e) => setcellNo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required={true}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mb-2 btn-block">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to=".." className="font-weight-bold">
            Login
          </Link>
        </Col>
      </Row>
      </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;