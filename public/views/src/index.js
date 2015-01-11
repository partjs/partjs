/**
 * Modules
 */
var Elements = require('partjs-elements');

/**
 * Setup
 */
var app = app || {};

/**
* MODELS
**/
app.SpotNews = Backbone.Model.extend({
	defaults: {
		success: false,
		errors: [],
		errfor: {},

		title: '',
		href: '',
		img: ''
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
		'click #btn-demo-spot': 'handleTaget'
	},
	initialize: function() {
		//this.model = new app.SpotNews();
        this.widget = new Elements.Spot({
          el: this.$el,
          model: app.SpotNews,
          collection: app.SpotNewsCollection,
          template: this.template
        });
	},
	handleTaget: function(ev) {
		ev.preventDefault();
		
		this.$el
			.find(ev.target)
			.addClass('hide');
		
		this.render();
	},
	handleCurrentTaget: function(ev) {
		ev.preventDefault();
		
		var elm = this.$el.find(ev.currentTarget);
	},
	// Facade pattern
	render: function() {
        this.widget.add({
        	title: 'Coders', 
        	href: 'https://www.mokoversity.com/coders',
        	img: '//static.mokoversity.com/images/gallery/spot-course.jpg'
        });
        this.widget.add({
        	title: 'Makers', 
        	href: 'https://www.mokoversity.com/makers',
        	img: '//static.mokoversity.com/images/gallery/spot-online.jpg'
        });
        this.widget.add({
        	title: 'Training', 
        	href: 'https://www.mokoversity.com/camp/full-stack',
        	img: '//static.mokoversity.com/images/gallery/spot-training.jpg'
        });
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