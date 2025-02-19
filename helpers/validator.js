const { check } = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
    check('password', 'Password is required').notEmpty(),
];
exports.loginValidator = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
    check('password', 'Password is required').notEmpty(),
];

exports.createUserValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
];
exports.updateUserValidator = [
    check('id', 'ID is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
];
exports.deleteUserValidator = [check('id', 'ID is required').not().isEmpty()];

exports.postLikeUnlikeValidator = [
    check('user_id', 'User ID is required').not().isEmpty(),
    check('post_id', 'Post ID is required').not().isEmpty(),
];
