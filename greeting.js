module.exports = function(models) {

    var greetedUser = []
    var language = []

    const index = function(req, res, next) {
      res.render('names/add');

    };

    const greet = function(req, res, next) {

        var language = req.body.language;

        var user = {
            name: req.body.name,
            counter: 1
        }

        if (!user.name || !language) {
          req.flash('error', 'Name should not be blank and plase select language to be greeted in');
          res.redirect('/greeted');
        }
        else {
          models.Greeted.create( user, function(err, results){
            if (err){
              if (err.code === 11000){
                models.Greeted.findOne({
                  name : user.name
                })
                .exec(function(err, results){
                  if (results){
                    results.counter = results.counter + 1;
                    results.save();
                  }
                })
                req.flash('error', 'Welcome back, ' + user.name);
              }
              else {
                return next(err);
              }
            }
            models.Greeted.find({}, function(err, results){
                if (err) {
                  return next(err);
                }
                else {

                  var message = language + ", " + user.name;
                  res.render('names/add', {
                    message : message,
                    count: results.length});
                }
            })

          })
          }
    }

    const greeted = function(req, res, next) {
        models.Greeted.find({}, function(err, names) {
            if (err) {
                return next(err);
            }
            //else {
                res.render('names/greeted', {
                    names:names

                });
            //}
        })

    }

    const greetedCounter = function(req, res, next) {
        var name = req.params.name;
        var greetingsCounter = 0;
        // for (var i = 0; i < greetedUser.length; i++) {
        //     if (greetedUser[i] === name) {
        //
        //         greetingsCounter++;


        models.Greeted.findOne({ name: req.params.name}, function(err, greeted) {

            if (err) {
                return next(err)
            }

            var mssg = "Hello, " + greeted.name + " has been greeted " + greeted.counter + ' times ';
            res.render("names/greetedCounter", {
                name: mssg,


            });



        });
        // }
        // }
    }

    const greetmsg = function(req, res) {
        // console.log(req.body.name);
        var name = req.params.name;
        greetedUser.push(name);
        res.send("Hello , " + req.params.name);
    }

    const counter = function(req, res) {
        // console.log(greetedUser);
        // var name = req.params.name;
        // var uniqueList = [];
        // for (var i = 0; i < greetedUser.length; i++) {
        //     if (uniqueList.indexOf(greetedUser[i]) === -1) {
        //         console.log(greetedUser);
        //         uniqueList.push(greetedUser[i]);
        //     }
        // }


        res.render('names/index', {
            names: uniqueList,
            number: counter
        });

    }
    return {
        index,
        greet,
        greeted,
        greetedCounter
        

    }
}
