const router = require('express').Router();
const {BlogPost, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log('post request received')
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log('put request received');
        const postData = await BlogPost.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        console.log('put request completed');

        if (!postData) {
            res.status(404).json({message: 'Error, no post found with this id!'});
            return;
        }

        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!postData) {
            res.status(404).json({message: 'Error, no post found with this id!'});
            return;
        }

        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;