require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const userController = require ('../controllers/userController');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');
const profile = require('../controllers/profile');

const router = express.Router();

// User authentification routes
router.post('/signup', userController.createAccount) 
router.get('/activate-account/:token', userController.activateAccount)
router.post('/signin', auth.verifyToken, userController.signin)
router.put('/forgot-password', forgotPassword.forgotPassword)
router.put('/reset-password', resetPassword.resetPassword)

// User profile
router.put('/edit/:id', auth.verifyToken, profile.updateUserProfile)
router.delete('/delete/:id', auth.verifyToken, profile.deleteUserProfile)

module.exports = router;