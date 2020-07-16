import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Messaging from './Messaging';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5500';
console.log(axios.defaults)



function App() {
  return (
    <Fragment>
      <ToastContainer autoClose={2000} position="top-center" />
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Firebase notifictations with React and Express</Navbar.Brand>
      </Navbar>
      <Container className="center-column">
        <Row>
          <Col>
            <Messaging />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
