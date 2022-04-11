let socketio = {}
let socket_io = require('socket.io')

// 获取io
socketio.getSocketio = function(server) {
//这一段是用于解决跨域问题
  let io = socket_io(server, {
    cors: {
      origin: '*'
    }
  })
  io.on('connection', (socket) => {
    //监听connection（用户连接）事件，socket为用户连接的实例
    socket.on('disconnect',()=>{
      //监听用户断开事件
         console.log("用户"+socket.id+"断开连接");
     });
     console.log("用户"+socket.id+"连接...");
     socket.on('send', (data) => {
          console.log('111')
         console.log(data);//你好服务器
         socket.emit('msg','你好浏览器');
      })
     socket.on('msg',(data)=>{
        //监听msg事件（这个是自定义的事件）
        // console.log('111')
        //  console.log(data);//你好服务器
        //  socket.emit('msg','你好浏览器');
         //向socket用户发送信息
     })
  })
}

module.exports = socketio