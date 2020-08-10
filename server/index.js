
const express = require('express'),
    bodyParser = require('body-parser'),
    socket = require('socket.io'),
    cors = require('cors'),
    {addUser,removeUser} = require('./chatController'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = socket(server),
    router = require('./router');



    app.use(bodyParser.json())
    app.use(cors())
   app.use(router)

   io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  
  server.listen(process.env.PORT || 4444, () => console.log('server on point 4444'))

//     const PORT = 4444,
//     io = socket(app.listen(PORT,()=>console.log(`What's the problem? we on ${PORT}`)))


//This is code to make a very basic chat appllication work.
    
    io.on('connection', socket =>{
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name, message})
    })
})

io.on('connection', socket => {
  console.log('User Connected');
  io.emit('message dispatched', 'hello');
  socket.on('message sent', data => {
    console.log(data)
    socket.broadcast.emit('message dispatched', data.message);
  })
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});








// // // io.on('connection', socket =>{
// // //     socket.on('message', ({name, message}) =>{
// // //        socket.broadcast.emit('message', {name, message})
// // //     })
// // // })
//     io.on('connection', socket => {
//         console.log('User Connected');
//         io.emit('message dispatched', 'hello');
// // //         //EVERYONE
// // // //         socket.on('message sent', data => {
// // // //           console.log(data)
// // // //           io.emit('message dispatched', data.message);
// // // //         })
// // // //Not Everyone
//         socket.on('message sent', data => {
//     console.log(data)
//     socket.broadcast.emit('message dispatched', data.message);
//   })
//   socket.on('disconnect', () => {
//     console.log('User Disconnected');
//   })
// });