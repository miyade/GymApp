import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login/';
import Dashboard from './Pages/Dashboard/';
import Register from './Pages/Register';
import Events from './Pages/Events/';
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component ={Login}/>
                <Route path='/Dashboard' exact component = {Dashboard}/>
                <Route path='/Register' exact component = {Register}/>
                <Route path='/Events' exact component = {Events}/>

            </Switch>
        </BrowserRouter>
    )
}