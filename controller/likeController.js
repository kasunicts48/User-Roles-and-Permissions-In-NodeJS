const Like = require('../models/likeModel');
const { validationResult } = require('express-validator');

const postLike = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { user_id, post_id } = req.body;

        const isLike = await Like.findOne({ user_id, post_id });

        if (isLike) {
            return res.status(400).json({
                success: false,
                msg: 'Already liked!',
            });
        }

        const like = new Like({ user_id, post_id });

        const likeData = await like.save();

        return res.status(200).json({
            success: true,
            msg: 'Post liked!',
            data: likeData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

module.exports = {
    postLike,
};
