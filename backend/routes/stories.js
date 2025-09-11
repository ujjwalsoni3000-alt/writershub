const express = require('express');
const Story = require('../models/Story');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Create story
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, genre, tags, coverImage } = req.body;
    const story = await Story.create({
      title,
      content,
      genre,
      tags,
      coverImage,
      author: req.userId,
    });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get latest stories
router.get('/latest', async (_req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'name profilePicture');
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Not found' });
    const userIdStr = String(req.userId);
    const idx = story.likes.findIndex((u) => String(u) === userIdStr);
    if (idx === -1) {
      story.likes.push(req.userId);
    } else {
      story.likes.splice(idx, 1);
    }
    await story.save();
    res.json({ likesCount: story.likes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const storyId = req.params.id;
    const { text } = req.body;
    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: 'Not found' });
    const comment = await Comment.create({ story: storyId, author: req.userId, text });
    story.comments.push(comment._id);
    await story.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get story by id
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'name profilePicture')
      .populate({ path: 'comments', populate: { path: 'author', select: 'name profilePicture' } });
    if (!story) return res.status(404).json({ message: 'Not found' });
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;



