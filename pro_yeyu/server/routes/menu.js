var express = require('express');
var router = express.Router();
var menuCon = require('./../models/menuController');

//新增菜单信息
router.post('/addMenu', menuCon.addMenu);
//新增子级菜单信息
router.post('/addChildMenu', menuCon.addChildMenu);
//修改角色信息
router.post('/editMenu', menuCon.editMenu);
//删除角色信息
router.post('/delMenu', menuCon.delMenu);
//获取菜单配置菜单树数据
router.post('/getMenuData', menuCon.getMenuData);
//获取sidebar菜单树数据
router.post('/getSideData', menuCon.getSideData);


module.exports = router;