const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

// const bodyParser = require('body-parser');

//引入的路由文件
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const menuRouter = require('./routes/menu');
const roleRouter = require('./routes/role');
const userCenterRouter = require('./routes/userCenter/userCenter');
const deptRouter = require('./routes/sysSetting/dept');
const io = require('./WebSocket/WebSocket');

const app = express();

const http = require('http');
const server = http.createServer(app);
io.getSocketio(server)
server.listen(3066);
console.log('服务已经启用，端口号：', 3066)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));

//post请求
// app.use(bodyParser());
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.use(cors());

//路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pic', uploadRouter);
app.use('/menu', menuRouter);
app.use('/role', roleRouter);
app.use('/userc', userCenterRouter);
app.use('/dept', deptRouter);



module.exports = app;
