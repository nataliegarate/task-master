const router = require('express').Router()
const Post = require('../db/models/post')

//GET route to display user's posts

router.get('/', async (req, res, next) => {
  try {
    // req.body.userId = req.user.id
    const userPosts = await Post.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(userPosts)
  } catch (err) {
    next(err)
  }
})

//POST route to add a new post
router.post('/', async (req, res, next) => {
  try {
    // req.body.userId = req.user.id
    const createdPost = await Post.create({
      content: req.body.post,
      userId: req.user.id
    })
    res.json(createdPost)
  } catch (err) {
    next(err)
  }
})

//DELETE route to delete a post
router.delete(':/id', async (req, res, next) => {
  console.log('ii made it here')
  try {
    await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
