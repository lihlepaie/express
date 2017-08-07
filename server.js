var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var greetedUser=[];

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// create a route

app.get('/greetings/:name', function (req, res) {
  console.log(req.params.name);
  var name = req.params.name;
  greetedUser.push(name);
 res.send("Hello , "+req.params.name);

});
//create a greetedUser.push(name); route
app.get('/greeted', function (req, res) {
  console.log(greetedUser);
  // var name = req.params.name;
  var uniqueList=[];
  for (var i = 0; i < greetedUser.length; i++) {
    if(uniqueList.indexOf(greetedUser[i])===-1){
      console.log(greetedUser);
      uniqueList.push(greetedUser[i]);
    }
  }
    res.render('index', {names:uniqueList});

});
// creating a router for counter
app.get('/counter/:names', function (req, res) {
  var name = req.params.names;
  var greetingsCounter=0;
  for (var i = 0; i < greetedUser.length; i++) {
  if ( greetedUser[i]=== name){

    greetingsCounter++;
}
}
res.send("Hello, " + name + " has been greeted " +  greetingsCounter +  ' times ');
});

//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('node server.js', host, port);

});
