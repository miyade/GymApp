const express = require('express');
const multer = require('multer')

const UserController = require('./Controllers/UserController')
const EventController = require('./Controllers/EventController')
const DashboardController = require('./Controllers/DashboardController')
const LoginController = require('./Controllers/LoginController')
const SubscriptionController = require('./Controllers/SubscriptionController')
const ApprovalController = require('./Controllers/ApprovalController')
const RejectionController = require('./Controllers/RejectionController')
const uploadConfig = require('./config/upload');
const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
    res.send({status:200});
  })
  
  //TODO Approval controller
  //TODO Rejection controller

  //Subscription 
routes.post('/Subscription/:eventId',SubscriptionController.create)
routes.get('/Subscription/:subscription_id', SubscriptionController.getSubscriptionById)
routes.post('/Subscription/:subscription_id/approval',ApprovalController.approve)
routes.post('/Subscription/:subscription_id/rejection',RejectionController.reject)

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