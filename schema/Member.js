'use strict';

// Game
exports = module.exports = function(app, mongoose) {
    var memberSchema = new mongoose.Schema({

    	Name:   { type: String, default: ''}, 
    	Phone:  { type: String, default: ''}, 
    	Email:  { type: String, default: ''}, 
    	Address:{ type: String, default: ''}, 
    	Age:    { type: Number, default: 0}, 

        date: { type: Date, default: Date.now },
    });

    memberSchema.index({ Name: 'text' });

    app.db.model('Member', memberSchema);
}
