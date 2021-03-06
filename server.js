var express = require('express');

var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash')
var session = require('express-session')
var GreetRoutes = require('./greeting');
var Models = require('./models')

var models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/greeted');
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

//routes
app.get('/greetings', greetRoutes.index);
app.post('/greetings', greetRoutes.greet);
app.get('/greeted', greetRoutes.greeted);
app.get('/counter/:name', greetRoutes.greetedCounter);
app.get('/reset', greetRoutes.reset);


//start the server
app.set('port',(process.env.PORT || 5000) );

app.listen(app.get('port'), function(){
  console.log("Web app started on port: ", app.get('port'));
});
