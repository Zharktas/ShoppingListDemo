
/*
 * GET home page.
 */

var contents = "Hi thar!";
var io;

exports.setIO = function (socket){
    io = socket;
    io.sockets.on('connection', function(socket){
        socket.on('update contents', function(data){
            contents = data.data;
            socket.emit('saved');
            console.log(contents);
            socket.broadcast.emit("update page",{data: contents});
        })
    });
};



exports.index = function(req, res){
  res.render('editfile', { title: 'Express', contents: contents });
};