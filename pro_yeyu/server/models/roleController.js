const dbConfig = require('./../sql/dbConfig');

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
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let min = date.getMinutes()
  min = min < 10 ? '0' + min : min
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
}
// 插入角色到库
const insertRole = async (roleform) => {
  const rexRole = await roleREX(roleform.roleName);
  if (rexRole.length > 0) {
    return 'EXIT';
  }
  let createDate = roleform.createDate !== '' ? roleform.createDate : getDate();
  const editDate = getDate();
  const sql = `INSERT INTO pro_role (roleName,roleDesc,roleStatus,createDate,editDate) VALUES(?,?,?,?,?)`;
  const sqlArr = [roleform.roleName, roleform.roleDesc, roleform.roleStatus, createDate, editDate];
  const insertUser = await dbConfig.AsyncConnect(sql, sqlArr);
  return await getRole(roleform.roleName);
}
//获取角色
const getRole = async (rolename) => {
  const sql = `SELECT * FROM pro_role WHERE roleName=?`;
  const sqlArr = [rolename];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}
// 新建用户验证
const roleREX = async (roleName) => {
  const sql = 'SELECT roleName FROM pro_role WHERE roleName=?';
  const sqlArr = [roleName];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}
// 创建角色接口
const createRole = async (req, res) => {
  const roleForm = req.body;
  const newRole = await insertRole(roleForm);
  if (newRole.length > 0) {
    if (newRole == "EXIT") {
      res.send({
        'code': '200',
        'status': '1',
        'msg': '该角色已经存在。',
      })
    } else {
      res.send({
        'code': '200',
        'status': '0',
        'msg': '创建角色成功',
        'data': newRole
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
// 获取角色信息接口
const getRoleData = async (req, res) => {
  const sql = `SELECT * FROM pro_role`;
  const sqlArr = [];
  const roloList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (roloList.length >= 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': roloList
    })
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败',
    })
  }
}
// 修改角色信息接口
const editRole = async (req, res) => {
  const editForm = req.body;
  let editDate = editForm.editDate !== '' ? editForm.editDate : getDate();
  const sql = `UPDATE pro_role SET roleName=?,roleDesc=?,roleStatus=?,createDate=?,editDate=? WHERE roleId=?`;
  const sqlArr = [editForm.roleName, editForm.roleDesc, editForm.roleStatus, editForm.createDate, editDate, editForm.roleId]
  const editRoloList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (editRoloList.affectedRows === 1 || editRoloList.affectedRows === '1') {
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
// 角色配置页面删除接口
const delRole = async (req, res) => {
  const { roleId } = req.body;
  const sql = `DELETE FROM pro_role WHERE roleId=?`;
  const sqlArr = [roleId];
  const delRole = await dbConfig.AsyncConnect(sql, sqlArr);
  if (delRole.affectedRows === 1 || delRole.affectedRows === '1') {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '删除成功'
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '删除失败'
    })
  }
}
module.exports = {
  createRole,
  getRoleData,
  editRole,
  delRole
}