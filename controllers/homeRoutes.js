const router = require('express').Router();
const {User, BlogPost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // get all the data for the homepage and get the username
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        // serialize the data so the template can read it
        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: BlogPost}]
        });

        const user = userData.get({plain: true});

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const post = postData.get({plain: true});

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;