import api from "../api/axios";
import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('')

  const handleLogin = async (e)=>{
    e.preventDefault()
    try{
      const response = await api.post("api/token/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access)
      localStorage.setItem("refresh", response.data.refresh)

      alert("login successfull")

      navigate("/dashbord")
    }
    catch (error){
      alert(" invalid username or password")
      console.log(error.response?.data)
    }
  }

  
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <Card style={{ width: "25rem" }}>
            <Card.Body>

              <h2 className="text-center mb-4">Login</h2>

              <Form onSubmit={handleLogin}>

                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User Name"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>

              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;