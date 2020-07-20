import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Messaging from './Messaging';
import axios from 'axios';
import { requestFirebaseNotificationPermission } from './firebase/firebaseInit'

axios.defaults.baseURL = 'http://localhost:5500';
console.log(axios.defaults)




function App() {
  requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      axios
        .post("/fcm-tokens", { token: firebaseToken })
        .then((resp) => {

          if (resp.code == 200) {
            toast.success("token saved successfully");
          }
          else if (resp.code == 422) {
            toast.error("token already present on db");
          }


        })
        .catch((err) => {
          console.log('errrrorororooro', err);


        });
      console.log(firebaseToken);
    })
    .catch((err) => {
      return err;
    });
  return (
    <Fragment>
      <ToastContainer autoClose={2000} position="top-center" />
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="center-column" href="">FCM with React and Node</Navbar.Brand>
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
