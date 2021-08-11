"use strict";
exports.__esModule = true;
exports.UrlConstant = void 0;
var environment_1 = require("src/environments/environment");
var prefixACL = 'ACL/';
var prefixPTN = 'PTN/';
exports.UrlConstant = {
    BASE_URL: environment_1.environment.apis["default"].urlConstant,
    API: {
        //List API in here
        // PERMISSION
        ACL_ACCOUNT: prefixACL + 'Accounts',
        ACL_PERMISSION: prefixACL + 'Permissions',
        ACL_USER: prefixACL + 'Users',
        ACL_USER_DEVICE_DETAIL: prefixACL + 'UserDeviceDetails',
        ACL_PERMISSION_GROUP_USER: prefixACL + 'PermissionGroupUsers',
        ACL_PERMISSION_GROUP: prefixACL + 'PermissionGroups',
        ACL_PERMISSION_GROUP_ACTION: prefixACL + 'PermissionGroupActions',
        ACL_GROUP_CREATION_PERMISSION: prefixACL + 'GroupCreationPermissions',
        KHACH_HANG: '/khach-hangs',
        DANH_MUC: '/common/du-lieu-phan-loai-by-table'
    },
    ROUTE: {
        LOGIN: '/login',
        // DASHBOARD: '/management/dashboard',
        // FORBIDEN: '/management/403',
        // PROFILE: '/management/profile',
        // MODULE: '/management/module',
        DM_CAP_DO: prefixPTN + 'DM_CapDos'
    }
};
