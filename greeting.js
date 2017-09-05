module.exports = function(models) {

    var greetedUser = []
    var language = []

    const index = function(req, res, next) {
        models.Greeted.find({}, function(err, greeteds) {

            if (err) {
                return next(err)
            }
            res.render('names/add');
        });
    };

    const greet = function(req, res, next) {
        var user = {
            name: req.body.name,
            counter: 1
        }

        function storeNames(name, cb){
            Greeted.findOne({name : name}, function(err, person){

                if (!person){
                    var people = new person({ name: name, timesGreeted : 1 });
                    people.save(cb);
                }

                else{

                    if (person.timesGreeted > 5){
                        person.timesGreeted = 0;
                    }
                    else{
                        person.timesGreeted = person.timesGreeted + 1;
                    }
                    person.save(cb);
                }
            });
        }
        var language = req.body.language;
        var greetmessage = language + ',' + user.name;

        models.Greeted.create(user, function(err, results) {
            console.log(results);
            if (err) {
                return next(err)
            };
            // saved!
            res.render('names/add', {
                message: greetmessage,
                count: results.number

            });
        })
    }

    const greeted = function(req, res, next) {
        models.Greeted.find({}, function(err, results) {
            if (err) {
                return next(err);
            } else {
                res.render('names/greeted', {
                    names: results

                });
            }
        })

    }

    const greetedCounter = function(req, res, next) {
        var name = req.params.name;
        var greetingsCounter = 0;
        // for (var i = 0; i < greetedUser.length; i++) {
        //     if (greetedUser[i] === name) {
        //
        //         greetingsCounter++;


        models.Greeted.findOne({ name }, function(err, greeted) {

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
