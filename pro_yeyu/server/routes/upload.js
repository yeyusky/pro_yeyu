var express = require('express');
var router = express.Router();
var multer = require('multer');
var userCon = require('./../models/uploadController');
var upload = multer({ dest: './public/uploads' }).single('file')

//用户登录
router.post('/upload', upload, userCon.upload);
router.post('/uploadPic', userCon.uploadPic); //添加用户接口
// router.get('/delUserById',service.delUserById); //根据Id删除用户


module.exports = router;