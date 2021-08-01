require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const userController = require ('../controllers/user');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');

const router = express.Router();

router.post('/signup', userController.createAccount) 
// router.get('/activate-account', userController.activateAccount)
router.post('/signin', userController.signin)
router.put('/forgot-password', forgotPassword.forgotPassword)
router.put('/reset-password', resetPassword.resetPassword)
router.patch('/create-profile', auth.verifyToken, userController.updateUserProfile)
// router.put('/edit/:id', auth.verifyToken, userController.updateUserProfile)
// router.delete('/delete/:id', auth.verifyToken, userController.deleteUserProfile)

module.exports = router;