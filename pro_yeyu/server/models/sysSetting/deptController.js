const dbConfig = require('../../sql/dbConfig');

// 数据转换为树形结构
const getTreeData = (listData, id) => {
  const itemArr = [];
  for(let item of listData){
    if(id === item.deptPid){
      const nodeObj = {};
      nodeObj.deptId = item.deptId;
      nodeObj.departmentName = item.departmentName;
      nodeObj.deptPid = item.deptPid;
      nodeObj.deptPname = item.deptPname;
      nodeObj.deptDesc = item.deptDesc;
      nodeObj.createDate = item.createDate;
      nodeObj.userPrivs = item.userPrivs;
      nodeObj.children = getTreeData(listData,item.deptId);
      itemArr.push(nodeObj);
    }
  }
  return itemArr
}
// 获取部门左侧树数据接口
const getDeptData = async (req, res) => {
  const sql = `SELECT deptId,departmentName,userPrivs,deptPid,deptPname,deptDesc,createDate FROM pro_dept`;
  const sqlArr = [];
  const deptData = await dbConfig.AsyncConnect(sql, sqlArr);
  const deptTreeList = await getTreeData(deptData, 0);
  if (deptTreeList.length > 0) {
    res.send({
      'code':'200',
      'status':'0',
      'msg':'查询成功',
      'data':deptTreeList
    })
  } else {
    res.send({
      'code':'200',
      'status':'1',
      'msg':'查询失败'
    })
  }
}

// 新增一级部门
const addFirstDept = async (req, res) => {
  const firstForm = req.body;
  let createDate = firstForm.createDate !== '' ? firstForm.createDate : getDate();
  const sql = `INSERT INTO pro_dept(departmentName,deptPid,deptPname,deptDesc,createDate) VALUES (?,?,?,?,?)`
  const sqlArr = [firstForm.departmentName,firstForm.deptPid,firstForm.deptPname,firstForm.deptDesc,createDate]
  const deptDataObj = await dbConfig.AsyncConnect(sql, sqlArr);
  if (deptDataObj.affectedRows === 1 || deptDataObj.affectedRows === '1') {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '添加成功'
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '添加失败'
    })
  }
}

// 新增子级部门
const addChildDept = async (req, res) => {
  const childForm = req.body;
  let createDate = childForm.createDate !== '' ? childForm.createDate : getDate();
  const sql = `INSERT INTO pro_dept(departmentName,deptPid,deptPname,deptDesc,createDate) VALUES (?,?,?,?,?)`;
  const sqlArr = [childForm.departmentName,childForm.deptPid,childForm.deptPname,childForm.deptDesc,createDate]
  const childDeptDataObj = await dbConfig.AsyncConnect(sql, sqlArr);
  if (childDeptDataObj.affectedRows === 1 || childDeptDataObj.affectedRows === '1') {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '添加成功'
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '添加失败'
    })
  }
}

// 编辑部门
const editDept = async (req, res) => {
  const editForm = req.body;
  let createDate = editForm.createDate !== '' ? editForm.createDate : getDate();
  const sql = `UPDATE pro_dept SET deptPname=?,deptDesc=?,deptPid=?,departmentName=?,createDate=? WHERE deptId=?`;
  const sqlArr = [editForm.deptPname, editForm.deptDesc, editForm.deptPid, editForm.departmentName, createDate, editForm.deptId]
  const editDeptDataObj = await dbConfig.AsyncConnect(sql, sqlArr);
  if (editDeptDataObj.affectedRows === 1 || editDeptDataObj.affectedRows === '1') {
    const editData =  await getEditDeptData(editForm.deptId);
    res.send({
      'code': '200',
      'status': '0',
      'msg': '编辑成功',
      'data': editData
    })
  }else{
    res.send({
      'code': '200',
      'status': '1',
      'msg': '编辑失败'
    })
  }
}
// 查询编辑后的数据
const getEditDeptData = async (deptId) => {
  const sql = `SELECT deptId,departmentName,userPrivs,deptPid,deptPname,deptDesc,createDate FROM pro_dept WHERE deptId=?`;
  const sqlArr = [deptId];
  return await dbConfig.AsyncConnect(sql, sqlArr);
}

