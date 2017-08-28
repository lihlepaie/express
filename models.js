const mongoose = require('mongoose');
module.exports = function(mongoUrl) {

  const greeted = mongoose.model('greeted',{name : String});
  mongoose.connection.on('error', function(err){
    console.log(err);
  });
  mongoose.connect(mongoUrl,{
  })

  return{
    greeted
  };
}
