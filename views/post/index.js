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

var moment = require('moment');

exports.init = function (req, res, next)
{
    var workflow = new req.app.utility.workflow(req, res);
    var sort = '';

    sort = req.query.sort ? req.query.sort : '-date';

    workflow.on('query', function() {
        req.app.db.models.Post
            .find({})
            .sort(sort)
            .exec(function (err, posts) {
                    if (err) return workflow.emit('exception', err);

                    //Reduce
                    workflow.outcome.data = [];

                    posts.forEach(function (post) {
                        if (post.isActive === true)
                            workflow.outcome.data.push({
                                date: moment(post.date).fromNow(),
                                tags: post.tags,
                                typeTags: post.typeTags,
                                url: post.url,
                                title: post.title,
                                organizer: post.organizer,
                                startDate: moment(post.startDate).format('YYYY-MM-DD'),
                                endDate: moment(post.endDate).format('YYYY-MM-DD')
                            });
                    });

                    return workflow.emit('render');
            });
    });

    workflow.on('render', function() {
        res.render('post/index', {
            posts: workflow.outcome.data
        });
    });

    return workflow.emit('query');
};