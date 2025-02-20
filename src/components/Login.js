const express = require('express');
const router = express.Router();
const { validateUser } = require('./services/authenticationService');

router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await validateUser(email, password);
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

