var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'pro_yeyu'
});

connection.connect();

connection.query('SELECT * FROM userinfo where username="qinlingze"',function (error,result,fields) {
   if(error) throw error;
   console.log("the result is:",result);
   console.log("数据库连接成功！")
});