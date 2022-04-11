const mysql = require('mysql');
// exports.base = (sql,data,callback) => {
//   //创建数据库连接
//   const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'pro_yeyu'
//   })
//   //执行连接操作
//   connection.connect();

//   //操作数据库（数据库操作也是异步的）
//   connection.query(sql,data,(error,results,fields) => {
//     if (error) throw error;
//     callback(results);
//     console.log('数据库连接成功');
//   })

//   //关闭数据库
//   connection.end();
// }

module.exports = {
  //数据库配置
  config: {
    host: 'localhost',
    post: '3066',
    user: 'root',
    password: '123456',
    database: 'pro_yeyu'
  },
  //连接数据库 通过mysql连接池
  sqlConnect:function(sql, sqlArr, callBack){
    const pool = mysql.createPool(this.config);
    pool.getConnection((err,conn) => {
      if(err){
        console.log('连接失败。。。');
        return;
      }
      //事件的回调
      conn.query(sql, sqlArr, callBack);
      //释放连接
      conn.release();
    })
  },

  // Promise回调
  AsyncConnect:function(aySql, aySqlArr){
    return new Promise((resolve,reject) => {
      const pool = mysql.createPool(this.config);
      pool.getConnection((err,conn) => {
        if(err){
          reject(err);
        }
        //事件的回调
        conn.query(aySql, aySqlArr, (err,data) => {
          if(err){
            reject(err);
          }else{
            resolve(data);
          }
        });
        //释放连接
        conn.release();
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}