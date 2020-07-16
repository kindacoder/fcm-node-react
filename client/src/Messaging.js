import React from 'react'
import axios from 'axios';
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

const Messaging = () => {
    const [messages, setMessages] = React.useState([]);
    const [requesting, setRequesting] = React.useState(false);

    React.useEffect(() => {
        setRequesting(true);
        axios.get("/fcm-messages").then((resp) => {
            setMessages(resp.data);
            setRequesting(false);
        });
    }, []);

    return (
        <Container>

            {/* form goes here */}


            <Formik
                initialValues={{
                    name: "",
                    message: "",
                }}
                onSubmit={(values, actions) => {
                    axios
                        .post("/fcm-messages", values)
                        .then((resp) => {

                            setMessages(messages.concat(resp.data));
                            actions.setSubmitting(false);
                            toast.success("Message saved successfully");
                        })
                        .catch((err) => {
                            console.log('err,err,rrrrrr');
                            console.log(err);
                            toast.error("There was an error saving the message");
                        });
                }}
            >
                {(prop) => {
                    const { handleSubmit, handleChange, isSubmitting } = prop;
                    return (
                        <>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Enter your name"
                                    onChange={handleChange("name")}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={handleChange("message")}
                                    placeholder="Enter a message"
                                />
                            </InputGroup>

                            {isSubmitting ? (
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        size="sm"
                                        role="status"
                                        animation="grow"
                                        aria-hidden="true"
                                    />
                  Loading...
                                </Button>
                            ) : (
                                    <Button variant="primary" onClick={() => handleSubmit()}>
                                        Submit
                                    </Button>
                                )}
                        </>
                    );
                }}
            </Formik>







            <div className="message-list">
                <h3>Messages</h3>
                {requesting ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                        <>
                            {messages.map((m, index) => {
                                const { name, message } = m;
                                return (
                                    <div key={index}>
                                        {name}: {message}
                                    </div>
                                );
                            })}
                        </>
                    )}
            </div>
        </Container>
    );
};
export default Messaging