const dbConfig = require('./../sql/dbConfig');

// 获取手机验证码
function randCode(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
validataPhoneCode = [];
let phoneCodeREX = (phone) => {
  for (let item of validataPhoneCode) {
    if (phone == item.phone) {
      return true
    }
  }
  return false
}
//验证手机号与验证码是否匹配
let rexPhoneCode = function (phone, code) {
  for (let item of validataPhoneCode) {
    if (phone == item.phone && code == item.code) {
      return 'login'
    }
  }
  return 'error'
}
//手机验证码发送接口
sendCode = (req, res) => {
  let phone = req.query.phone;
  if (phoneCodeREX(phone)) {
    res.send({
      'code': '400',
      'msg': '已经发送验证码，请稍后再发'
    })
  }
  let code = randCode(1000, 9999);
  validataPhoneCode.push({
    'phone': phone,
    'code': code
  })
  res.send({
    'code': '200',
    'msg': '发送成功'
  })
  // console.log(code);
}
//验证码登录
phoneCodeLogin = (req, res, next) => {
  let { phone, code } = req.query;
  //该手机是否发送过验证码
  if (phoneCodeREX(phone)) {
    //验证手机号和验证码是否匹配
    let status = rexPhoneCode(phone, code);
    if (status == 'login') {
      res.send({
        'code': '200',
        'msg': '登录成功'
      })
    } else if (status == 'error') {
      res.send({
        'code': '200',
        'msg': '登录失败，手机号与验证码不匹配'
      })
    }
  } else {
    res.send({
      'code': '400',
      'msg': '未发送验证码'
    })
  }
}

//当前时间 年-月-日
const getDate = () => {
  const date = new Date();
  // date.getYear(); //获取当前年份(2位)
  // date.getFullYear(); //获取完整的年份(4位)
  // date.getMonth(); //获取当前月份(0-11,0代表1月)
  // date.getDate(); //获取当前日(1-31)
  // date.getDay(); //获取当前星期X(0-6,0代表星期天)
  // date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
  // date.getHours(); //获取当前小时数(0-23)
  // date.getMinutes(); //获取当前分钟数(0-59)
  // date.getSeconds(); //获取当前秒数(0-59)
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;

}
//获取登录人信息
const getLoginUser = async (username, password) => {
  const sql = 'SELECT * FROM pro_user WHERE username=? and password=?';
  const sqlArr = [username, password];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}
const getLogin = async (req, res) => {
  const { username, password } = req.body;
  const userData = await getLoginUser(username, password);
  if (userData.length > 0) {
    delete userData[0].password;
    res.send({
      'code': '200',
      'status': '0',
      'msg': '登录成功',
      'data': userData
    })
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '登录失败'
    })
  }
}
// 新建用户
const registerUser = async (regform) => {
  const rexUser = await userREX(regform.username);
  if (rexUser.length > 0) {
    return 'EXIT';
  }
  const createDate = getDate();
  const sql = `INSERT INTO pro_user(username,password,fullName,age,sex,userPic,birthday,createDate,address,addressCode,userDesc) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  const sqlArr = [regform.username, regform.password, regform.fullName, regform.age, regform.sex, regform.userPic, regform.birthday, createDate, regform.address, regform.addressCode, regform.userDesc];
  const insertUser = await dbConfig.AsyncConnect(sql, sqlArr);
  const getUser = await getLoginUser(regform.username, regform.password)
  return getUser;
}
// 新建用户验证
const userREX = async (username) => {
  const sql = 'SELECT username FROM pro_user WHERE username=?';
  const sqlArr = [username];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}

const register = async (req, res) => {
  const regform = req.body;
  const newUser = await registerUser(regform);
  if (newUser.length > 0) {
    if (newUser == "EXIT") {
      res.send({
        'code': '200',
        'status': '1',
        'msg': '该用户已经存在。',
      })
    } else {
      res.send({
        'code': '200',
        'status': '0',
        'msg': '注册成功',
        'data': newUser
      })
    }
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '注册失败',
    })
  }
}

// 获取用户
const getUser = async (req,res) => {
  const sql =  `SELECT id,fullName,sex,userDesc,createDate,mobilePhone,email,address,userPic,memo FROM pro_user`;
  const sqlArr = [];
  const userData =  await dbConfig.AsyncConnect(sql, sqlArr);
  if (userData.length > 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': userData
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败'
    })
  }
}

module.exports = {
  getLogin,
  sendCode,
  phoneCodeLogin,
  register,
  getUser
}