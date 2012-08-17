
/*
 * GET home page.
 */

var contents = "Hi thar!";
var lists = [{id: 0, name: "foo", items: []}];


var io;

exports.setIO = function (socket){
    io = socket;
    io.sockets.on('connection', function(socket){
        socket.on('update contents', function(data){
            contents = data.data;
            socket.emit('saved');
            console.log(contents);
            socket.broadcast.emit("update page",{data: contents});
        });

        socket.on('new list', function(list){
            socket.broadcast.emit("add list",list);
        });

        socket.on('update title', function(list){
            lists[list.id].name = list.name;
            socket.broadcast.emit("update list", list);
        });

        socket.on('update list', function(list){
             lists[list.id].items = list.items;
            console.log(list.items);
        });
    });
};



exports.editlist = function(req, res){
  res.render('editfile', { title: 'Shopping', contents: contents });
};

exports.index = function(req,res){
    res.render('index',{title: 'Shopping', lists: lists.slice(-5)});
};

exports.newlist = function(req,res){
    var newId = lists.length;
    var newName = "Uusi lista"
    lists.push({id: newId, name: newName});
    res.render('newlist',{title: 'shopping', list: {id: newId, name: newName}} );

};

exports.viewlist = function(req, res){

};

exports.lists = function(req,res){

};