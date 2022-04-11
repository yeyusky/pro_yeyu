const express = require('express');
const router = express.Router();
const deptCon = require('../../models/sysSetting/deptController')

// 获取部门数据接口
router.post('/getDeptData', deptCon.getDeptData)

//新增一级部门数据接口
router.post('/addFirstDept', deptCon.addFirstDept)

//新增子级部门数据接口
router.post('/addChildDept', deptCon.addChildDept)

//编辑部门数据接口
router.post('/editDept', deptCon.editDept)

//删除部门数据接口
router.post('/delDept', deptCon.delDept)

//选择用户插入到部门接口
router.post('/userInsertDept', deptCon.userInsertDept)

//查询部门下用户接口
router.post('/getDeptUser', deptCon.getDeptUser)

//激活部门下用户接口
router.post('/activeDeptUser', deptCon.activeDeptUser)

//移除部门下用户接口
router.post('/removeDept', deptCon.removeDept)

module.exports = router;