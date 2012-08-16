
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



exports.editlist = function(req, res){
  res.render('editfile', { title: 'Shopping', contents: contents });
};

exports.index = function(req,res){
    res.render('index',{title: 'Shopping'});
};

exports.newlist = function(req,res){

};

exports.viewlist = function(req, res){

};

exports.lists = function(req,res){

};