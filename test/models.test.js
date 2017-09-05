const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function() {

  var models = Models("mongodb://localhost/listNames-tests");

  beforeEach(function(done) {
    models.Greeted.remove({}, function(err){
      done(err);

    });

  })

    it('store greeting for MongoDB', function(done) {

      var greetedData = {  name: 'The test name'}

      models.Greeted
      .create(greetedData,  function(err) {

models.Greeted.find({  name: 'The test name'}, function(err, greeteds){
            assert.equal(1, greeteds.length);
            done(err);
})

        });
    });
    it('should not allow duplicate greeteds', function(done){

      var greetedData = {  name: 'The test name'}

      models.Greeted
      .create(greetedData,  function(err) {

        var greetedData = {  name: 'The test name'}

        models.Greeted
        .create(greetedData,  function(err) {
          assert.ok(err, 'should give an error for duplicate greeteds')
          done();

});
    });
  })
})
