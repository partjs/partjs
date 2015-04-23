/**
 * Modules
 */
 /**
 * Modules
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Automation = require('automationjs-dev');

/**
 * Setup
 */
Backbone.$ = $;
var app = app || {};

/**
* MODELS
**/
app.SpotNewsPush = Backbone.Model.extend({
	url: function() {
		return '/1/sandbox/weather/' 
		+ this.attributes.city;
	},
	wsUrl: function() {
		return 'ws://localhost:8080/' 
	},
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		city: '',
		country: '',
		img: '',

		temp: 0,
		lowpulseoccupancytime: 10
	},
	// AutomationJS plugins
	parseJSON: function() {
		var lowpulseoccupancytime = this.get('lowpulseoccupancytime');

		this.set('lowpulseoccupancytime', lowpulseoccupancytime * 4500);
	}
});

/**
* VIEWS
**/
app.SpotsPushView = Backbone.View.extend({
	el: '#demo-spot',
	template: _.template( $('#tmpl-spot-news').html() ),
	events: {
		'click #btn-demo-spot': 'handleTaget',
		'click .btn-spot-news': 'handleCurrentTaget'
	},
	initialize: function() {
        this.component = new Automation({
          el: this.$el,
          model: app.SpotNewsPush,
          template: this.template
        });

        // initialize sub tree
        var model = this.component.add({
        	city: 'Taipei', 
        	country: 'tw',
        	lowpulseoccupancytime: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '/images/gallery/timeline-1.jpg'
        });

        model.bind('notify.change', this.render, model);
	},
	handleTaget: function(ev) {
		ev.preventDefault();
		
		this.$el
			.find(ev.target)
			.addClass('hide');		
	},
	handleCurrentTaget: function(ev) {
		ev.preventDefault();
		
		var elm = this.$el.find(ev.currentTarget);
		var cid = elm.data('cid');	

		this.component.trigger('forceUpdateAll');
	},
	render: function() {
        $('#current div.bottom')
        	.css('height', '60px')
			.animate({
				height: this.get('lowpulseoccupancytime')
			}, 1000);
	}
});

/**
* BOOTUP
**/
// Use jQuery ready in browserify mode
// since require() in Node.js is async.
$(function() {
	app.spotsPushView = new app.SpotsPushView();
});