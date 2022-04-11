const dbConfig = require('./../sql/dbConfig');

// 数据转换为树形结构
const getTreeData = (listData, id) => {
  const itemArr = [];
  for(let item of listData){
    if(id === item.pid){
      const nodeObj = {};
      nodeObj.id = item.id;
      nodeObj.name = item.name;
      nodeObj.pid = item.pid;
      nodeObj.icon = item.icon;
      nodeObj.path = item.path;
      nodeObj.parentName = item.parentName;
      nodeObj.menuDesc = item.menuDesc;
      nodeObj.children = getTreeData(listData,item.id);
      itemArr.push(nodeObj);
    }
  }
  return itemArr
}

// 菜单配置页面左侧树接口
const getMenuData = async (req, res) => {
  const sql = `SELECT id,pid,path,name,icon,parentName,menuDesc FROM pro_menu`;
  const sqlArr = [];
  const menuData = await dbConfig.AsyncConnect(sql, sqlArr);
  const treeList = await getTreeData(menuData, 0);
  if (treeList.length >= 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': treeList
    })
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败'
    })
  }
}

// 新增菜单接口
const addMenu = async (req, res) => {
  const menuForm = req.body;
  const sql = `INSERT INTO pro_menu(pid,icon,path,name,parentName,menuDesc) VALUES(?,?,?,?,?,?)`;
  const sqlArr = [menuForm.pid, menuForm.icon, menuForm.path, menuForm.name, menuForm.parentName, menuForm.menuDesc];
  const menuDataObj = await dbConfig.AsyncConnect(sql, sqlArr);
  if (menuDataObj.affectedRows === 1 || menuDataObj.affectedRows === '1') {
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

// 新增子级菜单接口
const addChildMenu = async (req, res) => {
  const childMenuForm = req.body;
  const sql = `INSERT INTO pro_menu(pid,path,name,parentName,menuDesc) VALUES(?,?,?,?,?)`;
  const sqlArr = [childMenuForm.pid, childMenuForm.path, childMenuForm.name, childMenuForm.parentName, childMenuForm.menuDesc];
  const childMenuDataObj = await dbConfig.AsyncConnect(sql, sqlArr);
  if (childMenuDataObj.affectedRows === 1 || childMenuDataObj.affectedRows === '1') {
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

// 菜单配置页面编辑接口
const editMenu = async (req, res) => {
  const editForm = req.body;
  const sql = `UPDATE pro_menu SET name=?,menuDesc=?,path=?,icon=? WHERE id=?`;
  const sqlArr = [editForm.name, editForm.menuDesc, editForm.path, editForm.icon, editForm.id];
  const editMenuList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (editMenuList.affectedRows === 1 || editMenuList.affectedRows === '1') {
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

// 菜单配置页面删除接口
const delMenu = async (req, res) => {
  const { ids } = req.body;
  const sql = 'DELETE FROM pro_menu WHERE id in ('+ids+')';
  const sqlArr = [];
  const delMenuList = await dbConfig.AsyncConnect(sql, sqlArr);
  if (delMenuList.affectedRows >= 1) {
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

// sidebar数据转换为树形结构
const getSideTreeData = (listData, id) => {
  const itemArr = [];
  for(let item of listData){
    if(id === item.pid){
      const nodeObj = {};
      nodeObj.title = item.name;
      nodeObj.icon = item.icon;
      nodeObj.path = item.path;
      if(getSideTreeData(listData,item.id).length > 0){
        nodeObj.children = getSideTreeData(listData,item.id);
      }
      itemArr.push(nodeObj);
    }
  }
  return itemArr
}
// sidebar页面左侧树接口
const getSideData = async (req, res) => {
  const sql = `SELECT id,pid,path,name,icon,parentName,menuDesc FROM pro_menu`;
  const sqlArr = [];
  const menuData = await dbConfig.AsyncConnect(sql, sqlArr);
  const treeList = await getSideTreeData(menuData, 0);
  if (treeList.length >= 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '查询成功',
      'data': treeList
    })
  } else {
    res.send({
      'code': '200',
      'status': '1',
      'msg': '查询失败'
    })
  }
}
module.exports = {
  getMenuData,
  addMenu,
  addChildMenu,
  getSideData,
  editMenu,
  delMenu
}