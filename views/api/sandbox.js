exports.weather = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);
    var city = req.params.city;

    workflow.on('validate', function() {
        workflow.emit('getWeather');
    });

    workflow.on('getWeather', function() {
        // 1 to 30
        var temp = Math.floor((Math.random() * 30) + 1);

        workflow.outcome.city = city;
        workflow.outcome.temp = temp;

        workflow.emit('response');
    });

    return workflow.emit('validate');
};