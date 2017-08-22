module.exports = function() {

    var greetedUser = []
    var language = []

    const index = function(req, res) {
        res.render('names/add')
    }

    const greet = function(req, res) {
        var name = req.body.name;
        var language = req.body.language;
        var greetmessage = language + ',' + name;
        greetedUser.push(name)
        res.render('names/add', {
            message: greetmessage
        });
    }

    //
    // const Search = function(req, res) {
    //     var name = req.body.name
    //     var searchName = greetedUser.find(function(currentName) {
    //         return currentName === name;
    //     });
    //
    //     if (!searchName) {
    //         greetedUser.push(name)
    //     } else {
    //         req.flash('error', 'Names cannot be blank!')
    //     }
    //
    // }
    // const greetedCounter = function(req, res) {
    //     var name = req.params.names;
    //     var greetingsCounter = 0;
    //     // for (var i = 0; i < greetedUser.length; i++) {
    //     //     if (greetedUser[i] === name) {
    //     //
    //     //         greetingsCounter++;
    //     //     }
    //   res.send("Hello, " + name + " has been greeted " + greetingsCounter + ' times ');
    //
    // // }
    // }

    const greetmsg = function(req, res) {
        // console.log(req.body.name);
        var name = req.params.name;
        greetedUser.push(name);
        res.send("Hello , " + req.params.name);


        const counter = function(req, res) {
            // console.log(greetedUser);
            // var name = req.params.name;
            var uniqueList = [];
            for (var i = 0; i < greetedUser.length; i++) {
                if (uniqueList.indexOf(greetedUser[i]) === -1) {
                    console.log(greetedUser);
                    uniqueList.push(greetedUser[i]);
                }
            }
            res.render('names/index', {
                names: uniqueList
            });
        }
    }
    const greeted = function(req, res) {

      console.log(greetedUser);
        res.render('names/greeted', {
          names: greetedUser
        });
    }


    const greetedCounter = function(req, res) {
        var name = req.params.names;
        var greetingsCounter = 0;
        // for (var i = 0; i < greetedUser.length; i++) {
        //     if (greetedUser[i] === name) {
        //
        //         greetingsCounter++;
        //     }
      res.send("Hello, " + name + " has been greeted " + greetingsCounter + ' times ');

    // }
    }

    return {
        index,
        greet,
      greeted,
      greetedCounter

    }

}
