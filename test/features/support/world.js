// test/features/support/world.js
'use strict';

module.exports = function() {
  var zombie = require('zombie')
    , HTML5  = require('html5');

  this.World = function World(callback) {
    this.browser = new zombie.Browser(/* {runScripts:true, debug:false, htmlParser: HTML5} */);

    this.page = function(path) {
     return "http://localhost:3000" + path;
    };

    this.visit = function(path, callback){
      this.browser.visit( this.page(path), function(err, browser, status) {
        callback(err, browser, status);
      });
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
  };
};