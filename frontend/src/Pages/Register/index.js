import React, { useState } from 'react';
import api from '../../Services/api';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function Register({ history }){
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setfirstName ] = useState("")
    const [ lastName, setlastName ] = useState("")

    const handleSubmit = async evt => {
      evt.preventDefault();
      
      const response = await api.post('/user/Register', { email, password, firstName, lastName})
      const userId = response.data._id || false;

      if(userId){
          localStorage.setItem('user', userId)
          history.push('/Dashboard')

      }
      else{
          const { message } = response.data 
          history.push('/Login')
      }
    }
    return(
        <Container>
            <h2> Register </h2>
            <p> Please <strong>Make</strong> a new account</p>
        <Form onSubmit ={handleSubmit} >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={evt=>setfirstName(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="lastName" id="lastName" placeholder="Your last name.." onChange={evt=>setlastName(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="email" placeholder="Your Email.." onChange={evt=>setEmail(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="password" placeholder="Your Password.."onChange={evt=>setPassword(evt.target.value)} />
            </FormGroup>
            <Button>Register</Button>
        </Form>
        </Container>
    );
}