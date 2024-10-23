const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const { sendMail } = require('../helpers/mailer');

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { name, email } = req.body;

        const isExists = await User.findOne({
            email,
        });

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: `Email is already exists!`,
            });
        }

        const password = randomstring.generate(6);
        const hashedPassword = await bcrypt.hash(password, 10);

        let obj = {
            name,
            email,
            password: hashedPassword,
        };

        if (req.body.role && req.body.role == 1) {
            return res.status(400).json({
                success: false,
                msg: `You can't create Admin!`,
            });
        } else if (req.body.role) {
            obj.role = req.body.role;
        }

        const user = new User(obj);

        const userData = await user.save();

        console.log('🔑 Password', password);

        // const content =
        //     `
        //     <p>Hi <b>` +
        //     userData.name +
        //     `,</b> Your account is created, below is your details.</p>
        //     <table style="border-style:none;" >
        //         <tr>
        //             <th>Name :- </th>
        //             <td>` +
        //     userData.name +
        //     `</td>
        //         </tr>
        //         <tr>
        //             <th>Email :- </th>
        //             <td>` +
        //     userData.email +
        //     `</td>
        //         </tr>
        //         <tr>
        //             <th>Password :- </th>
        //             <td>` +
        //     password +
        //     `</td>
        //         </tr>
        //     </table>
        //     <p>Now you can login your account in Our Application, Thanks... </p>
        // `;

        // sendMail(userData.email, 'Your Account created successfully!', content);

        console.log('Now you can login your account in Our Application, Thanks...');

        return res.status(200).json({
            success: true,
            msg: `User created successfully!`,
            data: userData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        console.log(req.user._id);

        const users = await User.find({
            _id: {
                $ne: req.user._id,
            },
        });

        return res.status(200).json({
            success: true,
            msg: 'Users Fetched Successfully!',
            data: users,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { id, name } = req.body;

        const isExists = await User.findOne({
            _id: id,
        });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: `User not exists!`,
            });
        }

        let updateObj = {
            name,
        };

        if (req.body.role != undefined) {
            updateObj.role = req.body.role;
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: id }, { $set: updateObj }, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'User updated successfully!',
            data: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
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

        const userData = await User.findOne({ _id: id });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: `User ID doesn't exists!`,
            });
        }
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            msg: `User Deleted Successfully!`,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

const postLike = () => {
    
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
