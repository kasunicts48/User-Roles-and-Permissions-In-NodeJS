const express = require('express');
const router = express();
const authController = require('../controller/authController');
const { registerValidator, loginValidator } = require('../helpers/validator');

const auth = require('../middlewares/authMiddleware');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

// authenticated routes
router.get('/profile', auth, authController.getProfile);

module.exports = router;
