const { check, body } = require('express-validator');

// Permission Validation
exports.permissionAddValidator = [check('permission_name', 'Permission Name is required').not().isEmpty()];

exports.permissionDeleteValidator = [check('id', 'Permission id is required').not().isEmpty()];

exports.permissionUpdateValidator = [
    check('id', 'Permission id is required').not().isEmpty(),
    check('permission_name', 'Permission Name is required').not().isEmpty(),
];

// Category Validation
exports.categoryAddValidator = [check('category_name', 'Category Name is required').not().isEmpty()];

exports.categoryDeleteValidator = [check('id', 'Category id is required').not().isEmpty()];

exports.categoryUpdateValidator = [
    check('id', 'Category id is required').not().isEmpty(),
    check('category_name', 'Category Name is required').not().isEmpty(),
];

// Post Validation
exports.postCreateValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
];

exports.postDeleteValidator = [check('id', 'Post ID is required').not().isEmpty()];

exports.postUpdateValidator = [
    check('id', 'Post ID is required').not().isEmpty(),
    // Custom validator to check that at least one of title or description is provided
    body().custom(({ req }) => {
        if (!req.body.title && !req.body.description) {
            throw new Error('At least one of title or description is required');
        }
        if (req.body.title && req.body.title.trim() === '') {
            throw new Error('Title cannot be empty');
        }
        if (req.body.description && req.body.description.trim() === '') {
            throw new Error('Description cannot be empty');
        }
        return true;
    }),
];
