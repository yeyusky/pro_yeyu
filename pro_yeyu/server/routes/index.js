var express = require('express');
var router = express.Router();

var userCon = require('./../models/userController');

/* GET home page. */
router.get('/', function(req, res, next){
  console.log('hello world!')
});
router.post('/sendCode', userCon.sendCode);
router.post('/phoneCodeLogin', userCon.phoneCodeLogin);

//查询用户表数据
// router.post('/findUser', function(req, res, next) {
//   // res.send({ msg:'成功' ,data:[{user:1,name:'大哥',age:20},{user:2,name:'小弟',age:18}]});
//   res.json({name:'aaa',pwd:'123'});
// });
module.exports = router;
