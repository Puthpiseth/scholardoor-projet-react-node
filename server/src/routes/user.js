require('dotenv').config();
const express = require('express');
const userController = require ('../controllers/user');

const router = express.Router();

router.post('/signup', userController.createAccount) 
router.post('/signin', userController.signin)
router.patch('/auth/update-profile', userController.updateProfile)

module.exports = router;