const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ all: true, nested: true}],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ all: true, nested: true}],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, user_id: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    post.title = req.body.title;
    post.body = req.body.body;
      res.json(post);
      res.status(200).end();
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!affectedRows) {
      res.status(404).json({ message: 'No post found with that id!'}).end();
    }
    res.status(200).json({message: `Post id ${req.params.id} deleted!`}).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
