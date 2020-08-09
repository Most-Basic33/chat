
const express = require('express'),
    bodyParser = require('body-parser'),
    socket = require('socket.io'),
    app = express();

    app.use(bodyParser.json())

   

    const PORT = 4444,
    io = socket(app.listen(PORT,()=>console.log(`What's the problem? we on ${PORT}`)))

    io.on('connection', socket =>{
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name, message})
    })
})

// io.on('connection', socket =>{
//     socket.on('message', ({name, message}) =>{
//        socket.broadcast.emit('message', {name, message})
//     })
// })
    io.on('connection', socket => {
        console.log('User Connected');
        io.emit('message dispatched', 'hello');
        //EVERYONE
//         socket.on('message sent', data => {
//           console.log(data)
//           io.emit('message dispatched', data.message);
//         })
//Not Everyone
        socket.on('message sent', data => {
    console.log(data)
    socket.broadcast.emit('message dispatched', data.message);
  })
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});