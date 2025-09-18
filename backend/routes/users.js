const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get own profile
router.get('/me', auth, async (req, res) => {
  const me = await User.findById(req.userId).select('-passwordHash');
  res.json(me);
});

// Get user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

// Follow/unfollow
router.post('/:id/follow', auth, async (req, res) => {
  const targetId = req.params.id;
  if (String(targetId) === String(req.userId)) return res.status(400).json({ message: 'Cannot follow self' });
  const me = await User.findById(req.userId);
  const target = await User.findById(targetId);
  if (!target) return res.status(404).json({ message: 'Not found' });
  const meFollowing = me.following.map(String);
  const idx = meFollowing.indexOf(String(targetId));
  if (idx === -1) {
    me.following.push(targetId);
    target.followers.push(req.userId);
  } else {
    me.following.splice(idx, 1);
    const followerIdx = target.followers.map(String).indexOf(String(req.userId));
    if (followerIdx !== -1) target.followers.splice(followerIdx, 1);
  }
  await me.save();
  await target.save();
  res.json({ following: me.following.length, followers: target.followers.length });
});

module.exports = router;




