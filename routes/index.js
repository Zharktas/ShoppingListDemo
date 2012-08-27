
/*
 * GET home page.
 */

var categories = ["Category", "Housewares", "Vegetables", "Milks", "Meats"];
var lists = [{id: 0, name: "foo", items: [{id: 0, name: "bar", category: 0, done: false}]}];

var layouts = [{id: 0, name: "Unordered", order: [0,1,2,3,4]}, {id: 1, name: "Duo", order: [0, 2, 4, 3, 1]}];


var io;

exports.setIO = function (socket){
    io = socket;
    io.sockets.on('connection', function(socket){
        socket.on('update contents', function(data){
            socket.broadcast.emit("update page",{data: data.data});
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
    var id = req.params.id;
    res.render('editlist', { title: 'Shopping', list: lists[id], categories: categories, newitem: false });
};

exports.index = function(req,res){
    res.render('index',{title: 'Shopping', lists: lists.slice(-5).reverse()});
};

exports.newlist = function(req,res){
    var newId = lists.length;
    var newName = "New List";
    var items = [{id:0, name: 'New Item', category: 0, done: false}];
    lists.push({id: newId, name: newName, items: items});

    res.render('editlist',{title: 'Shopping', list: {id: newId, name: newName, items: items}, categories: categories, newitem: true} );

};

exports.viewlist = function(req, res){
    var id = req.params.id;
    var ref = req.header('referer');
    if (ref.indexOf("lists") != -1){
        res.render('viewlist', {title: 'shopping', list: lists[id], layouts: layouts, path: "lists"});
    }
    else{
        res.render('viewlist', {title: 'shopping', list: lists[id], layouts: layouts, path: "/"});
    }
};

exports.lists = function(req,res){

    res.render("lists", {title: 'shopping', lists: lists.slice(0).reverse()});
};

exports.done = function(req,res){
    var listid = req.params.listid;
    var itemid = req.params.itemid;

    lists[listid].items[itemid].done = !lists[listid].items[itemid].done;
    res.json({done: lists[listid].items[itemid].done});

};