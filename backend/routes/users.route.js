const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/users', authMiddleware, (req, res) => {
    res.send('Users route is working!');
});

module.exports = router;