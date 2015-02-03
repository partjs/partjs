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
app.SpotNews = Backbone.Model.extend({
	url: function() {
		return '/1/sandbox/weather/' 
		+ this.attributes.city;
	},
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		city: '',
		country: '',
		img: '',

		temp: 0
	},
	// AutomationJS plugins
	parseJSON: function(response) {
		// parse response
		var f = Math.round((response.main.temp - 273.15) * 1.8 + 32)
		,	c = Math.round((response.main.temp - 273.15));

		this.set('temp', c);
	}
});

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

		temp: 0
	}
});

/**
* VIEWS
**/
app.SpotsView = Backbone.View.extend({
	el: '#demo-spot',
	template: _.template( $('#tmpl-spot-news').html() ),
	events: {
		'click #btn-demo-spot': 'handleTaget',
		'click .btn-spot-news': 'handleCurrentTaget'
	},
	initialize: function() {
        this.component = new Automation({
          el: this.$el,
          model: app.SpotNews,
          template: this.template
        });

        this.render();
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
		
        this.component.add({
        	city: 'Taipei', 
        	country: 'tw',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '/images/gallery/timeline-1.jpg'
        });

        this.component.trigger('forceUpdateAll');
	}
});

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

        this.render();
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
		
        this.component.add({
        	city: 'Taipei', 
        	country: 'tw',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '/images/gallery/timeline-1.jpg'
        });

        // Your don't need to trigger any event since
        // this is real-time data model via WebSocket.
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