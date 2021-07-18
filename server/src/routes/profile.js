require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const profile = require('../controllers/profile');

const router = express.Router();

router.put('/edit/:id', auth.verifyToken, profile.updateUserProfile)
router.delete('/delete/:id', auth.verifyToken, profile.deleteUserProfile)

module.exports = router;