var express = require('express');
var router = express.Router();
var roleCon = require('./../models/roleController');

//创建角色信息
router.post('/createRole', roleCon.createRole);
//查询角色信息
router.post('/getRoleData', roleCon.getRoleData);
//修改角色信息
router.post('/editRole', roleCon.editRole);
//删除角色信息
router.post('/delRole', roleCon.delRole);



module.exports = router;