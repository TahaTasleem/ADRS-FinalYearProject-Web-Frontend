import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Message from "../components/Message";
import { Cookies } from 'react-cookie';

const LoginScreen = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [cookies, setCookie] = useCookies("token");
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  };
  const clearStorage = () => {
    localStorage.clear();
    const cookies = new Cookies();
    cookies.remove("token");
  }
  useEffect(() => {
    clearStorage();
    
  });

  const dat = JSON.stringify({ "userName": userName, "password": password });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/rescue-services/login/";
      const res = await axios.post(url, dat, config);
      localStorage.setItem("userName", userName);
      localStorage.setItem("id", res.data.valid._id);
      navigate('/home');
      setCookie("token", res.data.token, { path: '/' });
    }
    catch (error) {
      setMessage("Username or Password is wrong!");
      console.log(error);
    }
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center my-5 text-primary">Welcome Back!</h1>
          {message && <Message variant="danger">{message}</Message>}
          <Form onSubmit={SubmitHandler}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label >Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter Username"
                value={userName}
                required={true}
                onChange={(e) => setuserName(e.target.value)}
              ></Form.Control>
              </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label >Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              
            </Form.Group>
              <Button variant="primary" type="submit" className="mb-3 btn-block">
              Login
              </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Don't Have an Account?{" "}
              <Link to="/register" className="font-weight-bold">
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;