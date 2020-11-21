
import './App.css';
import React from 'react';
import { Container } from 'reactstrap';
import Routes from './routes';

function App() {
  return (
    <Container>
      <h1>Gym App</h1>
      <Routes/>
    </Container>
  );
}

export default App;