// 部门删除
const delDept = async (req, res) => {
  const { deptIds } = req.body;
  const ids = deptIds.substr(0, deptIds.length - 1)
  const sql = 'DELETE FROM pro_dept WHERE deptId in ('+ids+')';
  const sqlArr = [];
  const delDeptList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (delDeptList.affectedRows >= 1) {
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

// 选择用户到部门
const userInsertDept = async (req, res) => {
  const { userIds, deptId} = req.body;
  const userIdArr = await getUserId(deptId)
  if (userIdArr.length > 0) {
    let tatolIds = ''
    if(userIdArr[0].userPrivs !== '' && userIdArr[0].userPrivs !== null && userIdArr[0].userPrivs !== undefined) {
      if (userIds !== '') {
        tatolIds = mergeIds(userIdArr[0].userPrivs, userIds);
      } else {
        tatolIds = userIdArr[0].userPrivs;
      } 
    } else {
      if (userIds !== '') {
        tatolIds = userIds
      } else {
        tatolIds = '';
      } 
    }
    const sql = `UPDATE pro_dept SET userPrivs=? WHERE deptId=?`;
    const sqlArr = [tatolIds, deptId]
    const userInsertDeptObj = await dbConfig.AsyncConnect(sql, sqlArr);
    if (userInsertDeptObj.affectedRows === 1 || userInsertDeptObj.affectedRows === '1') {
      const reUserData =  await returnUser(tatolIds);
      let userData = []
      if (reUserData.length > 0) {
        userData = reUserData;
        res.send({
          'code': '200',
          'status': '0',
          'msg': '添加成功',
          'data': userData
        })
      } else {
        userData = []
        res.send({
          'code': '200',
          'status': '0',
          'msg': '添加数据为空',
          'data': userData
        })
      }
    }else{
      res.send({
        'code': '200',
        'status': '1',
        'msg': '添加失败'
      })
    }
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '出错了,请联系管理员'
    })
  }
}
// 返回部门下的用户
const returnUser = async (userIds) => {
  if (userIds === '') {
    return []
  }
  const sql =  'SELECT id,fullName,userDesc,createDate,deptId,departmentName FROM pro_user WHERE id in ('+userIds+')';
  const sqlArr = [];
  return  await dbConfig.AsyncConnect(sql, sqlArr);
}
// 查询本部门下的用户的id
const getUserId = async (deptIds) => {
  const sql =  `SELECT * FROM pro_dept WHERE deptId=?`
  const sqlArr = [deptIds];
  return await dbConfig.AsyncConnect(sql, sqlArr)
}
// 去重合并用户添加
const mergeIds = (oIds, nIds) => {
  let totalArr = []
  for (let item of oIds.split(',')) {
    if (item !== '') {
      totalArr.push(item)
    }
  }
  for (let item of nIds.split(',')) {
    if (item !== '') {
      totalArr.push(item)
    }
  }
  return uniq(totalArr).join(',')
}
const uniq = (array) => {
  var temp = []; //一个新的临时数组
  for (let item of array) {
    if(temp.indexOf(item) == -1){
        temp.push(item);
    }
  }
  return temp;
}

// 部门用户数据查询
const getDeptUser = async (req, res) => {
  const { userPrivs } = req.body;
  const deptUser = await returnUser(userPrivs);
  if (deptUser.length >= 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': deptUser
    })
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败'
    })
  }
}

