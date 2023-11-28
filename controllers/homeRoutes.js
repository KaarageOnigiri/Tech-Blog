const router = require('express').Router();
const {User, BlogPost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        // get all the data for the homepage
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;