
/*
 * GET home page.
 */

var contents = "Hi thar!";
var categories = ["undefined", "Taloustavarat", "Kasvis", "Maito", "Liha"];
var lists = [{id: 0, name: "foo", items: [{id: 0, name: "bar", category: 0, done: false}]}];

var layouts = [{id: 0, name: "Järjestämätön", order: [0,1,2,3,4]}, {id: 1, name: "Duo", order: [0, 2, 4, 3, 1]}];


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
            socket.broadcast.emit("update title", list);
        });

        socket.on('update items', function(list){
            lists[list.id].items = list.items;
            socket.broadcast.emit('update items', list) ;
        });
    });
};



exports.editlist = function(req, res){
  res.render('editfile', { title: 'Shopping', contents: contents });
};

exports.index = function(req,res){
    res.render('index',{title: 'Shopping', lists: lists.slice(-5).reverse()});
};

exports.newlist = function(req,res){
    var newId = lists.length;
    var newName = "Uusi lista";
    lists.push({id: newId, name: newName, items: [{id:0, name: 'Uusi tavara', category: 0, done: false}]});

    res.render('newlist',{title: 'shopping', list: {id: newId, name: newName}, categories: categories} );

};

exports.viewlist = function(req, res){
    var id = req.params.id;
    console.log(lists[id]);
    res.render('viewlist', {title: 'shopping', list: lists[id], layouts: layouts});
};

exports.lists = function(req,res){

    res.render("lists", {title: 'shopping', lists: lists.slice(0).reverse()});
};

exports.done = function(req,res){
    var listid = req.params.listid;
    var itemid = req.params.itemid;

    lists[listid].items[itemid].done = true;
    res.json({done: true});

};