require('dotenv').config();
const express = require('express');
const {signup, activateAccount, signin, forgotPassword, resetPassword, updateUserProfile, deleteUserProfile} = require ('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup) 
      .get('/activate-account/:token', activateAccount)
      .post('/signin', auth.verifyToken, signin)
      .put('/forgot-password', forgotPassword)
      .put('/reset-password', resetPassword)
      .put('/edit/:id', auth.verifyToken, updateUserProfile)
      .delete('/delete/:id', auth.verifyToken, deleteUserProfile)

module.exports = router;