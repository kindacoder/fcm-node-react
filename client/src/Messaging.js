import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import axios from 'axios';
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