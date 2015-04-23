/**
 * Modules
 */
 /**
 * Modules
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Component = require('automationjs');

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
		return 'http://api.openweathermap.org/data/2.5/weather?q=' 
		+ this.attributes.city
		+ ','
		+ this.attributes.country;
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

/**
 *
 */
app.SpotNewsCollection = Backbone.Collection.extend({
    model: app.SpotNews
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
        this.component = new Component.SpotList({
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
	// Facade pattern
	render: function() {
        this.component.add({
        	city: 'London', 
        	country: 'uk',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.add({
        	city: 'Taipei', 
        	country: 'tw',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.add({
        	city: 'Singapore', 
        	country: 'sg',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.add({
        	city: 'Tainan', 
        	country: 'tw',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.add({
        	city: 'Shenzhen', 
        	country: 'cn',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.add({
        	city: 'Kyoto', 
        	country: 'jp',
        	temp: 0,
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.component.trigger('forceUpdateAll');
	}
});

/**
* BOOTUP
**/
// Use jQuery ready in browserify mode
// since require() in Node.js is async.
$(function() {
	app.spotsView = new app.SpotsView();
});