const express = require('express');
const multer = require('multer')

const UserController = require('./Controllers/UserController')
const EventController = require('./Controllers/EventController')
const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
    res.send({status:200});
  })
  //User
routes.post("/user/register", UserController.createUser)
routes.get("/user/:userId",UserController.getUserById)
  //Event
routes.get('/event/:eventId',EventController.getEventById)

routes.post('/event',upload.single("thumbnail"), EventController.createEvent)

module.exports = routes