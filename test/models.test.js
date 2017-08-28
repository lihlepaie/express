const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function() {

  var models = Models("mongodb://localhost/listNames-tests");

  beforeEach(function(done) {
    models.greeted.remove({}, function(err){
      done(err);

    });

  })

    it('store greeting for MongoDB', function(done) {

           var greetedData = {  name: 'The test name'}

             models.greeted
            .create(greetedData,  function(err) {
                        // done(err);

models.greeted.find({  name: 'The test name'}, function(err, greeteds){
            assert.equal(1, greeteds.length);
            done(err);
})

                    });


    });
  })
