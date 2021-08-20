const router = require('express').Router();
const articlesRouter = require('./article')
const postRouter  = require('./posts');
const profileRouter = require('./profile');
const userRouter = require('./user');
const autMiddleware = require('../middlewares/auth')


router.use('/:param/auth', autMiddleware.verifyToken)
.use('/articles', articlesRouter)
.use('/post', postRouter)
.use('/profile', profileRouter)
.use('/user', userRouter)

module.exports = router;