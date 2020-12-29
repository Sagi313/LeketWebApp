import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth, register } from "../contexts/AuthContext";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefauld();
    register(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">הירשם</h2>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password conf</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button className="w-100" type="submit" />
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
