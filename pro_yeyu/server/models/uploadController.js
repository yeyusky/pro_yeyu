const fs = require('fs');
const mimeType = require('mime-types');
const path = require('path');
const dbConfig = require('./../sql/dbConfig');


//插入文件信息到表
const uploadPicUser = async (inAvatar, inUserId) => {
  const avatarPic = inAvatar;
  const userId = inUserId;
  const sql = `INSERT INTO pic_user(userpic,user_id) VALUES(?,?)`;
  const sqlArr = [avatarPic, userId];
  const insertPic = await dbConfig.AsyncConnect(sql, sqlArr);
  return await picInfo(avatarPic, userId);
}

//获取文件表的信息
const picInfo = async (getUserPic, getUserId) => {
  const userpic = getUserPic;
  const user_id = getUserId;
  const sql = `SELECT userpic,id FROM pic_user WHERE userpic=? and user_id=?`;
  const sqlArr = [userpic, user_id];
  return await dbConfig.AsyncConnect(sql, sqlArr)
}
//获取文件路径
const getFilePath = (fileName) => {
  return `./public/uploads/${fileName}`;
}
//获取base64文件路径
const getBase64Path = (basefilePath, baseFileData) => {
  return `data:${basefilePath};base64,${baseFileData}`;
}
//转base64
const transImgToBase64 = (file) => {
  const filePath = path.resolve(file);
  const readFile = fs.readFileSync(path.resolve(file));
  const newReadFile = new Buffer.from(readFile).toString('base64');
  return getBase64Path(mimeType.lookup(filePath), newReadFile);
}
//重命名文件
const resetFileName = (resetfile) => {
  const cutArr = resetfile.split('.');
  const fileExtension = resetfile.split('.')[cutArr.length - 1];
  return Date.parse(new Date()) + '.' + fileExtension;
}
const upload = (req, res) => {
  const { file } = req;
  if (!file) {
    res.render('error', { 'message': '上传文件不能为空！' });
    return
  }
  //写入文件
  fs.renameSync(getFilePath(file.filename), getFilePath(resetFileName(file.originalname)));
  //设置响应类型及编码
  res.set({
    'content-type': 'application/json; charset=utf-8'
  })
  //转成base64文件
  const userAvatarPath = getFilePath(resetFileName(file.originalname));
  const userpic = transImgToBase64(userAvatarPath);
  if (userpic) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '上传成功',
      'data': userpic
    })
  } else {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '上传失败'
    })
  }
}

const uploadPic = async (req, res) => {
  const { avatar, userId } = req.body;
  const newPic = await uploadPicUser(avatar, userId);
  if (newPic.length > 0) {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '新增成功',
      'data': newPic
    })
  } else {
    res.send({
      'code': '200',
      'status': '0',
      'msg': '新增失败'
    })
  }
}
module.exports = {
  upload,
  uploadPic
}