const dbConfig = require('../../sql/dbConfig');

// 获取用户信息
const getUserInfo = async (req, res) => {
  const { username } = req.body;
  const sql = `SELECT * FROM pro_user WHERE username=?`
  const sqlArr = [username]
  const userInfo = await dbConfig.AsyncConnect(sql, sqlArr);
  if(userInfo.length > 0){
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': userInfo
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败'
    })
  }
}

// 修改密码
const resetPass = async (req, res) => {
  const resetForm = req.body;
  const resetData = await nameAndpassREX(resetForm.username, resetForm.password);
  if(resetData.length > 0){
    const sql = `UPDATE pro_user SET password=? WHERE username=?`;
    const sqlArr = [resetForm.newPassword, resetForm.username];
    const resetList = await dbConfig.AsyncConnect(sql, sqlArr);
    if (resetList.affectedRows === 1 || resetList.affectedRows === '1') {
      res.send({
        'code': '200',
        'status': '0',
        'msg': '修改成功'
      })
    }else{
      res.send({
        'code': '200',
        'status': '1',
        'msg': '修改失败'
      })
    }
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '原始密码输入错误'
    })
  }
}
// 验证用户名和密码是否正确
const nameAndpassREX = async (username,password) => {
  const sql = 'SELECT username,password FROM pro_user WHERE username=? and password=?';
  const sqlArr = [username,password];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}

// 完善信息修正接口
const editUserInfo = async (req, res) => {
  const editForm = req.body
  const sql = `UPDATE pro_user SET address=?,addressCode=?,age=?,sex=?,birthday=?,email=?,fullName=?,hobby=?,mobilePhone=?,userDesc=?,userPic=? WHERE id=?`
  const sqlArr = [editForm.address,editForm.addressCode,editForm.age,editForm.sex,editForm.birthday,editForm.email,editForm.fullName,editForm.hobby,editForm.mobilePhone,editForm.userDesc,editForm.userPic,editForm.id]
  const editList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (editList.affectedRows === 1 || editList.affectedRows === '1') {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '修改成功'
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '修改失败'
    })
  }
}

// 新增修正备注接口
const editMemo = async (req, res) => {
  const {id,memo} = req.body
  const sql = `UPDATE pro_user SET memo=? WHERE id=?`
  const sqlArr = [memo, id]
  const editMemoList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (editMemoList.affectedRows === 1 || editMemoList.affectedRows === '1') {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '修改成功'
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '修改失败'
    })
  }
}

// 好友列表用户查询数据接口
const getUserData = async (req, res) => {
  const {id} = req.body
  const sql =  `SELECT fullName,sex,userDesc,createDate,mobilePhone,email,address,userPic,memo FROM pro_user WHERE id=?`;
  const sqlArr = [id]
  const userDataList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (userDataList.length > 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data':userDataList
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
  getUserInfo,
  resetPass,
  editUserInfo,
  editMemo,
  getUserData
}