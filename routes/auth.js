const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
require('dotenv/config');


//Register
router.post('/register', async (req, res) => {
    //Validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(500).send(error.details[0].message);

    //Check email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists')


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(500).send(error.details[0].message);

    //Check email
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) return res.status(400).send('Email or password is wrong');

    //Check password
    const validPassword = await bcrypt.compare(req.body.password, checkUser.password);
    if (!validPassword) return res.status(400).send('Password is wrong');

    // Create and assign a token
    const token = jwt.sign({ _id: checkUser._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;