const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const http=require('http');
const socketio=require('socket.io');
const routes = require('./routes');


const app = express();
const server = http.Server(app)
const io = socketio(server);



const path = require ('path');

const PORT = process.env.PORT || 8000;
// install jsonwebtoken --
//Add token to project --
// return token when login -- 
// send token on request -- 
// create function to protect routers
//add function/middleware to routers
// modify response to decode the token



if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}





 try {
     mongoose.connect(process.env.MONGO_DB_CONNECTION, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
     })
     console.log('MongoDB connected')
 } catch (error) {
     console.log(error)
 }
 const connectedUsers = {};

io.on('connection', socket => {
   const { user } = socket.handshake.query;
   connectedUsers[user] = socket.id;
})

app.use((req,res,next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})
app.use(cors())
app.use(express.json())
app.use('/files',express.static(path.resolve(__dirname,"..","files")))
app.use(routes);


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
