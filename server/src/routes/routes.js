require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const {signup, activateAccount} = require ('../controllers/signup');
const signin = require('../controllers/signin');
const forgotPassword = require('../controllers/forgot-password');
const resetPassword = require('../controllers/reset-password');
const {updateUserProfile, deleteUserProfile} = require('../controllers/profile');

const router = express.Router();

// User authentification routes
router.post('/signup', signup) 
      .get('/activate-account/:token', activateAccount)
      .post('/signin', auth.verifyToken, signin)
      .put('/forgot-password', forgotPassword)
      .put('/reset-password', resetPassword)

// User profile
router.put('/edit/:id', auth.verifyToken, updateUserProfile)
      .delete('/delete/:id', auth.verifyToken, deleteUserProfile)

module.exports = router;