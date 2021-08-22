require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const articleController = require('../controllers/article')

const router = express.Router();

router.post('/auth/upload-file', articleController.uploadFile)
.get('/auth', articleController.getOneUserArticles)
.get('/auth/get-articles', articleController.getAllUsersArticles)
.delete('/auth/delete', articleController.deleteArticles)


module.exports = router;