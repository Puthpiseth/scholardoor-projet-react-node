require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const userController = require ('../controllers/user');

const router = express.Router();

router.post('/signup', userController.createAccount) 
router.post('/signin', userController.signin)
router.patch('/update-profile', auth.verifyToken, userController.updateUserProfile)
// router.put('/edit/:id', auth.verifyToken, userController.updateUserProfile)
// router.delete('/delete/:id', auth.verifyToken, userController.deleteUserProfile)

module.exports = router;