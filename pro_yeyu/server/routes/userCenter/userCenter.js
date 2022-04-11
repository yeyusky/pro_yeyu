const express = require('express');
const router = express.Router();
const userCenterCon = require('../../models/userCenter/userCenterController');

//获取用户信息
router.post('/getUserInfo', userCenterCon.getUserInfo);
//修改密码
router.post('/resetPass', userCenterCon.resetPass);
//完善用户信息
router.post('/editUserInfo', userCenterCon.editUserInfo);
//修改备注
router.post('/editMemo', userCenterCon.editMemo);
//查询好友用户信息
router.post('/getUserData', userCenterCon.getUserData);

module.exports = router;