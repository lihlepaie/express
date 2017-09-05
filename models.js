const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl)


  // const greetedSchema =mongoose.Schema({
  //   name: String,
  //   counter: Number
  // });
  // greetedSchema.index({name : 1}, {unique : true});

  const Greeted = mongoose.model('greetdb', {name: String, counter: Number});


  return{
    Greeted
  };
}
