const express = require('express');
const router = express();
const permissionController = require('../controller/admin/permissionController');
const {
    permissionAddValidator,
    permissionDeleteValidator,
    permissionUpdateValidator,
} = require('../helpers/adminValidator');
const auth = require('../middlewares/authMiddleware');
const { onlyAdminAccess } = require('../middlewares/adminMiddleware');

router.post('/add-permission', auth, onlyAdminAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission', auth, onlyAdminAccess, permissionController.getPermission);
router.delete(
    '/delete-permission',
    auth,
    onlyAdminAccess,
    permissionDeleteValidator,
    permissionController.deletePermission,
);
router.put(
    '/update-permission',
    auth,
    onlyAdminAccess,
    permissionUpdateValidator,
    permissionController.updatePermission,
);

module.exports = router;
