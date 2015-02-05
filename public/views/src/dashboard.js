/**
 * Modules
 */
 /**
 * Modules
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Automation = require('automationjs');

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
		return 'ws://sockets.mbed.org/ws/mbedschool/ro';
	},
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		city: '',
		country: '',
		img: '',

		lowpulseoccupancytime: 10,
		temp: '',
		x: 10,
		y: '',
		z: '',
		ax: '',
		ay: '',
		az: ''
	},
	// AutomationJS plugins
	parseJSON: function() {
		var normal_x = this.get('x')
		,	normal_y = this.get('y')
		,	normal_z = this.get('z');

		normal_x = ((normal_x / 10000) + 1) * 100;
		normal_y = ((normal_y / 10000) + 1) * 100;
		normal_z = ((normal_z / 10000) + 1) * 100;

		this.set('x', normal_x);
		this.set('y', normal_y);
		this.set('z', normal_z);
	}
});

app.TestUp = Backbone.Model.extend({
	url: function() {
		return '/1/sandbox/weather/' 
		+ this.attributes.city;
	},
	wsUrl: function() {
		return 'ws://192.168.21.104:8080/';
	},
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		city: '',
		country: '',
		img: '',

		lowpulseoccupancytime: 10,
		temp: '',
		x: 10,
		y: '',
		z: '',
		ax: '',
		ay: '',
		az: ''
	},
	// AutomationJS plugins
	parseJSON: function() {
		var ax = this.get('ax')
		,	ay = this.get('ay')
		,	az = this.get('az');



		this.set('result', false);
	}
});

app.Accel = Backbone.Model.extend({
	url: function() {
		return '/1/sandbox/weather/' 
		+ this.attributes.city;
	},
	wsUrl: function() {
		return 'ws://192.168.21.104:8080/' 
	},
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		ax: 10,
		ay: 10,
		az: 10,

		degree_x: 0
	},
	// AutomationJS plugins
	parseJSON: function() {
		var ax = 0 + this.get('ax')
		,	ay = 0 + this.get('ay');

		var comp_x = 1;

		if (ax < 0)
			comp_x = -1;

		ax = ax * comp_x;

		// normalized
		var g = [
			0.000,
			0.047,
			0.094,
			0.141,
			0.188,
			0.234,
			0.281,
			0.328,
			0.375,
			0.422,
			0.469,
			0.516,
			0.563,
			0.609,
			0.656,
			0.703,
			0.750,
			0.797,
			0.844,
			0.891,
			0.938,
			0.984
		];

		var angle = [
			0,
			2.69,
			5.38,
			8.08,
			10.81,
			13.55,
			16.33,
			19.16,
			22.02,
			24.95,
			27.95,
			31.04,
			34.23,
			37.54,
			41.01,
			44.68,
			48.59,
			52.83,
			57.54,
			62.95,
			69.64,
			79.86
		];

		for (i = 0; i < g.length; i++) {
			if (ax === g[i]) {
				this.set('degree_x', angle[i] * comp_x);
				break ;
			}
		}
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

        //model.bind('notify.change', this.render, model);
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
				height: this.get('x')
			}, 1000);
	}
});

app.TestUpView = Backbone.View.extend({
	el: '#test-up',
	template: _.template( $('#tmpl-test-up').html() ),
	events: {
		'click #btn-demo-spot': 'handleTaget',
		'click .btn-spot-news': 'handleCurrentTaget'
	},
	initialize: function() {
        this.component = new Automation({
          el: this.$el,
          model: app.TestUp,
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

        //model.bind('notify.change', this.render, model);
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
				height: this.get('x')
			}, 1000);
	}
});

app.AccelView = Backbone.View.extend({
	el: '#demo-accel',
	template: _.template( $('#tmpl-accel').html() ),
	events: {
	},
	initialize: function() {
        this.component = new Automation({
          el: this.$el,
          model: app.Accel,
          template: this.template
        });

        // initialize sub tree
        var model = this.component.add({
        	ax: 10,
        	ay: 20,
        	az: 30,

        	degree_x: 0
        });

        model.bind('notify.change', this.render, model);
	},
	render: function() {
		var degree_x = this.get('degree_x');

		$('.progress').css('-webkit-transform', 'rotate(' 
			+ degree_x
			+ 'deg)');
	}
});

/**
* BOOTUP
**/
// Use jQuery ready in browserify mode
// since require() in Node.js is async.
$(function() {
	//app.spotsPushView = new app.SpotsPushView();
	app.testUp = new app.TestUpView();
	app.accelView = new app.AccelView();
});