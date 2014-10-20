/**
Copyright (C) 2014 Moko365 Inc. All Rights Reserved. 

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
/* global app:true */

(function() {
'use strict';

var app = app || {};

/**
 * MODELS
 **/
app.Post = Backbone.Model.extend({
	url: '/1/post',
	defaults: {
		success: false,
		errors: [],
		errfor: {}
	}
});

app.Form = Backbone.Model.extend({
	url: '/1/post',
	defaults: {
		success: false,
		errors: [],
		errfor: {},

        organizer: '',
        title: '',
        url: '',
        startDate: '',
        typeTags: '',

        preview: true
	}
});

/**
 * VIEWS
 **/
app.PostView = Backbone.View.extend({
	el: '#course-list',
	template: _.template( $('#tmpl-post-item').html() ),
	events: {
	},
	initialize: function() {
		this.model = new app.Post();
		this.listenTo(this.model, 'sync', this.render);
	},
	render: function() {
	 	this.$el.html(this.template( this.model.attributes ));
	},
	syncUp: function() {
		this.model.fetch();
	}
});

app.FormView = Backbone.View.extend({
	el: '#submit-form',
	template: _.template( $('#tmpl-submit-form').html() ),
	events: {
        'submit form': 'preventSubmit',
        'click #save-post': 'save',
        'click #preview-post': 'preview'
	},
	initialize: function() {
		this.model = new app.Form();
		this.listenTo(this.model, 'sync', this.render);
		this.render();
	},
	render: function() {
	 	this.$el.html(this.template( this.model.attributes ));

	 	$('#datepicker').datepicker();
	},
    preventSubmit: function(event) {
      event.preventDefault();
    },
    preview: function() {
    	var preview = this.model.get('preview');

    	if (preview === true) {
	    	this.$el.find('[name="organizer"]').prop('disabled', true);
	    	this.$el.find('[name="title"]').prop('disabled', true);
	    	this.$el.find('[name="url"]').prop('disabled', true);
	    	this.$el.find('[name="typeTags"]').prop('disabled', true);
	    	this.$el.find('[name="startDate"]').prop('disabled', true);

	    	this.$el.find('#save-post').prop('disabled', false);
	    	this.$el.find('#save-post').removeClass('hide');
			this.$el.find('#preview-post').text('我還要修改');

			this.model.set('preview', false);
		} else {
	    	this.$el.find('[name="organizer"]').prop('disabled', false);
	    	this.$el.find('[name="title"]').prop('disabled', false);
	    	this.$el.find('[name="url"]').prop('disabled', false);
	    	this.$el.find('[name="typeTags"]').prop('disabled', false);
	    	this.$el.find('[name="startDate"]').prop('disabled', false);

	    	this.$el.find('#save-post').prop('disabled', true);
	    	this.$el.find('#save-post').addClass('hide');
			this.$el.find('#preview-post').text('預覽結果');

			this.model.set('preview', true);
		}
    },
	save: function() {
		var self = this;

		// update model attributes
		// 支援表單錯誤處理
		this.model.set('organizer', this.$el.find('[name="organizer"]').val());
		this.model.set('title', this.$el.find('[name="title"]').val());
		this.model.set('url', this.$el.find('[name="url"]').val());
		this.model.set('typeTags', this.$el.find('[name="typeTags"]').val());
		this.model.set('startDate', this.$el.find('[name="startDate"]').val());
		this.model.set('preview', false);

		this.model.save(this.model.attributes, {
          success: function(model, response, options) {
          	console.log(response.status);
              if (response.success === true
              		&& response.status !== 'preview') {
              	//app.postView.syncUp();
			 	$('#course-list').addClass('hide');
              }
          },
          complete: function(model, response, options) {

          },
          error: function(model, response, options) {
          }
        });
	}
});

$(document).ready(function() {
	//app.postView = new app.PostView();
	app.formView = new app.FormView();

    // Smooth Scrolling
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // toggle submit button
	$('.btn-submit').on('click', function() {
		$('#submit-form').removeClass('hide');
	});
});

}());
