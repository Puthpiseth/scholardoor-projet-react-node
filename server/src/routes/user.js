require('dotenv').config();
const express = require('express');
const userController = require ('../controllers/user');

const router = express.Router();

router.post('/signup', userController.createAccount) 
router.post('/signin', userController.signin)

module.exports = router;