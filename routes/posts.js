const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;