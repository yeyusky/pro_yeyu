var express = require('express');
var router = express.Router();
var userCon = require('./../models/userController');

//用户登录
router.post('/login', userCon.getLogin);

// 用户注册
router.post('/register', userCon.register);

//查询所有用户
router.post('/getUser', userCon.getUser)

module.exports = router;
