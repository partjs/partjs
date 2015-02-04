'use strict';

exports.init = function(req, res){
  res.render('index');
};

exports.sensor = function(req, res){
  res.render('sensor');
};

exports.dashboard = function(req, res){
  res.render('dashboard');
};

exports.about = function(req, res){
  res.render('about');
};
