const router = require('express').Router();
const articlesRouter = require('./article')
const postRouter  = require('./posts');
const userRouter = require('./user');
const autMiddleware = require('../middlewares/auth')

router.use('/:param/auth', autMiddleware.verifyToken)
.use('/user', userRouter)
.use('/articles', articlesRouter)
.use('/post', postRouter)

module.exports = router;