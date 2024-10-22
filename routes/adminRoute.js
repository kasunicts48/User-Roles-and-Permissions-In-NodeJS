const express = require('express');
const router = express();
const permissionController = require('../controller/admin/permissionController');
const roleController = require('../controller/admin/roleController');
const {
    permissionAddValidator,
    permissionDeleteValidator,
    permissionUpdateValidator,
    roleStoreValidator,
} = require('../helpers/adminValidator');
const auth = require('../middlewares/authMiddleware');
const { onlyAdminAccess } = require('../middlewares/adminMiddleware');

// Permission routes
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

// Role routes
router.post('/store-role', auth, onlyAdminAccess, roleStoreValidator, roleController.storeRole);
router.get('/get-roles', auth, onlyAdminAccess, roleController.getRoles);

module.exports = router;
