const express = require('express');
const mailController = require('../controllers/mailController');
const multer = require('multer');
const upload = multer();

const mailRouter = express.Router();

// Attach a middleware to process the form data
mailRouter.route('/').post(upload.array(), mailController.sendMail).get((req, res) => res.status(200).json({ message: 'Welcome to the mail API'}));

module.exports = mailRouter;