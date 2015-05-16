'use strict';

// Game
exports = module.exports = function(app, mongoose) {
    var gameSchema = new mongoose.Schema({

        you: { type: Number, default: 0}, 
        me: { type: Number, default: 0}, 
        date: { type: Date, default: Date.now },
    });

    app.db.model('Game', gameSchema);
}
