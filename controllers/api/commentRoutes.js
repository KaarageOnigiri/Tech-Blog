const router = require('express').Router();
const {BlogPost, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log('/api/comments endpoint received');
    try {
        const commentData = await Comment.create({
            ...req.body,
            // blogpost_id is already in the req.body
            user_id: req.session.user_id
        })
        console.log(commentData);
        res.status(200).json(commentData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;