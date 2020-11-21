import React, { useState } from 'react';
import api from '../../Services/api';
import {Alert, Button, Form, FormGroup, Input, Container } from 'reactstrap';
import "./index.css";
export default function Login({ history }){
    
    const [errorMessage, setErrorMessage] = useState(false)
    const [error, setError] = useState(false)

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async evt => {
      evt.preventDefault();
      const response = await api.post('/Login', { email, password })
      const user_id = response.data.user_id || false;
      const user = response.data.user || false;

      try {
        if(user && user_id){
            localStorage.setItem('user', user)
            localStorage.setItem('user_id', user_id)
            history.push('/')
        }
          else 
          {
            const { message } = response.data
            setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 5000)
          }
      } catch (error) {
        console.log(error.message) 
      }
     
    }
    return(
        <Container>
        <h2>Login:</h2>
        <p>Please <strong>Log</strong> into your account</p>
        <Form onSubmit={handleSubmit}>
            <div className="input-group">
            <FormGroup className="form-group-"></FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
            </FormGroup>
            </div>
            <FormGroup>
                <Button className="submit-btn">Login</Button>
            </FormGroup>
            <FormGroup>
                <Button className="secondary-btn" onClick={() => history.push("/register")}>New Account</Button>
            </FormGroup>
        </Form>
        {error ? (
            <Alert className="event-validation" color="danger">Make sure you entered your Email and password correctly.</Alert>
        ) : ""}
    </Container>
       
    );
}