const router = require('express').Router();
// calling models here
const withAuth = require('../utils/auth');

router.get('./', async (req, res) => {
    try{
        res.render('homepage', {
            loggedIn: req.session.loggedIn
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})