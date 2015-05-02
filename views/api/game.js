var score = {
	you: 0,
	me: 0
};

exports.read = function(req, res){
  res.json(score);
};

exports.write = function(req, res){
  score = req.body;
  res.json(score);
};