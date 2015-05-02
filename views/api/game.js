var score = {
	you: 0,
	me: 0
};

exports.read = function(req, res){
  var action = req.query.action;

  res.json(score);
};

exports.write = function(req, res){
  var action = req.query.action;

  score = req.body;
  res.json(score);
};

exports.test = function(req, res){
  var name = req.params.name;

  console.log('name: ' + name);
  res.json(score);
};