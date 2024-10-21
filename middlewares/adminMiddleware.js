const onlyAdminAccess = async (req, res, next) => {
    try {
        // console.log(req.user);

        if (req.user.role != 1) {
            // not equal admin
            return res.status(400).json({
                success: false,
                msg: `You haven't permission to access this route!`,
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Something went wrong!',
        });
    }

    return next();
};

module.exports = {
    onlyAdminAccess,
};
