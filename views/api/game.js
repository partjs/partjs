var score = {
	you: 0,
	me: 0
};

exports.read = function(req, res){
  var action = req.query.action;

  req.app.db.models.Game.find({ me: 1}, function(err, scores) {
    res.json(scores);
  });
};

exports.write = function(req, res){
  var score = req.body;

  var document = new req.app.db.models.Game(score);
  document.save();
};

exports.test = function(req, res){
  var name = req.params.name;

  console.log('name: ' + name);
  res.json(score);
};