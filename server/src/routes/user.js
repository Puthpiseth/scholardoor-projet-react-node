require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const userController = require ('../controllers/user');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');

const router = express.Router();

router.post('/signup', userController.createAccount) 
// router.get('/activate-account', userController.activateAccount)
router.post('/signin', userController.signin, auth.verifyToken)
router.put('/forgot-password', forgotPassword.forgotPassword)
router.put('/reset-password', resetPassword.resetPassword)
router.put('/edit/:id', userController.updateUserProfile,auth.verifyToken,)
router.delete('/delete/:id', userController.deleteUserProfile, auth.verifyToken)

module.exports = router;