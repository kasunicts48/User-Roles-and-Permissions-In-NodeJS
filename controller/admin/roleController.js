const Role = require('../../models/roleModel');
const { validationResult } = require('express-validator');

const storeRole = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { role_name, value } = req.body;

        const isExists = await Role.findOne({
            role_name: {
                $regex: role_name,
                $options: 'i',
            },
        });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Role Name already exists!',
            });
        }

        // let obj = {
        //     role_name,
        // };

        // if (req.body.default) {
        //     obj.value = parseInt(req.body.value);
        // }

        const role = new Role({ role_name, value });
        const roleData = await role.save();

        return res.status(200).json({
            success: true,
            msg: 'Role Created Successfully!',
            data: roleData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};
const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({
            value: {
                $ne: 1, //Admin
            },
        });

        return res.status(200).json({
            success: true,
            msg: 'Roles Fetched Successfully!',
            data: roles,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};
module.exports = {
    storeRole,
    getRoles,
};
