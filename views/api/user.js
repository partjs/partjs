exports.read = function(req, res){
  var age = req.query.age;
  var name = req.query.name;
  var filter = {};

  if (typeof(age) !== 'undefined')
  	filter['Age'] = { $gt: age };

  if (typeof(name) !== 'undefined')
  	filter['$text'] = { $search: name };

  req.app.db.models.Member.find(filter, function(err, users) {
    res.json({ data: users });
  });
};

exports.readById = function(req, res){
  var id = req.params.id;

  req.app.db.models.Member.findOne({ _id: id}, function(err, user) {
    res.json(user);
  });
};