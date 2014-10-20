/**
Copyright (C) 2013 Moko365 Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * CRUD implementation of REST API '/1/post'
 */

exports.create = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);

    workflow.on('validate', function() {
        // Backbone way use req.body, not req.query
        if (!req.body.organizer) workflow.outcome.errfor.organizer = '請填寫主辦單位';
        if (!req.body.title) workflow.outcome.errfor.title = '請填寫課程名稱';
        if (!req.body.url) workflow.outcome.errfor.url = '請輸入課程網址';
        if (!req.body.typeTags) workflow.outcome.errfor.typeTags = '請選擇課程類型';
        if (!req.body.startDate) workflow.outcome.errfor.startDate = '請選擇課程的開課時間';

        //return if we have errors already
        if (workflow.hasErrors()) {
            workflow.outcome.errors.push('有欄位尚未填寫');
            return workflow.emit('response');
        }

        if (req.body.preview === true) {
            workflow.outcome.status = 'preview';
            return workflow.emit('response');
        }

        return workflow.emit('saveNewPost');
    });

    workflow.on('saveNewPost', function() {
        var fieldsToSet = {
            organizer: req.body.organizer.trim(),
            title: req.body.title.trim(),
            url: req.body.url.trim(),
            typeTags: req.body.typeTags.split(','),
            startDate: req.body.startDate,
            userCreated: {
                name: 'Default',
                time: new Date().toISOString()
            }
        };

        new req.app.db.models.Post(fieldsToSet).save(function(err) {
            if (err) return workflow.emit('exception', err);
            return workflow.emit('response');
        });
    });

    return workflow.emit('validate');
};

// by Query String (REST Console, jQuery AJAX etc)
exports.createByQuery = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);

    console.log('by query');

    workflow.on('validate', function() {
        // use req.query
        if (!req.query.organizer) workflow.outcome.errfor.organizer = '請填寫主辦單位';
        if (!req.query.title) workflow.outcome.errfor.title = '請填寫課程名稱';
        if (!req.query.url) workflow.outcome.errfor.url = '請輸入課程網址';
        if (!req.query.typeTags) workflow.outcome.errfor.typeTags = '請選擇課程類型';
        if (!req.query.startDate) workflow.outcome.errfor.startDate = '請選擇課程的開課時間';

        //return if we have errors already
        if (workflow.hasErrors()) {
            workflow.outcome.errors.push('有欄位尚未填寫');
            return workflow.emit('response');
        }

        return workflow.emit('saveNewPost');
    });

    workflow.on('saveNewPost', function() {
        var fieldsToSet = {
            organizer: req.query.organizer.trim(),
            title: req.query.title.trim(),
            url: req.query.url.trim(),
            typeTags: req.query.typeTags.split(','),
            startDate: req.query.startDate,
            userCreated: {
                name: 'Default',
                time: new Date().toISOString()
            }
        };

        new req.app.db.models.Post(fieldsToSet).save(function(err) {
            if (err) return workflow.emit('exception', err);
            return workflow.emit('response');
        });
    });

    return workflow.emit('validate');
};

// Default: read all posts
exports.readAll = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);

    // defaults: no limits
    req.query.limit = req.query.limit ? parseInt(req.query.limit) : 999;
    //req.query.page = req.query.page ? parseInt(req.query.page) : 1;
    req.query.sort = req.query.sort ? req.query.sort : '-date';

    workflow.on('listPost', function() {
        req.app.db.models.Post.pagedFind({
            keys: 'organizer title url tags isActive date startDate endDate typeTags userCreated',
            limit: req.query.limit,
            sort: req.query.sort
        }, function(err, posts) {
            if (err) return workflow.emit('exception', err);

            for(var key in posts) {
                workflow.outcome[key] = posts[key];
            }

            return workflow.emit('response');
        });
    });

    return workflow.emit('listPost');
};

exports.activate = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);
    var subject = req.params.subject.trim();
    var url = decodeURIComponent(subject);

    workflow.on('updatePost', function() {
        var fieldsToSet = {
            isActive: true
        };

        req.app.db.models.Post.update({ subject: url}, fieldsToSet, { multi: true }, function(err, numAffected) {
            if (err) return workflow.emit('exception', err);

            workflow.outcome.numAffected = numAffected;

            return workflow.emit('response');
        });
    });

    workflow.emit('updatePost');
}

exports.inactivate = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);
    var subject = req.params.subject.trim();
    var url = decodeURIComponent(subject);

    workflow.on('updatePost', function() {
        var fieldsToSet = {
            isActive: false
        };

        req.app.db.models.Post.update({ subject: url}, fieldsToSet, { multi: true }, function(err, numAffected) {
            if (err) return workflow.emit('exception', err);

            workflow.outcome.numAffected = numAffected;

            return workflow.emit('response');
        });
    });

    workflow.emit('updatePost');
}

exports.delete = function(req, res, next) {
    var workflow = new req.app.utility.workflow(req, res);
    var _id = req.params.id;

    workflow.on('deletePost', function() {
        req.app.db.models.Post.findByIdAndRemove(_id, function(err, post) {
            if (err) return workflow.emit('exception', err);

            workflow.outcome.post = post;
            
            return workflow.emit('response');
        });
    });

    workflow.emit('deletePost');
}