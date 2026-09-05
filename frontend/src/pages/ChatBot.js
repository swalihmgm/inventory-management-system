import React, { useState } from "react";
import { Card, Container, Form, Button, Spinner } from "react-bootstrap";
import Layout from "../compenents/Layout";
import api from "../api/axios";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      role: "You",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await api.post("api/chat/", {
        message,
      });

      setChat((prev) => [
        ...prev,
        {
          role: "Bot",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "Bot",
          text: "Something went wrong.",
        },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <Layout>
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h3>AI Assistant</h3>
          </Card.Header>

          <Card.Body
            style={{
              height: "500px",
              overflowY: "auto",
            }}
          >
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.role === "You" ? "text-end" : "text-start"
                }`}
              >
                <strong>{msg.role}</strong>

                <div
                  className={`p-3 rounded ${
                    msg.role === "You" ? "bg-primary text-white" : "bg-light"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <Spinner animation="border" />}
          </Card.Body>

          <Card.Footer>
            <Form onSubmit={sendMessage}>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Ask anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button type="submit" className="ms-2">
                  Send
                </Button>
              </div>
            </Form>
          </Card.Footer>
        </Card>
      </Container>
    </Layout>
  );
}

export default ChatBot;
