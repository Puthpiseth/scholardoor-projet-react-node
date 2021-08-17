require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const profileController = require('../controllers/profile')

const router = express.Router();

router.patch('/create-profile', auth.verifyToken, profileController.createUserProfile)
router.get('/profile/:id', auth.verifyToken, profileController.getUserProfile)
router.patch('/update-profile', auth.verifyToken, profileController.updateUserProfile)
router.delete('/delete-profile/:id', auth.verifyToken, profileController.deleteUserProfile)


module.exports = router;