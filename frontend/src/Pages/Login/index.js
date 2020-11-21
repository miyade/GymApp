import React, { useState } from 'react';
import api from '../../Services/api';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function Login({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async evt => {
      evt.preventDefault();
      
      const response = await api.post('/Login', { email, password })
      const userId = response.data._id || false;

      if(userId){
          localStorage.setItem('user', userId)
          history.push('/Dashboard')

      }
      else{
          const { message } = response.data 
          console.log(message)
      }
    }
    return(
        <Container> 
            <h2> Login </h2>
            <p> Please <strong>Login</strong> to your account</p>
             <Form onSubmit ={handleSubmit} >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="email" placeholder="Your Email.." onChange={evt=>setEmail(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="password" placeholder="Your Password.."onChange={evt=>setPassword(evt.target.value)} />
                </FormGroup>
                    <Button>Login</Button>
            </Form>
        </Container>
       
    );
}