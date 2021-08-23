require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const articleController = require('../controllers/article')

const router = express.Router();

router.post('/auth/upload-file', articleController.uploadFile)
.get('/auth', (req, res) => articleController.getOneUserArticles(req.user.id, res))
.get('/auth/get-articles', articleController.getAllUsersArticles)
.get('/auth/details/:userId', (req, res) => articleController.getOneUserArticles(req.params.userId, res) )

.delete('/auth/delete-articles/:id', articleController.deleteArticles)


module.exports = router;