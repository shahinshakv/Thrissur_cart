const io = require('./app').get('socketio');

const app = require('./server');

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('new-product', (data) => {
        console.log(`New product created: ${data}`);
        io.emit('new-product', data);
    });
  
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