// 用户部门激活
const activeDeptUser = async (req, res) => {
  const formData = req.body;
  const deptUser = await returnUser(formData.id)
  if (deptUser.length >0 && deptUser[0].deptId != '' && deptUser[0].deptId != null) {
    if (deptUser[0].deptId.indexOf(formData.deptId) > -1) {
      res.send({
        'code': '200',
        'status': '0',
        'msg': '该用户已被激活'
      })
    } else {
      let deptId = stringCon(deptUser[0].deptId) + formData.deptId;
      let departmentName = stringCon(deptUser[0].departmentName) + formData.departmentName;
      const sql = `UPDATE pro_user SET deptId=?,departmentName=? WHERE id=?`
      const sqlArr = [deptId, departmentName, formData.id];
      const userInsertDept = await dbConfig.AsyncConnect(sql, sqlArr);
      if (userInsertDept.affectedRows === 1 || userInsertDept.affectedRows === '1') {
        const activeUserData = await getUserId(formData.deptId);
        if (activeUserData.length > 0) {
          const activeUserDataList = await returnUser(activeUserData[0].userPrivs);
          res.send({
            'code': '200',
            'status': '0',
            'msg': '激活成功',
            'data': activeUserDataList
          })
        }
      }else{
        res.send({
          'code': '200',
          'status': '1',
          'msg': '激活失败'
        })
      }
    }
  } else {
    let deptId = formData.deptId;
    let departmentName = formData.departmentName;
    const sql = `UPDATE pro_user SET deptId=?,departmentName=? WHERE id=?`
    const sqlArr = [deptId, departmentName, formData.id];
    const userInsertDept = await dbConfig.AsyncConnect(sql, sqlArr);
    if (userInsertDept.affectedRows === 1 || userInsertDept.affectedRows === '1') {
      const activeUserData = await getUserId(formData.deptId);
      if (activeUserData.length > 0) {
        const activeUserDataList = await returnUser(activeUserData[0].userPrivs);
        res.send({
          'code': '200',
          'status': '0',
          'msg': '激活成功',
          'data': activeUserDataList
        })
      }
    }else{
      res.send({
        'code': '200',
        'status': '1',
        'msg': '激活失败'
      })
    }
  } 
}
// 拼接字符串插入到用户表
const stringCon = (str) => {
  let strArr = str.split(",");
  let strs = ''
  for (let item of strArr) {
    if (item != '') {
      strs += item + ','
    }
  }
  return strs
}

// 移除部门
const removeDept = async (req, res) => {
  const removeForm = req.body;
  const removeUserList = await getUserId(removeForm.deptId);
  const removeDeptList = await returnUser(removeForm.userId);
  let removeUserObj = {};
  let removeDeptObj = {};
  if (removeUserList.length > 0) {
    const removeUserId = removeArr(removeUserList[0].userPrivs, removeForm.userId)
    const sql = `UPDATE pro_dept SET userPrivs=? WHERE deptId=?`
    const sqlArr = [removeUserId, removeForm.deptId]
    removeUserObj = await dbConfig.AsyncConnect(sql, sqlArr);
  }
  if (removeDeptList.length > 0) {
    const removeDeptId = removeArr(removeDeptList[0].deptId, removeForm.deptId)
    const removeDeptName = removeArr(removeDeptList[0].departmentName, removeForm.departmentName)
    const sql = `UPDATE pro_user SET deptId=?,departmentName=? WHERE id=?`
    const sqlArr = [removeDeptId, removeDeptName, removeForm.userId]
    removeDeptObj = await dbConfig.AsyncConnect(sql, sqlArr);
  }
  if (removeUserObj.affectedRows === 1 && removeDeptObj.affectedRows === 1) {
    const userDataList = await getUserId(removeForm.deptId);
    if (userDataList.length > 0) {
      const deptDataUser = await returnUser(userDataList[0].userPrivs);
      res.send({
        'code': '200',
        'status': '0',
        'msg': '移除成功',
        'data': deptDataUser
      })
    }
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '移除失败'
    })
  }
}
const removeArr = (removeStr, oneStr) => {
  let returnArr = []
  if(removeStr !== '' && removeStr !== null) {
    let removeArrs = removeStr.split(',');
    for (let item of removeArrs){
      if (item !== '' && Number(item) !== Number(oneStr)) {
        returnArr.push(item)
      }
    }
  }
  if (returnArr.length >0) {
    return returnArr.join(',')
  } 
  return ''
}

// 当前时间 年-月-日: 时分秒
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

module.exports = {
  getDeptData,
  addFirstDept,
  addChildDept,
  editDept,
  delDept,
  userInsertDept,
  getDeptUser,
  activeDeptUser,
  removeDept
}