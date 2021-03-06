'use strict';

// Post
exports = module.exports = function(app, mongoose) {
    var postSchema = new mongoose.Schema({

        organizer: { type: String, default: ''}, 
        title: { type: String, default: ''},
        url: { type: String, default: ''}, 
        typeTags: [{ type: String, default: ''}],
        tags: [{ type: String, default: ''}],
        isActive: { type: Boolean, default: true },
        startDate: { type: Date },
        endDate: { type: Date },

        // update date
        date: { type: Date, default: Date.now },

        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    });

    postSchema.plugin(require('./plugins/pagedFind'));

    postSchema.index({ organizer: 1 });
    postSchema.index({ tags: 1 });
    postSchema.index({ tags: 1 });

    postSchema.set('autoIndex', true);
    app.db.model('Post', postSchema);
}
