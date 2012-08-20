
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express(),
server = http.createServer(app);

var io = require('socket.io').listen(server);

if ( process.env.websockets == false ){
    io.configure(function (){
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });
}
routes.setIO(io);

app.configure('all', function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/new', routes.newlist);
app.get('/lists', routes.lists);
app.get('/edit/:id', routes.editlist);
app.get('/view/:id', routes.viewlist);
app.get('/done/:listid/:itemid', routes.done);


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
