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

const verifyToken = require('./config/verifyToken');
routes.get('/status', (req, res) => {
	res.send({ status: 200 })
})

//Registration
routes.post('/registration/:eventId', SubscriptionController.create)
routes.get('/registration/:registration_id', SubscriptionController.getSubscriptionById)
routes.post('/registration/:registration_id/approvals', ApprovalController.approve)
routes.post('/registration/:registration_id/rejections', RejectionController.reject)

//Login
routes.post('/login', LoginController.store)

//Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)

//Events
routes.post('/event',verifyToken, upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId',verifyToken, EventController.delete)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes