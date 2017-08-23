var express = require('express');

var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash')
var session = require('express-session')
// var nameRoutes = NameRoutes();
var GreetRoutes = require('./greeting');
var greetRoutes = GreetRoutes();
var app = express();


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(express.static('public'));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// create application/json parser
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());
// create a route names
app.get('/', greetRoutes.index);
app.post('/greetings', greetRoutes.greet);
app.get('/greeted', greetRoutes.greeted);
app.get('/count/:name', greetRoutes.greetedCounter);
// app.get('/counter/:names', greetRoutes.counter);

//start the server
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('node server.js', host, port);
});
