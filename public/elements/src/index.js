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

var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');


/**
 * SETUP
 **/
var app = app || {};


/**
 * MODELS
 **/
app.News = Backbone.Model.extend({
    defaults: {
        success: false,
        errors: [],
        errfor: [],
    }
});

/**
 * VIEWS
 **/
app.NewsView = Backbone.View.extend({
    el: '#news',
	template: _.template( $('#tmpl-news').html() ),
    initialize: function() {
        this.model = new app.News();
        this.model.bind('change', this.render, this);

        this.render();
    },
    render: function() {
        var innerHtml = this.template( this.model.attributes );

        this.$el.html(innerHtml);
    }
});

/**
 * BOOTUP
 **/

$(document).ready(function() {
    app.newsView = new app.NewsView();
});