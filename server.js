var express = require('express');

var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash')
var session = require('express-session')
// var nameRoutes = NameRoutes();
var GreetRoutes = require('./greeting');
var Models = require('./models')

var models = Models('mongodb://localhost/listNames');

var greetRoutes = GreetRoutes(models);
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
app.set('port',(process.env.PORT || 5000) );

app.listen(app.get('port'), function(){
  console.log("Web app started on port: ", app.get('port'));
});
