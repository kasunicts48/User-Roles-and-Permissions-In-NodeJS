const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');
const {
    categoryAddValidator,
    categoryDeleteValidator,
    categoryUpdateValidator,
    postCreateValidator,
    postDeleteValidator,
    postUpdateValidator,
} = require('../helpers/adminValidator');
const { createUserValidator } = require('../helpers/validator');

const categoryController = require('../controller/categoryController');
const postController = require('../controller/postController');
const userController = require('../controller/userController');

// category routes
router.post('/add-category', auth, categoryAddValidator, categoryController.addCategory);
router.get('/get-categories', auth, categoryController.getCategories);
router.delete('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory);
router.put('/update-category', auth, categoryUpdateValidator, categoryController.updateCategory);

// post routes
router.post('/create-post', auth, postCreateValidator, postController.createPost);
router.get('/get-posts', auth, postController.getPosts);
router.delete('/delete-post', auth, postDeleteValidator, postController.deletePost);
router.put('/update-post', auth, postUpdateValidator, postController.updatePost);

// User routes
router.post('/create-user', auth, createUserValidator, userController.createUser);

module.exports = router;
