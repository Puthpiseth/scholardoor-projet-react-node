require('dotenv').config();
const express = require('express');
const userController = require ('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signup) 
      .post('/signin', userController.signin)
      .put('/edit/:id', auth.verifyToken, userController.updateUserProfile)
      .delete('/delete/:id', auth.verifyToken, userController.deleteUserProfile)

module.exports = router;