const express = require('express');
const multer = require('multer')

const UserController = require('./Controllers/UserController')
const EventController = require('./Controllers/EventController')
const DashboardController = require('./Controllers/DashboardController')
const uploadConfig = require('./config/upload');
const LoginController = require('./Controllers/LoginController')
const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
    res.send({status:200});
  })
  //TODO session controller 
  //TODO Subscribe controller
  //TODO Approval controller
  //TODO Rejection controller
  //Login
routes.post('/login',LoginController.store)
  //User
routes.post("/user/register", UserController.createUser)
routes.get("/user/:userId",UserController.getUserById)
  //Dashboard
routes.get('/event/:eventId',DashboardController.getEventById)
routes.get('/dashboard',DashboardController.getAllEvents)
routes.get('/dashboard/:sport',DashboardController.getEventsBySport)
  //Event
routes.post('/event',upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId',EventController.deleteEvent)

module.exports = routes