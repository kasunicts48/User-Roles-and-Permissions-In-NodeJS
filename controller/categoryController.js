const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Category = require('../models/categoryModel');

const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { category_name } = req.body;

        const isExists = await Category.findOne({
            name: {
                $regex: category_name,
                $options: 'i',
            },
        });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Category name already exists!',
            });
        }

        const category = new Category({
            name: category_name,
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success: true,
            msg: 'Category Created Successfully!',
            data: categoryData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            msg: 'Category Fetched Successfully!',
            data: categories,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { id } = req.body;

        const categoryData = await Category.findOne({ _id: id });

        if (!categoryData) {
            return res.status(400).json({
                success: false,
                msg: `Category ID doesn't exists!`,
            });
        }
        await Category.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            msg: `Category id ${id} Deleted Successfully!`,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { id, category_name } = req.body;

        console.log('req.body', req.body);

        const categoryData = await Category.findOne({ _id: id });

        if (!categoryData) {
            return res.status(400).json({
                success: false,
                msg: `Category ID doesn't exists!`,
            });
        }

        const isExists = await Category.findOne({
            _id: { $ne: id },
            name: {
                $regex: category_name,
                $options: 'i',
            },
        });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Category name already assigned to another category!',
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            {
                _id: id,
            },
            { $set: { name: category_name } },
            { new: true },
        );

        return res.status(200).json({
            success: false,
            msg: 'Category updated Successfully!',
            data: updatedCategory,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Category ID is not found!',
        });
    }
};

module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
};
