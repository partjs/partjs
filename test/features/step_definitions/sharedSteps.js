'use strict';

module.exports = function() {
  //this.World = require('../support/world');

  this.Given(/^User login$/, function(callback) {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a new this.World instance.
    // i.e. you may use this.browser to execute the step:

    callback.pending();
    //this.visit('/login', callback);

    // The callback is passed to visit() so that when the job's finished, the next step can
    // be executed by Cucumber.
  });

  this.When(/^Interact with upload element$/, function(callback) {
    // Express the regexp above with the code you wish you had. Call callback() at the end
    // of the step, or callback.pending() if the step is not yet implemented:

    callback.pending();
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, callback) {
  	// matching groups are passed as parameters to the step definition

    // var pageTitle = this.browser.text('title');
    // if ('Page Not Found' === pageTitle) {
    //   callback.fail(new Error("Expected to be implemented."));
    // }

    // this.browser.text('body').should.include.string(text);
    // callback();

    callback.pending();
  });
  
  this.Given(/^The latest photo gallery$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^Tap to next photo$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I see one photo$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^Full page$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
