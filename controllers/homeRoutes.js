const router = require('express').Router();
const {User, BlogPost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // get all the data for the homepage and get the username
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
        });

        // serialize the data so the template can read it
        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
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

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log(req.session);
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: BlogPost}]
        });

        const user = userData.get({plain: true});

        console.log(user);

        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    }
    catch (err) {
        console.log('dashboard err: ', err)
        res.status(500).json(err);
    }
});

router.get('/new-dashboard', withAuth, async (req, res) => {
    try {
        res.render('new-dashboard', {
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User, attributes: ['name']
                        }
                    ]
                }
            ]
        });
        
        const post = postData.get({plain: true});

        console.log(post)

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/edit-post/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        })

        const post = postData.get({plain: true});

        res.render('edit-post', {
            ...post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;