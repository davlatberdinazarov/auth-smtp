const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller')

router.post('/register/step1', AuthController.registerStep1);
router.post('/register/step2', AuthController.registerStep2);
router.post('/login', AuthController.login);


module.exports = router;